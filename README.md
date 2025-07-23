# 🎮 Monad Adventure Game

A fully on-chain blockchain game built on Monad testnet with MetaMask integration. Every game action is recorded as a real blockchain transaction, creating an immutable gaming experience.

![Monad Adventure Game](https://img.shields.io/badge/Blockchain-Monad%20Testnet-blue)
![MetaMask](https://img.shields.io/badge/Wallet-MetaMask%20Required-orange)
![Next.js](https://img.shields.io/badge/Framework-Next.js%2015-black)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)

## ✨ Features

- 🔗 **True On-Chain Gaming**: Every move and action creates real blockchain transactions
- 🦊 **MetaMask Integration**: Seamless wallet connection with transaction approval
- 🏆 **Global Leaderboard**: Compete with players worldwide
- 🎯 **Real-time Gameplay**: Live updates and session management via MultiSynq
- 💎 **Modern UI**: Clean, responsive design with Tailwind CSS
- 🔍 **Transaction Tracking**: View all game actions on blockchain explorer

## 🚀 Quick Start

### Prerequisites

- **MetaMask Wallet**: Required for all game interactions
- **Node.js 18+**: For local development
- **Testnet Tokens**: MON tokens for gas fees (get from faucet)

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/yourusername/monad-adventure-game.git
cd monad-adventure-game
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
Create a `.env.local` file:
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
```

4. **Run the development server**:
```bash
npm run dev
```

5. **Open the game**:
Navigate to [http://localhost:8000](http://localhost:8000)

## 🎯 How to Play

### Getting Started
1. **Install MetaMask**: Download from [metamask.io](https://metamask.io)
2. **Connect Wallet**: Click "Connect MetaMask Wallet" 
3. **Add Monad Network**: Game automatically configures Monad testnet
4. **Get Test Tokens**: Use the faucet to get MON tokens for gas fees
5. **Start Playing**: Create a game session and begin your adventure!

### Game Controls
- **Movement**: Use North, South, East, West buttons to navigate
- **Actions**: Collect treasures, Attack enemies, Defend against threats
- **Transactions**: Each action requires MetaMask approval and gas fees
- **Scoring**: Earn points for successful actions and discoveries

### Blockchain Integration
- Every game action creates a real blockchain transaction
- All moves are permanently recorded on Monad testnet
- Transaction hashes link to blockchain explorer for verification
- Complete audit trail of all gameplay actions

## 🏗️ Architecture

### Core Components
```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── game/page.tsx         # Main game interface
│   └── layout.tsx            # App layout
├── components/
│   ├── GameControls.tsx      # Movement and action controls
│   ├── GameStatus.tsx        # Wallet and session info
│   └── Leaderboard.tsx       # Global rankings
└── lib/
    ├── blockchain.ts         # MetaMask & Monad integration
    └── multisynq.ts          # Game session management
```

### Technology Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Blockchain**: MetaMask, Web3.js, Ethers.js
- **Network**: Monad Testnet (Chain ID: 10143)
- **Game API**: MultiSynq for session management

## 🔧 Configuration

### Monad Testnet Details
- **Chain ID**: 10143
- **RPC URL**: https://testnet-rpc.monad.xyz
- **Explorer**: https://testnet.monadexplorer.com
- **Currency**: MON (testnet tokens)
- **Faucet**: https://faucet.monad.xyz

### MetaMask Setup
The game automatically:
- Adds Monad testnet to MetaMask
- Switches to the correct network
- Handles account changes and disconnections
- Manages transaction approvals

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Use TypeScript for all new code
- Follow existing code style and patterns
- Test MetaMask integration thoroughly
- Update documentation for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [Your deployed URL]
- **Monad Blockchain**: [monad.xyz](https://monad.xyz)
- **MultiSynq Platform**: [multisynq.io](https://multisynq.io)
- **MetaMask**: [metamask.io](https://metamask.io)

## 🆘 Troubleshooting

### Common Issues

**MetaMask not detected**
- Ensure MetaMask is installed and enabled
- Refresh the page after installing MetaMask

**Transaction failures**
- Check you have sufficient MON tokens for gas
- Ensure you're connected to Monad testnet
- Try refreshing and reconnecting wallet

**Network issues**
- Verify Monad testnet RPC is accessible
- Check MetaMask network configuration
- Try switching networks and back

### Support
- Open an issue on GitHub for bugs
- Check console logs for error details
- Verify wallet connection and network

---

**🎮 Built with ❤️ for the Web3 Gaming Community**

*Experience true on-chain gaming where every move matters and every action is permanently recorded on the blockchain!*
