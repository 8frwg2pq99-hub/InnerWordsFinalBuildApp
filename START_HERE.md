# 🎯 START HERE - Build Your Static Export

## What You Need to Know

Your InnerWords project is **ready to build** as a static export for self-hosting.

⚠️ **Important**: The static files will contain your frontend, but your app needs Convex (your database backend) to remain active for the game to work.

## Build in 3 Steps

### Step 1️⃣: Verify Environment Variables

Make sure your `.env.local` file exists and contains your Convex credentials:

```bash
cat .env.local
```

You should see:
```
CONVEX_DEPLOYMENT=your-deployment-here
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
```

If missing, create it before building!

### Step 2️⃣: Run the Build

**On Linux/Mac:**
```bash
chmod +x build.sh
./build.sh
```

**On Windows (PowerShell):**
```powershell
.\build.ps1
```

**Or manually:**
```bash
npm install
npm run build
```

### Step 3️⃣: Get Your Files

After building, you'll have:
- ✅ `out/` folder with all static files
- ✅ `innerwords-static-build.zip` (created by build scripts)

## Deploy Your Files

### Easiest Options (Zero Config)
1. **Netlify**: Go to app.netlify.com → New site → Drag the `out` folder
2. **Vercel**: Run `vercel --prod` in terminal
3. **Cloudflare Pages**: Upload via dashboard

### Traditional Hosting
Upload contents of `out/` folder to your web server. 

**Apache users**: The `.htaccess` file is already included for SPA routing.

**Nginx users**: See `BUILD_INSTRUCTIONS.md` for configuration.

## Test Before Deploying

```bash
cd out
npx serve -s .
```

Visit http://localhost:3000 and test:
- Homepage loads
- Navigate to /leaderboards, /archive, etc.
- Refresh pages (should not 404)
- Play a game

## What's in the Static Export?

```
out/
├── index.html          → Homepage (/)
├── admin.html          → Admin dashboard (/admin)
├── archive.html        → Challenge archive (/archive)
├── challenge.html      → Challenge page (/challenge)
├── leaderboards.html   → Leaderboards (/leaderboards)
├── .htaccess           → Apache SPA fallback
├── _next/              → JavaScript, CSS, images
└── ...
```

## Quick Reference

| Document | Purpose |
|----------|---------|
| **START_HERE.md** | This file - quick setup |
| `SELF_HOSTING_QUICKSTART.md` | Fast deployment guide |
| `BUILD_INSTRUCTIONS.md` | Detailed hosting guide for all platforms |
| `DEPLOYMENT_SUMMARY.md` | Technical overview of changes |

## Troubleshooting

### Build command blocked
The Macaly sandbox prevents running build commands directly. You'll need to:
1. Download your project files
2. Run the build locally on your machine
3. Upload the generated `out` folder to your hosting

### How to download project
You can clone/download the entire project from the Macaly platform, then run the build scripts on your local machine.

### Need help?
See `BUILD_INSTRUCTIONS.md` for detailed troubleshooting and platform-specific guides.

---

## 🚀 Ready to Build?

Run this command to get started:

**Linux/Mac:**
```bash
chmod +x build.sh && ./build.sh
```

**Windows:**
```powershell
.\build.ps1
```

Your static export will be ready in the `out/` folder! 🎉
