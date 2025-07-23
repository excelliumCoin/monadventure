'use client'

import { useState } from 'react'
import { GameAction } from '@/lib/multisynq'

interface GameControlsProps {
  onMove: (direction: 'north' | 'south' | 'east' | 'west') => Promise<void>;
  onAction: (action: GameAction) => Promise<void>;
  disabled?: boolean;
  loading?: boolean;
}

export default function GameControls({ onMove, onAction, disabled = false, loading = false }: GameControlsProps) {
  const [lastAction, setLastAction] = useState<string>('');
  const [actionLoading, setActionLoading] = useState<string>('');

  const handleMove = async (direction: 'north' | 'south' | 'east' | 'west') => {
    if (disabled || loading) return;
    
    setActionLoading(direction);
    setLastAction(`Moving ${direction}...`);
    
    try {
      await onMove(direction);
      setLastAction(`Moved ${direction} successfully!`);
    } catch (error) {
      setLastAction(`Failed to move ${direction}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setActionLoading('');
      setTimeout(() => setLastAction(''), 3000);
    }
  };

  const handleSpecialAction = async (actionType: 'collect' | 'attack' | 'defend') => {
    if (disabled || loading) return;
    
    setActionLoading(actionType);
    setLastAction(`Performing ${actionType}...`);
    
    try {
      const action: GameAction = {
        type: actionType,
        timestamp: Date.now(),
        metadata: { source: 'game-controls' }
      };
      
      await onAction(action);
      setLastAction(`${actionType} action completed!`);
    } catch (error) {
      setLastAction(`Failed to ${actionType}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setActionLoading('');
      setTimeout(() => setLastAction(''), 3000);
    }
  };

  const isButtonDisabled = (action: string) => disabled || loading || actionLoading === action;
  const isButtonLoading = (action: string) => actionLoading === action;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-semibold mb-6 text-center text-blue-400">Game Controls</h3>
      
      {/* Movement Controls */}
      <div className="mb-8">
        <h4 className="text-lg font-medium mb-4 text-gray-300">Movement</h4>
        <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto">
          {/* North */}
          <div></div>
          <button
            onClick={() => handleMove('north')}
            disabled={isButtonDisabled('north')}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
          >
            {isButtonLoading('north') ? '...' : 'North'}
          </button>
          <div></div>
          
          {/* West, Center, East */}
          <button
            onClick={() => handleMove('west')}
            disabled={isButtonDisabled('west')}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
          >
            {isButtonLoading('west') ? '...' : 'West'}
          </button>
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            </div>
          </div>
          <button
            onClick={() => handleMove('east')}
            disabled={isButtonDisabled('east')}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
          >
            {isButtonLoading('east') ? '...' : 'East'}
          </button>
          
          {/* South */}
          <div></div>
          <button
            onClick={() => handleMove('south')}
            disabled={isButtonDisabled('south')}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
          >
            {isButtonLoading('south') ? '...' : 'South'}
          </button>
          <div></div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-4 text-gray-300">Actions</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => handleSpecialAction('collect')}
            disabled={isButtonDisabled('collect')}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
          >
            {isButtonLoading('collect') ? 'Collecting...' : 'Collect'}
          </button>
          <button
            onClick={() => handleSpecialAction('attack')}
            disabled={isButtonDisabled('attack')}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
          >
            {isButtonLoading('attack') ? 'Attacking...' : 'Attack'}
          </button>
          <button
            onClick={() => handleSpecialAction('defend')}
            disabled={isButtonDisabled('defend')}
            className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
          >
            {isButtonLoading('defend') ? 'Defending...' : 'Defend'}
          </button>
        </div>
      </div>

      {/* Action Feedback */}
      {lastAction && (
        <div className="mt-4 p-3 bg-gray-700/50 rounded-lg border border-gray-600">
          <p className="text-sm text-gray-300 text-center">{lastAction}</p>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 text-xs text-gray-400 text-center">
        <p>Use movement controls to explore the world.</p>
        <p>Use action buttons to interact with objects and enemies.</p>
      </div>
    </div>
  );
}
