# 🚀 Self-Hosting Quickstart

Get your InnerWords game up and running on your own server in minutes.

## Prerequisites

- Node.js 18+ installed
- Your Convex deployment must remain active (app connects to Convex backend)
- `.env.local` file with Convex credentials

## Step 1: Build the Static Export

### On Linux/Mac:
```bash
./build.sh
```

### On Windows (PowerShell):
```powershell
.\build.ps1
```

### Manual Build:
```bash
npm install
npm run build
```

This creates an `out` folder with all static files.

## Step 2: Test Locally (Optional)

```bash
cd out
npx serve
```

Visit `http://localhost:3000` to test.

## Step 3: Deploy to Your Server

### Option A: Static Host with Auto-SPA (Easiest)
Upload the `out` folder contents to:
- **Netlify**: Drag & drop the `out` folder
- **Vercel**: `vercel --prod` from project root
- **Cloudflare Pages**: Connect repo or upload folder

These platforms automatically handle SPA routing.

### Option B: Traditional Web Server

#### Nginx
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/out;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### Apache
The `.htaccess` file is already included in `public/` and will be copied to `out/` during build.

### Option C: Simple Node Server
```bash
cd out
npx serve -s .
```

## ⚠️ Critical: Convex Backend

Your app **requires** Convex to function. After deployment:

1. Verify your Convex deployment URL is correct
2. Ensure environment variables are properly set during build
3. Keep your Convex project active

The static files only contain the frontend - all data, leaderboards, and game state are stored in Convex.

## Troubleshooting

### Pages return 404 on refresh
**Problem**: Your server doesn't have SPA fallback configured.  
**Solution**: Configure your web server to serve `index.html` for all routes (see Step 3).

### "Failed to connect to Convex"
**Problem**: Environment variables not set during build.  
**Solution**: Ensure `.env.local` exists before running build.

### Images not loading
**Problem**: Image optimization not configured.  
**Solution**: Already fixed - `next.config.js` has `images: { unoptimized: true }`.

## File Structure

```
out/
├── index.html              # Homepage (/)
├── admin.html             # Admin dashboard (/admin)
├── archive.html           # Challenge archive (/archive)
├── challenge.html         # Challenge page (/challenge)
├── leaderboards.html      # Leaderboards (/leaderboards)
├── .htaccess              # Apache SPA fallback (auto-included)
├── _next/                 # Next.js bundles & assets
│   ├── static/
│   └── ...
└── ...
```

## Next Steps

1. ✅ Build complete
2. ✅ Test locally (optional)
3. ✅ Deploy to your hosting
4. ✅ Configure domain & SSL
5. 🎮 Start playing!

## Need Help?

See `BUILD_INSTRUCTIONS.md` for detailed deployment guides for every hosting platform.
