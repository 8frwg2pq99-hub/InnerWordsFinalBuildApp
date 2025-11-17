import { query, mutation, internalMutation, internalQuery, internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

// Get top 10 leaderboard entries for a specific word sorted by score (highest first)
export const getTopScores = query({
  args: { word: v.string() },
  handler: async (ctx, args) => {
    const entries = await ctx.db
      .query("leaderboard")
      .withIndex("by_word_and_score", (q) => q.eq("word", args.word))
      .order("desc")
      .take(10);

    return entries;
  },
});

// Add a new leaderboard entry with IP tracking and email notification
export const addScore = mutation({
  args: {
    playerName: v.string(),
    score: v.number(),
    turns: v.number(),
    word: v.string(),
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    turnHistory: v.optional(v.array(v.object({
      from: v.string(),
      to: v.string(),
      sequence: v.string(),
      type: v.union(v.literal("INNER"), v.literal("EDGE")),
      points: v.number(),
      sequencePoints: v.number(),
      lengthBonus: v.number(),
      totalScore: v.number(),
    }))),
  },
  handler: async (ctx, args) => {
    const timestamp = Date.now();

    // Track unique IP if provided
    if (args.ipAddress) {
      await ctx.scheduler.runAfter(0, internal.leaderboard.trackUniqueIp, {
        ipAddress: args.ipAddress,
        userAgent: args.userAgent,
        timestamp,
      });
    }

    const entryId = await ctx.db.insert("leaderboard", {
      playerName: args.playerName.trim(),
      score: args.score,
      turns: args.turns,
      word: args.word,
      timestamp,
      ipAddress: args.ipAddress,
      notificationStatus: "pending",
      turnHistory: args.turnHistory,
    });

    console.log("New leaderboard entry created:", entryId);

    // Schedule email notification
    await ctx.scheduler.runAfter(0, internal.leaderboard.sendScoreNotification, {
      leaderboardId: entryId,
    });

    return entryId;
  },
});

// Get player's rank based on their score for a specific word
export const getPlayerRank = query({
  args: { score: v.number(), word: v.string() },
  handler: async (ctx, args) => {
    const higherScores = await ctx.db
      .query("leaderboard")
      .withIndex("by_word_and_score", (q) => q.eq("word", args.word))
      .filter((q) => q.gt(q.field("score"), args.score))
      .collect();

    return higherScores.length + 1;
  },
});

// Get unique IP statistics
export const getUniqueIpStats = query({
  handler: async (ctx) => {
    const uniqueIps = await ctx.db.query("uniqueIps").collect();
    const totalVisits = uniqueIps.reduce((sum, ip) => sum + ip.visitCount, 0);
    
    return {
      uniqueIpCount: uniqueIps.length,
      totalVisits,
      recentIps: uniqueIps
        .sort((a, b) => b.lastVisit - a.lastVisit)
        .slice(0, 10)
        .map(ip => ({
          ipAddress: ip.ipAddress,
          visitCount: ip.visitCount,
          lastVisit: new Date(ip.lastVisit).toISOString(),
          firstVisit: new Date(ip.firstVisit).toISOString(),
        })),
    };
  },
});

// Internal action to track unique IPs
export const trackUniqueIp = internalAction({
  args: {
    ipAddress: v.string(),
    userAgent: v.optional(v.string()),
    timestamp: v.number(),
  },
  handler: async (ctx, args) => {
    const existingIp = await ctx.runQuery(internal.leaderboard.getIpRecord, {
      ipAddress: args.ipAddress,
    });

    if (existingIp) {
      // Update existing IP record
      await ctx.runMutation(internal.leaderboard.updateIpRecord, {
        ipId: existingIp._id,
        lastVisit: args.timestamp,
        visitCount: existingIp.visitCount + 1,
      });
    } else {
      // Create new IP record
      await ctx.runMutation(internal.leaderboard.createIpRecord, {
        ipAddress: args.ipAddress,
        userAgent: args.userAgent,
        timestamp: args.timestamp,
      });
    }
  },
});

// Internal query to get IP record
export const getIpRecord = internalQuery({
  args: { ipAddress: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("uniqueIps")
      .withIndex("by_ip", (q) => q.eq("ipAddress", args.ipAddress))
      .first();
  },
});

// Internal mutation to create IP record
export const createIpRecord = internalMutation({
  args: {
    ipAddress: v.string(),
    userAgent: v.optional(v.string()),
    timestamp: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("uniqueIps", {
      ipAddress: args.ipAddress,
      firstVisit: args.timestamp,
      lastVisit: args.timestamp,
      visitCount: 1,
      userAgent: args.userAgent,
    });
  },
});

// Internal mutation to update IP record
export const updateIpRecord = internalMutation({
  args: {
    ipId: v.id("uniqueIps"),
    lastVisit: v.number(),
    visitCount: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.ipId, {
      lastVisit: args.lastVisit,
      visitCount: args.visitCount,
    });
  },
});

