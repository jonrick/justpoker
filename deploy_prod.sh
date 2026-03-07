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
npm run build
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
