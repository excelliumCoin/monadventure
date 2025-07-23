import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Monad Adventure
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Experience the future of blockchain gaming on Monad testnet. Navigate through challenges, 
          compete with players worldwide, and climb the leaderboard in this exciting adventure game.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-3 text-blue-400">Blockchain Powered</h3>
            <p className="text-gray-400">Built on Monad testnet with real blockchain interactions</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-3 text-purple-400">MultiSynq Integration</h3>
            <p className="text-gray-400">Advanced game session management and real-time updates</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-3 text-green-400">Competitive Gaming</h3>
            <p className="text-gray-400">Global leaderboards and competitive gameplay</p>
          </div>
        </div>

        <Link 
          href="/game" 
          className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Start Playing
        </Link>
      </div>
    </div>
  )
}