// Internal action to send score notification email
export const sendScoreNotification = internalAction({
  args: {
    leaderboardId: v.id("leaderboard"),
  },
  handler: async (ctx, args) => {
    "use node";

    console.log("sendScoreNotification called with:", args.leaderboardId);

    // Get the leaderboard entry details
    const entry = await ctx.runQuery(internal.leaderboard.getLeaderboardEntry, {
      leaderboardId: args.leaderboardId,
    });

    if (!entry) {
      console.error("Leaderboard entry not found:", args.leaderboardId);
      return;
    }

    console.log("Sending notification for entry:", {
      playerName: entry.playerName,
      score: entry.score,
      word: entry.word
    });

    const endpoint = process.env.EMAIL_NOTIFICATION_ENDPOINT;
    const recipientEmail = process.env.RECIPIENT_EMAIL;

    if (!endpoint) {
      console.error("EMAIL_NOTIFICATION_ENDPOINT is not set in environment");
      await ctx.runMutation(internal.leaderboard.updateNotificationStatus, {
        leaderboardId: args.leaderboardId,
        status: "failed",
      });
      return;
    }

    if (!recipientEmail) {
      console.error("RECIPIENT_EMAIL is not set in environment");
      await ctx.runMutation(internal.leaderboard.updateNotificationStatus, {
        leaderboardId: args.leaderboardId,
        status: "failed",
      });
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toEmail: recipientEmail,
          subject: `🎮 New InnerWords Score: ${entry.score} points!`,
          message: `New high score achieved in InnerWords!

Player: ${entry.playerName}
Score: ${entry.score} points
Turns: ${entry.turns}
Word: ${entry.word.toUpperCase()}
Time: ${new Date(entry.timestamp).toLocaleString()}
${entry.ipAddress ? `IP Address: ${entry.ipAddress}` : ''}

Great job! 🎉`,
          chatId: process.env.CHAT_ID!,
          appName: process.env.APP_NAME!,
          secretKey: process.env.SECRET_KEY!,
        }),
      });

      const responseText = await response.text();
      console.log("Email service response:", response.status, responseText);

      if (response.ok) {
        console.log("Score notification email sent successfully");
        await ctx.runMutation(internal.leaderboard.updateNotificationStatus, {
          leaderboardId: args.leaderboardId,
          status: "sent",
        });
      } else {
        console.error("Failed to send score notification:", response.status, response.statusText, responseText);
        await ctx.runMutation(internal.leaderboard.updateNotificationStatus, {
          leaderboardId: args.leaderboardId,
          status: "failed",
        });
        
        // Schedule retry in 60 seconds
        await ctx.scheduler.runAfter(60_000, internal.leaderboard.sendScoreNotification, args);
      }
    } catch (error) {
      console.error("Error sending score notification:", error);
      await ctx.runMutation(internal.leaderboard.updateNotificationStatus, {
        leaderboardId: args.leaderboardId,
        status: "failed",
      });
      
      // Schedule retry in 60 seconds
      await ctx.scheduler.runAfter(60_000, internal.leaderboard.sendScoreNotification, args);
    }
  },
});

// Internal query to get leaderboard entry
export const getLeaderboardEntry = internalQuery({
  args: {
    leaderboardId: v.id("leaderboard"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.leaderboardId);
  },
});

// Internal mutation to update notification status
export const updateNotificationStatus = internalMutation({
  args: {
    leaderboardId: v.id("leaderboard"),
    status: v.union(v.literal("pending"), v.literal("sent"), v.literal("failed")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.leaderboardId, {
      notificationStatus: args.status,
    });
  },
});



