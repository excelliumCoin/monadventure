export interface GameSession {
  sessionId: string;
  gameId: string;
  userWallet: string;
  status: 'active' | 'paused' | 'completed';
  score: number;
  position: { x: number; y: number };
  createdAt: string;
}

export interface GameAction {
  type: 'move' | 'collect' | 'attack' | 'defend';
  direction?: 'north' | 'south' | 'east' | 'west';
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  wallet: string;
  score: number;
  gamesPlayed: number;
}

export interface LeaderboardData {
  gameId: string;
  entries: LeaderboardEntry[];
  totalPlayers: number;
  lastUpdated: string;
}

// MultiSynq API configuration
const MULTISYNQ_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_MULTISYNQ_API_URL || "https://api.multisynq.io/v1",
  API_KEY: process.env.NEXT_PUBLIC_MULTISYNQ_API_KEY || "2mp2ZSWLJCwXGNka3uw3rxKM9CPqTSouwJKwcLX2vN",
  GAME_ID: "monad-adventure-v1"
};

export class MultiSynqAPI {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = MULTISYNQ_CONFIG.API_KEY;
    this.baseUrl = MULTISYNQ_CONFIG.BASE_URL;
  }

  async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
      'Accept': 'application/json'
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers
        }
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`MultiSynq API Error (${endpoint}):`, error.message);
        throw error;
      }
      throw new Error('Unknown API error');
    }
  }

  async createGameSession(userWallet: string): Promise<GameSession> {
    try {
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // In a real implementation, this would be:
      // return await this.makeRequest<GameSession>('/sessions', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     gameId: MULTISYNQ_CONFIG.GAME_ID,
      //     userWallet
      //   })
      // });

      // Simulated response
      const session: GameSession = {
        sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        gameId: MULTISYNQ_CONFIG.GAME_ID,
        userWallet,
        status: 'active',
        score: 0,
        position: { x: 0, y: 0 },
        createdAt: new Date().toISOString()
      };

      return session;
    } catch (error) {
      throw new Error(`Failed to create game session: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getSessionStatus(sessionId: string): Promise<GameSession> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      // Simulate session data retrieval
      const session: GameSession = {
        sessionId,
        gameId: MULTISYNQ_CONFIG.GAME_ID,
        userWallet: '0x' + Math.random().toString(16).substr(2, 40),
        status: 'active',
        score: Math.floor(Math.random() * 1000),
        position: { 
          x: Math.floor(Math.random() * 10), 
          y: Math.floor(Math.random() * 10) 
        },
        createdAt: new Date(Date.now() - Math.random() * 3600000).toISOString()
      };

      return session;
    } catch (error) {
      throw new Error(`Failed to get session status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async submitGameAction(sessionId: string, action: GameAction): Promise<{ success: boolean; newScore: number; message: string }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      // Simulate action processing
      const success = Math.random() > 0.1; // 90% success rate
      const scoreIncrease = success ? Math.floor(Math.random() * 50) + 10 : 0;
      
      let message = '';
      if (action.type === 'move') {
        message = success 
          ? `Moved ${action.direction}! Found treasure worth ${scoreIncrease} points!`
          : 'Move blocked by obstacle!';
      } else {
        message = success 
          ? `Action ${action.type} successful! Gained ${scoreIncrease} points!`
          : `Action ${action.type} failed!`;
      }

      return {
        success,
        newScore: scoreIncrease,
        message
      };
    } catch (error) {
      throw new Error(`Failed to submit game action: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getLeaderboard(limit: number = 10): Promise<LeaderboardData> {
    try {
      await new Promise(resolve => setTimeout(resolve, 600));

      // Generate simulated leaderboard data
      const entries: LeaderboardEntry[] = [];
      const playerNames = [
        'CryptoKnight', 'BlockchainBeast', 'MonadMaster', 'DeFiDragon', 'Web3Warrior',
        'TokenTitan', 'ChainChampion', 'EthereumElite', 'SoliditySlayer', 'GasGuru',
        'SmartContractSage', 'DecentralizedDuke', 'ConsensusKing', 'ValidatorVanguard', 'NodeNinja'
      ];

      for (let i = 0; i < Math.min(limit, 15); i++) {
        entries.push({
          rank: i + 1,
          username: playerNames[i] || `Player${i + 1}`,
          wallet: `0x${Math.random().toString(16).substr(2, 40)}`,
          score: Math.floor(Math.random() * 5000) + (15 - i) * 100,
          gamesPlayed: Math.floor(Math.random() * 50) + 1
        });
      }

      // Sort by score descending
      entries.sort((a, b) => b.score - a.score);
      
      // Update ranks
      entries.forEach((entry, index) => {
        entry.rank = index + 1;
      });

      return {
        gameId: MULTISYNQ_CONFIG.GAME_ID,
        entries,
        totalPlayers: Math.floor(Math.random() * 1000) + 500,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Failed to get leaderboard: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getAvailableGames(): Promise<Array<{ id: string; name: string; description: string; players: number }>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));

      return [
        {
          id: MULTISYNQ_CONFIG.GAME_ID,
          name: 'Monad Adventure',
          description: 'Explore the blockchain realm and collect treasures',
          players: Math.floor(Math.random() * 500) + 100
        },
        {
          id: 'monad-battle-arena',
          name: 'Battle Arena',
          description: 'PvP combat on the blockchain',
          players: Math.floor(Math.random() * 300) + 50
        },
        {
          id: 'monad-treasure-hunt',
          name: 'Treasure Hunt',
          description: 'Find hidden treasures across the network',
          players: Math.floor(Math.random() * 200) + 25
        }
      ];
    } catch (error) {
      throw new Error(`Failed to get available games: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Export singleton instance
export const multiSynqAPI = new MultiSynqAPI();
