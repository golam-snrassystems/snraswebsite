#!/bin/bash

# Water Quality Monitoring System - Frontend Startup Script

echo "================================================"
echo "  Water Quality Monitoring - Frontend Server"
echo "================================================"
echo ""

# Change to the project root directory
cd "$(dirname "$0")"

echo "📁 Current directory: $(pwd)"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "🌐 Starting frontend server with Python 3..."
    echo "   Server will run on: http://localhost:8000"
    echo ""
    echo "📂 Available pages:"
    echo "   - http://localhost:8000/index.html (Login)"
    echo "   - http://localhost:8000/main.html (Dashboard)"
    echo "   - http://localhost:8000/waterQualityAnalytics.html (Analytics)"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "================================================"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "🌐 Starting frontend server with Python 2..."
    echo "   Server will run on: http://localhost:8000"
    echo ""
    echo "📂 Available pages:"
    echo "   - http://localhost:8000/index.html (Login)"
    echo "   - http://localhost:8000/main.html (Dashboard)"
    echo "   - http://localhost:8000/waterQualityAnalytics.html (Analytics)"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo "================================================"
    echo ""
    python -m SimpleHTTPServer 8000
else
    echo "❌ Error: Python is not installed"
    echo "Please install Python or use another method to serve the frontend."
    echo ""
    echo "Alternative: Open index.html directly in your browser"
    echo "(Note: This may cause CORS issues)"
    exit 1
fi
