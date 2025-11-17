#!/bin/bash

echo "🚀 Building InnerWords static export..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run the build
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ -d "out" ]; then
    echo ""
    echo "✅ Build successful!"
    echo ""
    echo "📁 Static files are in the 'out' directory"
    echo ""
    echo "📦 Creating zip file..."
    cd out
    zip -r ../innerwords-static-build.zip .
    cd ..
    echo ""
    echo "✅ Zip file created: innerwords-static-build.zip"
    echo ""
    echo "🎉 Ready to deploy!"
    echo ""
    echo "Next steps:"
    echo "1. Download innerwords-static-build.zip"
    echo "2. Upload to your hosting provider"
    echo "3. Configure SPA fallback (see BUILD_INSTRUCTIONS.md)"
else
    echo ""
    echo "❌ Build failed. Check the errors above."
    exit 1
fi
