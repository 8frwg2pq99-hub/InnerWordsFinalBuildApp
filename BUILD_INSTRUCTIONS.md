# Static Build Instructions for InnerWords

## Important Notes

⚠️ **This app requires a Convex backend to function.** The static export will contain all the frontend files, but you'll need to:
1. Keep your Convex deployment running
2. Ensure the `.env.local` file with Convex credentials is present during build
3. The built app will connect to your Convex backend

## Build Steps

### 1. Ensure Environment Variables
Make sure your `.env.local` file contains your Convex credentials:
```
CONVEX_DEPLOYMENT=your-deployment-url
NEXT_PUBLIC_CONVEX_URL=your-convex-url
```

### 2. Install Dependencies (if not already done)
```bash
npm install
```

### 3. Build the Static Export
```bash
npm run build
```

This will create an `out` directory containing all static files.

### 4. Create a Zip File
```bash
cd out
zip -r ../innerwords-static-build.zip .
```

Or on Windows (PowerShell):
```powershell
Compress-Archive -Path out\* -DestinationPath innerwords-static-build.zip
```

## Deployment Options

### Option 1: Simple HTTP Server (Testing)
```bash
cd out
npx serve
```

### Option 2: Nginx
Add this to your nginx config for SPA fallback:
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

### Option 3: Apache
Create a `.htaccess` file in the `out` directory:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Option 4: Cloudflare Pages / Netlify / Vercel
These platforms automatically handle SPA fallback. Just upload the `out` directory.

## File Structure After Build

```
out/
├── index.html           # Homepage
├── admin.html          # Admin page
├── archive.html        # Archive page
├── challenge.html      # Challenge page
├── leaderboards.html   # Leaderboards page
├── _next/              # Next.js assets
│   ├── static/
│   └── ...
└── ...
```

## Troubleshooting

### Issue: "Page not found" on refresh
**Solution**: Your web server needs SPA fallback configuration (see deployment options above).

### Issue: Database connection errors
**Solution**: Verify your Convex deployment is active and environment variables are correct.

### Issue: Images not loading
**Solution**: Ensure `images: { unoptimized: true }` is in `next.config.js` (already configured).

## Next Steps

1. Run `npm run build` in your project directory
2. Find the `out` folder with all static files
3. Zip the contents of the `out` folder
4. Deploy to your hosting provider with SPA fallback enabled
