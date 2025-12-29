import { useGameStore } from "@/store/useGameStore"
import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"

export function VictoryScreen() {
  const winner = useGameStore((state) => state.winner)
  const players = useGameStore((state) => state.players)
  const resetGame = useGameStore((state) => state.resetGame)

  if (winner === null) return null

  const winnerPlayer = players[winner]

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 max-w-md w-full text-center">
        <Trophy className="w-24 h-24 mx-auto mb-4 text-yellow-500" />
        <h2 className="text-4xl font-bold mb-4 text-white">¡Felicidades!</h2>
        <p className="text-2xl mb-2 text-white">
          {winner === 0 ? "🔵" : "🔴"} {winnerPlayer.name}
        </p>
        <p className="text-lg text-gray-300 mb-6">¡Has ganado el juego!</p>
        <Button onClick={resetGame} size="lg" className="w-full bg-gray-700 hover:bg-gray-600 text-white">
          Jugar de nuevo
        </Button>
      </div>
    </div>
  )
}

