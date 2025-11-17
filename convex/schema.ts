import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"
import { authTables } from "@convex-dev/auth/server"

export default defineSchema({
  ...authTables,
  leaderboard: defineTable({
    playerName: v.string(),
    score: v.number(),
    turns: v.number(),
    word: v.string(),
    timestamp: v.number(),
    ipAddress: v.optional(v.string()),
    notificationStatus: v.optional(v.union(v.literal("pending"), v.literal("sent"), v.literal("failed"))),
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
  }).index("by_word_and_score", ["word", "score"]),
  
  uniqueIps: defineTable({
    ipAddress: v.string(),
    firstVisit: v.number(),
    lastVisit: v.number(),
    visitCount: v.number(),
    userAgent: v.optional(v.string()),
  }).index("by_ip", ["ipAddress"]),
})


