# 🚀 Deploying Monad Adventure Game to Vercel

This guide will help you deploy your Monad Adventure Game to Vercel for free hosting with automatic deployments.

## 📋 Prerequisites

- GitHub account with your code uploaded
- Vercel account (free at [vercel.com](https://vercel.com))
- MetaMask wallet for testing

## 🎯 Step-by-Step Deployment

### **Step 1: Prepare Your GitHub Repository**

1. **Upload your code to GitHub** (if not done already):
```bash
git add .
git commit -m "🎮 Ready for Vercel deployment"
git push origin main
```

### **Step 2: Connect to Vercel**

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Import your repository**:
   - Find `monad-adventure-game` in your repositories
   - Click **"Import"**

### **Step 3: Configure Project Settings**

1. **Project Configuration**:
   - **Project Name**: `monad-adventure-game`
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

2. **Click "Deploy"** (initial deployment will start)

### **Step 4: Add Environment Variables**

After the first deployment, add environment variables:

1. **Go to your project dashboard**
2. **Click "Settings" tab**
3. **Click "Environment Variables"**
4. **Add these variables**:

```bash
# Monad Testnet Configuration
NEXT_PUBLIC_MONAD_RPC_URL=https://testnet-rpc.monad.xyz
NEXT_PUBLIC_MONAD_CHAIN_ID=10143
NEXT_PUBLIC_MONAD_EXPLORER_URL=https://testnet.monadexplorer.com

# MultiSynq API Configuration
NEXT_PUBLIC_MULTISYNQ_API_URL=https://api.multisynq.io/v1
NEXT_PUBLIC_MULTISYNQ_API_KEY=demo_key_12345

# Game Configuration
NEXT_PUBLIC_GAME_NAME=Monad Adventure
NEXT_PUBLIC_GAME_VERSION=1.0.0
NEXT_PUBLIC_DEBUG_MODE=false
```

### **Step 5: Redeploy with Environment Variables**

1. **Go to "Deployments" tab**
2. **Click "..." on latest deployment**
3. **Click "Redeploy"**
4. **Wait for deployment to complete**

## 🌐 Your Live Game URL

After successful deployment, your game will be available at:
```
https://monad-adventure-game.vercel.app
```
(or your custom domain if configured)

## ⚙️ Advanced Configuration

### **Custom Domain (Optional)**

1. **Go to "Settings" → "Domains"**
2. **Add your custom domain**
3. **Configure DNS settings** as instructed
4. **Wait for SSL certificate** (automatic)

### **Performance Optimization**

The `vercel.json` file includes:
- **Function timeout**: 30 seconds for blockchain operations
- **Framework detection**: Automatic Next.js optimization
- **Environment variable mapping**: Secure configuration

### **Automatic Deployments**

Vercel automatically deploys when you:
- **Push to main branch**: Production deployment
- **Create pull request**: Preview deployment
- **Push to other branches**: Development deployment

## 🔧 Troubleshooting

### **Common Issues**

**Build Failures**
```bash
# Check build logs in Vercel dashboard
# Common fixes:
- Ensure all dependencies are in package.json
- Check TypeScript errors
- Verify environment variables
```

**MetaMask Issues**
```bash
# Ensure environment variables are set:
NEXT_PUBLIC_MONAD_RPC_URL=https://testnet-rpc.monad.xyz
NEXT_PUBLIC_MONAD_CHAIN_ID=10143
```

**Performance Issues**
```bash
# Check function logs in Vercel dashboard
# Increase timeout if needed in vercel.json
```

### **Debugging Steps**

1. **Check Vercel Function Logs**:
   - Go to "Functions" tab in dashboard
   - View real-time logs during gameplay

2. **Test Environment Variables**:
   - Verify all NEXT_PUBLIC_ variables are set
   - Check values are correct in deployment

3. **Monitor Performance**:
   - Use Vercel Analytics (free tier available)
   - Check Core Web Vitals

## 🚀 Post-Deployment Checklist

### **✅ Verify Functionality**
- [ ] Game loads correctly
- [ ] MetaMask detection works
- [ ] Wallet connection functions
- [ ] Game controls respond
- [ ] Leaderboard loads
- [ ] Transactions process (with MetaMask)

### **✅ Update Documentation**
- [ ] Add live demo URL to README.md
- [ ] Update repository description
- [ ] Add Vercel deployment badge

### **✅ Share Your Game**
- [ ] Tweet about your deployment
- [ ] Share in Web3 communities
- [ ] Add to your portfolio

## 📊 Monitoring & Analytics

### **Vercel Analytics (Free)**
1. **Enable in project settings**
2. **Monitor page views and performance**
3. **Track user engagement**

### **Custom Analytics**
Add to your game for detailed tracking:
```javascript
// Track game actions
analytics.track('game_action', {
  action: 'move_north',
  wallet: walletAddress,
  timestamp: Date.now()
});
```

## 🔄 Continuous Deployment

Your game now has:
- **Automatic deployments** from GitHub
- **Preview deployments** for testing
- **Rollback capability** if issues arise
- **Zero-downtime deployments**

## 🎮 Live Game Features

Your deployed game includes:
- ✅ **MetaMask Integration**: Real wallet connections
- ✅ **Blockchain Transactions**: Live Monad testnet
- ✅ **Global Leaderboard**: Real-time rankings
- ✅ **Responsive Design**: Works on all devices
- ✅ **Professional UI**: Production-ready interface

## 📱 Mobile Optimization

Vercel automatically optimizes for:
- **Mobile MetaMask**: Deep linking support
- **Touch Controls**: Responsive game buttons
- **Performance**: Fast loading on mobile networks
- **PWA Features**: Add to home screen capability

---

**🎉 Congratulations!** Your Monad Adventure Game is now live and accessible to players worldwide!

**Live URL**: `https://your-project.vercel.app`
