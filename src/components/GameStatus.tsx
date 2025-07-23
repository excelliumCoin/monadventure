'use client'

import { GameSession } from '@/lib/multisynq'
import { WalletInfo } from '@/lib/blockchain'

interface GameStatusProps {
  wallet: WalletInfo | null;
  session: GameSession | null;
  loading?: boolean;
  error?: string;
  blockchainConnected?: boolean;
}

export default function GameStatus({ 
  wallet, 
  session, 
  loading = false, 
  error, 
  blockchainConnected = false 
}: GameStatusProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-semibold mb-6 text-center text-purple-400">Game Status</h3>
      
      {/* Connection Status */}
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-3 text-gray-300">Connection Status</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Monad Testnet:</span>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${blockchainConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span className={`text-sm ${blockchainConnected ? 'text-green-400' : 'text-red-400'}`}>
                {blockchainConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">MultiSynq API:</span>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${session ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
              <span className={`text-sm ${session ? 'text-green-400' : 'text-yellow-400'}`}>
                {session ? 'Active Session' : 'No Session'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Information */}
      {wallet && (
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3 text-gray-300">Wallet Info</h4>
          <div className="bg-gray-700/50 rounded-lg p-4 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <span className="text-gray-400 text-sm">Address:</span>
              <span className="text-blue-400 font-mono text-sm break-all">
                {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
              </span>
            </div>
            {wallet.balance && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <span className="text-gray-400 text-sm">Balance:</span>
                <span className="text-green-400 font-medium text-sm">{wallet.balance}</span>
              </div>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <span className="text-gray-400 text-sm">Status:</span>
              <span className={`text-sm ${wallet.connected ? 'text-green-400' : 'text-red-400'}`}>
                {wallet.connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            {wallet.provider && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <span className="text-gray-400 text-sm">Provider:</span>
                <span className="text-purple-400 text-sm font-medium">{wallet.provider}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Session Information */}
      {session && (
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3 text-gray-300">Game Session</h4>
          <div className="bg-gray-700/50 rounded-lg p-4 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <span className="text-gray-400 text-sm">Session ID:</span>
              <span className="text-purple-400 font-mono text-sm">
                {session.sessionId.slice(0, 8)}...{session.sessionId.slice(-4)}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <span className="text-gray-400 text-sm">Score:</span>
              <span className="text-yellow-400 font-bold text-lg">{session.score.toLocaleString()}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <span className="text-gray-400 text-sm">Position:</span>
              <span className="text-blue-400 font-mono text-sm">
                ({session.position.x}, {session.position.y})
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <span className="text-gray-400 text-sm">Status:</span>
              <span className={`text-sm capitalize ${
                session.status === 'active' ? 'text-green-400' : 
                session.status === 'paused' ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {session.status}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <span className="text-gray-400 text-sm">Started:</span>
              <span className="text-gray-300 text-sm">
                {new Date(session.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="mb-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            <span className="ml-3 text-gray-400">Loading game data...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mb-6">
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
            <h5 className="text-red-400 font-medium mb-2">Error</h5>
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Game Tips */}
      <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4">
        <h5 className="text-blue-400 font-medium mb-2">Game Tips</h5>
        <ul className="text-blue-300 text-sm space-y-1">
          <li>• Move around to discover treasures and earn points</li>
          <li>• Use collect action when you find valuable items</li>
          <li>• Attack enemies to gain experience and rewards</li>
          <li>• Defend when facing powerful opponents</li>
          <li>• Check the leaderboard to see your ranking</li>
        </ul>
      </div>
    </div>
  );
}
