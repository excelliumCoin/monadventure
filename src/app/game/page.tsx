'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import GameControls from '@/components/GameControls'
import GameStatus from '@/components/GameStatus'
import Leaderboard from '@/components/Leaderboard'
import { monadBlockchain, WalletInfo, MONAD_CONFIG } from '@/lib/blockchain'
import { multiSynqAPI, GameSession, GameAction } from '@/lib/multisynq'

export default function GamePage() {
  // State management
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [session, setSession] = useState<GameSession | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [blockchainConnected, setBlockchainConnected] = useState(false);
  const [gameMessage, setGameMessage] = useState('');
  const [leaderboardRefresh, setLeaderboardRefresh] = useState(0);
  const [isMetaMaskAvailable, setIsMetaMaskAvailable] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');

  // Initialize blockchain connection on component mount
  useEffect(() => {
    initializeBlockchain();
    checkMetaMask();
  }, []);

  const checkMetaMask = async () => {
    try {
      const available = await monadBlockchain.isMetaMaskInstalled();
      setIsMetaMaskAvailable(available);
      if (!available) {
        setError('MetaMask is required to play this game. Please install MetaMask to continue.');
      }
    } catch (error) {
      console.error('MetaMask check failed:', error);
    }
  };

  const initializeBlockchain = async () => {
    try {
      const connected = await monadBlockchain.connectToTestnet();
      setBlockchainConnected(connected);
      if (!connected) {
        setError('Failed to connect to Monad testnet. Please check your connection.');
      }
    } catch (error) {
      setError('Blockchain initialization failed');
      console.error('Blockchain init error:', error);
    }
  };

  const connectMetaMask = async () => {
    setLoading(true);
    setError('');

    try {
      const walletInfo = await monadBlockchain.connectMetaMask();
      setWallet(walletInfo);
      setGameMessage('MetaMask connected successfully! All game actions will be recorded on-chain.');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to connect MetaMask');
    } finally {
      setLoading(false);
    }
  };

  const startGameSession = async () => {
    if (!wallet) {
      setError('Please connect your MetaMask wallet first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const newSession = await multiSynqAPI.createGameSession(wallet.address);
      setSession(newSession);
      setGameMessage('Game session started! All your moves will be recorded as blockchain transactions.');
      setLeaderboardRefresh(prev => prev + 1);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to start game session');
    } finally {
      setLoading(false);
    }
  };

  const handleMove = async (direction: 'north' | 'south' | 'east' | 'west') => {
    if (!session) {
      setError('No active game session');
      return;
    }

    try {
      setGameMessage(`Processing ${direction} move on blockchain...`);
      
      // Send blockchain transaction first
      const txResult = await monadBlockchain.sendGameTransaction(`move_${direction}`, {
        sessionId: session.sessionId,
        direction,
        position: session.position
      });

      if (!txResult.success) {
        throw new Error(txResult.error || 'Blockchain transaction failed');
      }

      setTransactionHash(txResult.hash);
      setGameMessage(`Move confirmed on blockchain! Transaction: ${txResult.hash.slice(0, 10)}...`);

      // Then update game state via MultiSynq
      const action: GameAction = {
        type: 'move',
        direction,
        timestamp: Date.now(),
        metadata: { 
          source: 'movement-controls',
          txHash: txResult.hash,
          blockNumber: txResult.blockNumber
        }
      };

      const result = await multiSynqAPI.submitGameAction(session.sessionId, action);
      
      // Update session with new score and position
      const updatedSession = {
        ...session,
        score: session.score + result.newScore,
        position: {
          x: session.position.x + (direction === 'east' ? 1 : direction === 'west' ? -1 : 0),
          y: session.position.y + (direction === 'north' ? 1 : direction === 'south' ? -1 : 0)
        }
      };
      setSession(updatedSession);
      setGameMessage(`${result.message} | TX: ${txResult.hash.slice(0, 10)}...`);

      // Refresh leaderboard if score increased
      if (result.newScore > 0) {
        setLeaderboardRefresh(prev => prev + 1);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Move failed');
    }
  };

  const handleAction = async (action: GameAction) => {
    if (!session) {
      setError('No active game session');
      return;
    }

    try {
      setGameMessage(`Processing ${action.type} action on blockchain...`);
      
      // Send blockchain transaction first
      const txResult = await monadBlockchain.sendGameTransaction(`action_${action.type}`, {
        sessionId: session.sessionId,
        actionType: action.type,
        position: session.position
      });

      if (!txResult.success) {
        throw new Error(txResult.error || 'Blockchain transaction failed');
      }

      setTransactionHash(txResult.hash);
      setGameMessage(`Action confirmed on blockchain! Transaction: ${txResult.hash.slice(0, 10)}...`);

      // Then update game state via MultiSynq
      const enhancedAction = {
        ...action,
        metadata: {
          ...action.metadata,
          txHash: txResult.hash,
          blockNumber: txResult.blockNumber
        }
      };

      const result = await multiSynqAPI.submitGameAction(session.sessionId, enhancedAction);
      
      // Update session with new score
      const updatedSession = {
        ...session,
        score: session.score + result.newScore
      };
      setSession(updatedSession);
      setGameMessage(`${result.message} | TX: ${txResult.hash.slice(0, 10)}...`);

      // Refresh leaderboard if score increased
      if (result.newScore > 0) {
        setLeaderboardRefresh(prev => prev + 1);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Action failed');
    }
  };

  const requestFaucetTokens = async () => {
    if (!wallet) {
      setError('Please connect your MetaMask wallet first');
      return;
    }

    setLoading(true);
    try {
      const success = await monadBlockchain.requestTestnetTokens();
      if (success) {
        setGameMessage('Testnet tokens requested successfully! They should arrive in your wallet shortly.');
        // Refresh balance
        await monadBlockchain.refreshBalance();
      } else {
        setError('Faucet request failed. Please try again later.');
      }
    } catch {
      setError('Failed to request testnet tokens');
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    monadBlockchain.disconnect();
    setWallet(null);
    setSession(null);
    setTransactionHash('');
    setGameMessage('Wallet disconnected. Connect MetaMask to continue playing.');
  };

  const refreshBalance = async () => {
    if (!wallet) return;
    
    try {
      await monadBlockchain.refreshBalance();
      setGameMessage('Balance refreshed successfully!');
    } catch {
      setError('Failed to refresh balance');
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/" className="text-blue-400 hover:text-blue-300 mb-2 inline-block">
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Monad Adventure Game
            </h1>
            <p className="text-gray-400 mt-2">On-chain gaming with MetaMask • All actions recorded on blockchain</p>
          </div>
        </div>

        {/* Game Message */}
        {gameMessage && (
          <div className="mb-6 bg-blue-900/20 border border-blue-500/50 rounded-lg p-4">
            <p className="text-blue-300">{gameMessage}</p>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-900/20 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-300">{error}</p>
            <button 
              onClick={() => setError('')}
              className="text-red-400 hover:text-red-300 text-sm mt-2 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Transaction Hash Display */}
        {transactionHash && (
          <div className="mb-6 bg-green-900/20 border border-green-500/50 rounded-lg p-4">
            <p className="text-green-300 text-sm">
              Latest Transaction: 
              <a 
                href={`${MONAD_CONFIG.EXPLORER_URL || 'https://testnet.monadexplorer.com'}/tx/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-200 underline ml-2 font-mono"
              >
                {transactionHash}
              </a>
            </p>
          </div>
        )}

        {/* MetaMask Connection Section */}
        {!wallet && (
          <div className="mb-8 bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 text-center">Connect MetaMask Wallet</h2>
            
            {isMetaMaskAvailable ? (
              <div className="max-w-md mx-auto text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">
                    This game requires MetaMask for on-chain transactions. All your moves and actions will be recorded on the Monad blockchain.
                  </p>
                </div>
                
                <button
                  onClick={connectMetaMask}
                  disabled={loading || !blockchainConnected}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-3"
                >
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                  </div>
                  <span>{loading ? 'Connecting MetaMask...' : 'Connect MetaMask Wallet'}</span>
                </button>
                
                {!blockchainConnected && (
                  <p className="text-red-400 text-sm mt-4">
                    Blockchain connection required
                  </p>
                )}
              </div>
            ) : (
              <div className="max-w-md mx-auto text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">!</span>
                  </div>
                  <h3 className="text-xl font-semibold text-red-400 mb-4">MetaMask Required</h3>
                  <p className="text-gray-300 mb-6">
                    This game requires MetaMask for blockchain transactions. Please install MetaMask to continue.
                  </p>
                </div>
                
                <a
                  href="https://metamask.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-lg transition-all duration-200"
                >
                  Install MetaMask
                </a>
              </div>
            )}
          </div>
        )}

        {/* Game Session Section */}
        {wallet && !session && (
          <div className="mb-8 bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-center">Start Your On-Chain Adventure</h2>
            <div className="text-center">
              <p className="text-gray-400 mb-6">Ready to begin your blockchain adventure? All actions will be recorded on-chain.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={startGameSession}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
                >
                  {loading ? 'Starting...' : 'Start Game Session'}
                </button>
                <button
                  onClick={requestFaucetTokens}
                  disabled={loading}
                  className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
                >
                  {loading ? 'Requesting...' : 'Get Test Tokens'}
                </button>
                <button
                  onClick={disconnectWallet}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Game Interface */}
        {session && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Game Status */}
            <div className="lg:col-span-1">
              <GameStatus
                wallet={wallet}
                session={session}
                loading={loading}
                error={error}
                blockchainConnected={blockchainConnected}
              />
            </div>

            {/* Middle Column - Game Controls */}
            <div className="lg:col-span-1">
              <GameControls
                onMove={handleMove}
                onAction={handleAction}
                disabled={!session || loading}
                loading={loading}
              />
              
              {/* Session Actions */}
              <div className="mt-6 bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
                <h4 className="text-lg font-medium mb-3 text-gray-300">Blockchain Actions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={requestFaucetTokens}
                    disabled={loading}
                    className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200"
                  >
                    Get Tokens
                  </button>
                  <button
                    onClick={refreshBalance}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200"
                  >
                    Refresh Balance
                  </button>
                  <button
                    onClick={disconnectWallet}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200 sm:col-span-2"
                  >
                    End Session
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Leaderboard */}
            <div className="lg:col-span-1">
              <Leaderboard refreshTrigger={leaderboardRefresh} />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Built on Monad Testnet • Powered by MultiSynq • All transactions on-chain</p>
        </div>
      </div>
    </div>
  );
}
