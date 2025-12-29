import { useGameStore } from "@/store/useGameStore"
import type { TileType } from "@/types/game"
import { CheckCircle2, Circle } from "lucide-react"

const TILE_TYPES: TileType[] = [
  "DIBUJAR",
  "CULTURA POPULAR",
  "ADIVINA LA PALABRA",
  "QUIÉN ES MÁS PROBABLE QUE",
  "MÍMICA",
]

const TILE_COLORS: Record<TileType, string> = {
  DIBUJAR: "bg-blue-500",
  "CULTURA POPULAR": "bg-purple-500",
  "ADIVINA LA PALABRA": "bg-green-500",
  "QUIÉN ES MÁS PROBABLE QUE": "bg-yellow-500",
  MÍMICA: "bg-red-500",
}

export function ScoreBoard() {
  const players = useGameStore((state) => state.players)

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {players.map((player, playerIndex) => (
        <div
          key={player.id}
          className={`border-2 rounded-lg p-4 bg-gray-800 ${
            playerIndex === 0 ? "border-blue-500" : "border-red-500"
          }`}
        >
          <h3 className="text-xl font-bold mb-4 text-white">
            {playerIndex === 0 ? "🔵" : "🔴"} {player.name}
          </h3>
          <div className="space-y-2">
            {TILE_TYPES.map((tileType) => {
              const hasScore = player.scores[tileType] > 0
              return (
                <div
                  key={tileType}
                  className={`${TILE_COLORS[tileType]} text-white rounded p-2 flex items-center justify-between`}
                >
                  <span className="text-sm font-medium">{tileType}</span>
                  <div className="flex items-center gap-2">
                    {hasScore ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Circle className="w-5 h-5 opacity-50" />
                    )}
                    <span className="font-bold">{player.scores[tileType]}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

