# PowerShell build script for Windows users

Write-Host "🚀 Building InnerWords static export..." -ForegroundColor Cyan
Write-Host ""

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Run the build
Write-Host "🔨 Building project..." -ForegroundColor Yellow
npm run build

# Check if build was successful
if (Test-Path "out") {
    Write-Host ""
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📁 Static files are in the 'out' directory" -ForegroundColor White
    Write-Host ""
    Write-Host "📦 Creating zip file..." -ForegroundColor Yellow
    Compress-Archive -Path "out\*" -DestinationPath "innerwords-static-build.zip" -Force
    Write-Host ""
    Write-Host "✅ Zip file created: innerwords-static-build.zip" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 Ready to deploy!" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor White
    Write-Host "1. Download innerwords-static-build.zip"
    Write-Host "2. Upload to your hosting provider"
    Write-Host "3. Configure SPA fallback (see BUILD_INSTRUCTIONS.md)"
}
else {
    Write-Host ""
    Write-Host "❌ Build failed. Check the errors above." -ForegroundColor Red
    exit 1
}
