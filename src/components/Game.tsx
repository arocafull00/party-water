import { Board } from "@/components/Board"
import { QuestionModal } from "@/components/QuestionModal"
import { VictoryScreen } from "@/components/VictoryScreen"
import { PlayerCard } from "@/components/PlayerCard"
import { CategoryLegend } from "@/components/CategoryLegend"
import { DiceButton } from "@/components/DiceButton"
import { useGameStore } from "@/store/useGameStore"
import { Link } from "react-router-dom"
import { Settings, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Game() {
  const players = useGameStore((state) => state.players)
  const currentPlayerIndex = useGameStore((state) => state.currentPlayerIndex)
  const currentPlayer = players[currentPlayerIndex]
  const resetGame = useGameStore((state) => state.resetGame)

  const handleReset = () => {
    localStorage.removeItem("party-water-board-tiles")
    resetGame()
    window.location.reload()
  }

  return (
    <div className="h-screen flex flex-col p-4 md:p-6 overflow-hidden bg-gray-100">
      <header className="flex-shrink-0 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Party Water
            </h1>
            <span className="text-2xl">🎲</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleReset}>
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Link to="/questions">
              <Button variant="outline" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 min-h-0">
        <section className="bg-white/50 backdrop-blur-sm rounded-3xl border border-gray-200 overflow-hidden flex items-center justify-center p-4">
          <Board />
        </section>

        <aside className="space-y-3 overflow-y-auto bg-gradient-to-b from-purple-500/10 via-purple-500/5 to-orange-500/10 rounded-2xl p-3 border border-purple-200/30">
          <div className="bg-gradient-to-r from-purple-500/30 to-orange-500/30 rounded-2xl p-3 border border-purple-300/30">
            <p className="text-xs text-gray-700 mb-1">Turno de</p>
            <p className="text-lg font-bold text-gray-900">
              {currentPlayer.name}
            </p>
          </div>

          <div className="space-y-2">
            <DiceButton />
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-xs text-gray-600 uppercase tracking-wide px-1">
              Jugadores
            </h3>
            {players.map((player) => (
              <PlayerCard
                key={player.id}
                playerId={player.id}
                isActive={player.id === currentPlayer.id}
              />
            ))}
          </div>

          <CategoryLegend />
        </aside>
      </main>

      <QuestionModal />
      <VictoryScreen />
    </div>
  )
}

