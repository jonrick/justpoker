#!/bin/bash
# deploy_prod.sh - Automates the production build process
set -e

echo "----------------------------------------"
echo "🚀 Starting Production Build"
echo "----------------------------------------"

# 1. Build the UI
echo "📦 Building UI..."
cd ui
npm install --legacy-peer-deps
# Increase memory limit to avoid OOM
export NODE_OPTIONS=--max-old-space-size=4096

if [ "$SKIP_TSC" = "true" ]; then
    echo "⏩ Skipping TypeScript type-checking..."
    npx vite build
else
    npm run build
fi
cd ..

# 2. Setup the Server
echo "📥 Installing Server Dependencies..."
cd server
npm install --legacy-peer-deps
cd ..

echo "----------------------------------------"
echo "✅ Production Build Complete!"
echo "Run './run_prod.sh' to start the server."
echo "----------------------------------------"
