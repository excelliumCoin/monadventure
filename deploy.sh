#!/bin/bash

# 🚀 Monad Adventure Game - Vercel Deployment Script
# This script helps you deploy your game to Vercel quickly

echo "🎮 Monad Adventure Game - Vercel Deployment"
echo "=========================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git not initialized. Initializing..."
    git init
fi

# Check if files are staged
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ No changes to commit"
else
    echo "📝 Staging files for commit..."
    git add .
    
    echo "💾 Committing changes..."
    git commit -m "🚀 Deploy: Monad Adventure Game ready for Vercel"
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  No GitHub remote found."
    echo "Please add your GitHub repository URL:"
    echo "git remote add origin https://github.com/YOUR_USERNAME/monad-adventure-game.git"
    echo ""
    echo "Then run this script again."
    exit 1
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Code pushed to GitHub successfully!"
echo ""
echo "🌐 Next Steps for Vercel Deployment:"
echo "1. Go to https://vercel.com"
echo "2. Sign in with your GitHub account"
echo "3. Click 'New Project'"
echo "4. Import your 'monad-adventure-game' repository"
echo "5. Add environment variables (see DEPLOYMENT.md)"
echo "6. Deploy!"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "🎉 Your game will be live at: https://your-project.vercel.app"
