'use client'

import { useState, useEffect, useCallback } from 'react'
import { LeaderboardData, multiSynqAPI } from '@/lib/multisynq'

interface LeaderboardProps {
  refreshTrigger?: number;
  limit?: number;
}

export default function Leaderboard({ refreshTrigger = 0, limit = 10 }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    setError('');
    
    try {
      const data = await multiSynqAPI.getLeaderboard(limit);
      setLeaderboard(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch leaderboard');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchLeaderboard();
  }, [refreshTrigger, fetchLeaderboard]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) {
        fetchLeaderboard();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [loading, fetchLeaderboard]);

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-400'; // Gold
      case 2: return 'text-gray-300';   // Silver
      case 3: return 'text-orange-400'; // Bronze
      default: return 'text-gray-400';
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-yellow-500/20 border-yellow-500/50';
      case 2: return 'bg-gray-500/20 border-gray-500/50';
      case 3: return 'bg-orange-500/20 border-orange-500/50';
      default: return 'bg-gray-700/30 border-gray-600/50';
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-green-400">Leaderboard</h3>
        <button
          onClick={fetchLeaderboard}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Loading State */}
      {loading && !leaderboard && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-400"></div>
          <span className="ml-3 text-gray-400">Loading leaderboard...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-4">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Leaderboard Content */}
      {leaderboard && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-700/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-400">{leaderboard.totalPlayers.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Total Players</div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-400">{leaderboard.entries.length}</div>
              <div className="text-sm text-gray-400">Top Players</div>
            </div>
          </div>

          {/* Leaderboard List */}
          <div className="space-y-2">
            {leaderboard.entries.map((entry) => (
              <div
                key={entry.wallet}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 hover:scale-[1.02] ${getRankBg(entry.rank)}`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`text-2xl font-bold ${getRankColor(entry.rank)} min-w-[2rem] text-center`}>
                    {entry.rank}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{entry.username}</div>
                    <div className="text-xs text-gray-400 font-mono">
                      {entry.wallet.slice(0, 6)}...{entry.wallet.slice(-4)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-yellow-400">
                    {entry.score.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-400">
                    {entry.gamesPlayed} games
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Last Updated */}
          {lastUpdated && (
            <div className="mt-4 text-center text-xs text-gray-500">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!loading && !error && !leaderboard && (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">No leaderboard data available</div>
          <button
            onClick={fetchLeaderboard}
            className="text-green-400 hover:text-green-300 text-sm underline"
          >
            Try loading again
          </button>
        </div>
      )}

      {/* Competition Info */}
      <div className="mt-6 bg-green-900/20 border border-green-500/50 rounded-lg p-4">
        <h5 className="text-green-400 font-medium mb-2">Competition Info</h5>
        <ul className="text-green-300 text-sm space-y-1">
          <li>• Rankings update in real-time</li>
          <li>• Score is based on treasures collected and enemies defeated</li>
          <li>• Top 3 players get special recognition</li>
          <li>• Compete with players from around the world</li>
        </ul>
      </div>
    </div>
  );
}
