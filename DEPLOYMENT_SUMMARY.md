# 📦 Static Export Setup Complete

Your InnerWords project is now configured for static export and self-hosting.

## What's Been Done

✅ **Next.js Configuration**: Added `output: 'export'` to generate static HTML files  
✅ **SPA Fallback**: Created `.htaccess` for Apache servers (auto-included in build)  
✅ **Build Scripts**: Created automated build scripts for Linux/Mac and Windows  
✅ **Documentation**: Comprehensive guides for all hosting platforms  

## Files Created

| File | Purpose |
|------|---------|
| `build.sh` | Automated build script for Linux/Mac |
| `build.ps1` | Automated build script for Windows |
| `BUILD_INSTRUCTIONS.md` | Detailed deployment guide for all platforms |
| `SELF_HOSTING_QUICKSTART.md` | Quick start guide for common scenarios |
| `public/.htaccess` | Apache SPA fallback configuration |
| `DEPLOYMENT_SUMMARY.md` | This file - overview of setup |

## Modified Files

| File | Change |
|------|--------|
| `next.config.js` | Added `output: 'export'` for static build |
| `README.md` | Added self-hosting section |

## How to Build Your Static Export

### Quick Method (Recommended)

**Linux/Mac:**
```bash
./build.sh
```

**Windows PowerShell:**
```powershell
.\build.ps1
```

This will:
1. Install dependencies (if needed)
2. Run `npm run build`
3. Create `innerwords-static-build.zip` ready for deployment

### Manual Method

```bash
npm install
npm run build
cd out
zip -r ../innerwords-static-build.zip .
```

## What You'll Get

After building, you'll have:
- ✅ `out/` folder with all static files
- ✅ `innerwords-static-build.zip` ready to upload
- ✅ All pages as static HTML files
- ✅ Optimized JavaScript bundles
- ✅ All assets and images
- ✅ SPA fallback configuration included

## Deployment Options

### 🟢 Easiest (No Configuration Needed)
- **Netlify**: Drag & drop the `out` folder
- **Vercel**: Run `vercel --prod`
- **Cloudflare Pages**: Upload via dashboard
- **GitHub Pages**: Push `out` folder to gh-pages branch

These platforms automatically handle SPA routing - zero configuration required.

### 🟡 Traditional Web Servers (Requires SPA Config)
- **Nginx**: Configure `try_files` directive
- **Apache**: `.htaccess` already included
- **Node.js**: Use `serve -s` command

See `BUILD_INSTRUCTIONS.md` for exact configurations.

## ⚠️ Critical Reminder

**Your Convex backend must remain active!**

The static export only contains frontend files. Your app connects to Convex for:
- Real-time leaderboards
- Daily challenge data
- User scores and statistics
- Admin analytics

**Before building**, ensure your `.env.local` file contains:
```
CONVEX_DEPLOYMENT=your-deployment-url
NEXT_PUBLIC_CONVEX_URL=your-public-convex-url
```

## Testing Your Build Locally

After building, test before deploying:

```bash
cd out
npx serve -s .
```

Visit `http://localhost:3000` and verify:
- ✅ Homepage loads
- ✅ All pages accessible via navigation
- ✅ Leaderboards display data
- ✅ Game functions correctly
- ✅ Page refreshes don't break (SPA fallback working)

## Troubleshooting

### Build fails
- Ensure all dependencies are installed: `npm install`
- Check that Node.js version is 18 or higher: `node -v`

### "Page not found" on refresh
- Your hosting needs SPA fallback configuration
- See `BUILD_INSTRUCTIONS.md` for your platform

### Convex connection errors
- Verify `.env.local` exists during build
- Check your Convex deployment is active
- Confirm environment variables are correct

### Images not loading
- Already configured: `images: { unoptimized: true }` in next.config.js
- This is required for static export

## Next Steps

1. **Build**: Run `./build.sh` or `.\build.ps1`
2. **Test**: Use `npx serve` to test locally
3. **Deploy**: Upload `out` folder or `innerwords-static-build.zip` to your host
4. **Configure**: Set up SPA fallback (if needed for your hosting)
5. **Launch**: Point your domain and go live! 🚀

## Documentation Quick Links

- 📖 **Quick Start**: `SELF_HOSTING_QUICKSTART.md`
- 📚 **Detailed Guide**: `BUILD_INSTRUCTIONS.md`
- 🎮 **Game Features**: `README.md`

## Support

If you encounter issues:
1. Check the troubleshooting section in `BUILD_INSTRUCTIONS.md`
2. Verify your Convex deployment is active
3. Test locally first before deploying to production

---

**You're all set!** Run the build script and deploy your InnerWords game to your own hosting. 🎉
