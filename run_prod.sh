#!/bin/bash
# run_prod.sh - Starts the production server
set -e

echo "----------------------------------------"
echo "🔥 Starting JustPoker Production Server"
echo "----------------------------------------"

# Ensure we are in the server directory
cd server

# Set production environment variables
# ROOT_SERVER_DIR points to the parent folder so express can serve ui/build/
export NODE_SERVER_ENVIRONMENT=PROD
export ROOT_SERVER_DIR=$(pwd)/..

npm start
