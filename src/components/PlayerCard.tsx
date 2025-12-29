import { useGameStore } from "@/store/useGameStore"
import type { TileType } from "@/types/game"
import { Dice1, Pencil, Users, MessageCircle, HelpCircle, Hand } from "lucide-react"
import { cn } from "@/lib/utils"

const TILE_TYPES: TileType[] = [
  "DIBUJAR",
  "CULTURA POPULAR",
  "ADIVINA LA PALABRA",
  "QUIÉN ES MÁS PROBABLE QUE",
  "MÍMICA",
]

const categoryIcons: Record<TileType, React.ReactNode> = {
  DIBUJAR: <Pencil className="w-3 h-3" />,
  "CULTURA POPULAR": <Users className="w-3 h-3" />,
  "ADIVINA LA PALABRA": <MessageCircle className="w-3 h-3" />,
  "QUIÉN ES MÁS PROBABLE QUE": <HelpCircle className="w-3 h-3" />,
  MÍMICA: <Hand className="w-3 h-3" />,
}

const categoryColors: Record<TileType, string> = {
  DIBUJAR: "bg-blue-300",
  "CULTURA POPULAR": "bg-purple-300",
  "ADIVINA LA PALABRA": "bg-green-300",
  "QUIÉN ES MÁS PROBABLE QUE": "bg-yellow-300",
  MÍMICA: "bg-red-300",
}

const playerCircleColors: Record<number, string> = {
  1: "bg-red-500",
  2: "bg-blue-500",
  3: "bg-emerald-500",
  4: "bg-amber-500",
}

interface PlayerCardProps {
  playerId: number
  isActive: boolean
}

export function PlayerCard({ playerId, isActive }: PlayerCardProps) {
  const players = useGameStore((state) => state.players)
  const player = players.find((p) => p.id === playerId)

  if (!player) return null

  return (
    <div
      className={cn(
        "bg-white/90 rounded-xl p-3 border-2 transition-all",
        isActive ? "border-purple-500 shadow-lg" : "border-gray-200"
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold",
              playerCircleColors[playerId] || "bg-gray-500"
            )}
          >
            {playerId}
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-800">{player.name}</p>
            <p className="text-xs text-gray-500">Casilla {player.position + 1}</p>
          </div>
        </div>
        {isActive && <Dice1 className="w-4 h-4 text-purple-500" />}
      </div>
      <div className="flex gap-1.5">
        {TILE_TYPES.map((tileType) => {
          const hasScore = player.scores[tileType] > 0
          return (
            <div
              key={tileType}
              className={cn(
                "w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center",
                hasScore ? categoryColors[tileType] : "bg-white",
                hasScore ? "border-gray-800" : "border-gray-300"
              )}
            >
              {categoryIcons[tileType]}
            </div>
          )
        })}
      </div>
    </div>
  )
}

