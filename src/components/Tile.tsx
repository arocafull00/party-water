import { cn } from "@/lib/utils"
import { Pencil, Users, MessageCircle, HelpCircle, Hand } from "lucide-react"
import type { TileType } from "@/types/game"

interface TileProps {
  tileType: TileType
  isActive?: boolean
  hasPlayer?: number[]
  onClick?: () => void
}

const categoryIcons: Record<TileType, React.ReactNode> = {
  DIBUJAR: <Pencil className="w-5 h-5 md:w-6 md:h-6" />,
  "CULTURA POPULAR": <Users className="w-5 h-5 md:w-6 md:h-6" />,
  "ADIVINA LA PALABRA": <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />,
  "QUIÉN ES MÁS PROBABLE QUE": <HelpCircle className="w-5 h-5 md:w-6 md:h-6" />,
  MÍMICA: <Hand className="w-5 h-5 md:w-6 md:h-6" />,
}

const categoryNames: Record<TileType, string> = {
  DIBUJAR: "Dibujar",
  "CULTURA POPULAR": "Cultura Popular",
  "ADIVINA LA PALABRA": "Adivina la Palabra",
  "QUIÉN ES MÁS PROBABLE QUE": "Quién es más probable",
  MÍMICA: "Mímica",
}

const categoryColors: Record<TileType, string> = {
  DIBUJAR: "bg-white hover:bg-gray-50 border-2 border-gray-300 text-blue-500",
  "CULTURA POPULAR": "bg-white hover:bg-gray-50 border-2 border-gray-300 text-purple-500",
  "ADIVINA LA PALABRA": "bg-white hover:bg-gray-50 border-2 border-gray-300 text-green-500",
  "QUIÉN ES MÁS PROBABLE QUE": "bg-white hover:bg-gray-50 border-2 border-gray-300 text-yellow-500",
  MÍMICA: "bg-white hover:bg-gray-50 border-2 border-gray-300 text-red-500",
}

const playerColors: Record<number, string> = {
  1: "bg-rose-500",
  2: "bg-sky-500",
  3: "bg-emerald-500",
  4: "bg-amber-500",
}

export function Tile({ tileType, isActive, hasPlayer, onClick }: TileProps) {
  return (
    <div className="relative group w-full h-full flex items-center justify-center">
      <button
        onClick={onClick}
        className={cn(
          "w-full h-full max-w-20 max-h-20 md:max-w-24 md:max-h-24 lg:max-w-28 lg:max-h-28 aspect-square rounded-full flex items-center justify-center",
          "transition-all duration-300 cursor-pointer hover:scale-110 hover:z-10",
          categoryColors[tileType],
          isActive && "ring-4 ring-purple-400 ring-offset-2 ring-offset-gray-100 shadow-lg shadow-purple-500/50"
        )}
        title={categoryNames[tileType]}
      >
        {categoryIcons[tileType]}
      </button>
      
      {hasPlayer && hasPlayer.length > 0 && (
        <div className="absolute top-0 right-0 flex -space-x-1">
          {hasPlayer.map((playerId) => (
            <div
              key={playerId}
              className={cn(
                "w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white",
                playerColors[playerId] || "bg-gray-500"
              )}
            >
              {playerId}
            </div>
          ))}
        </div>
      )}

      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
        <div className="bg-gray-800 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap border border-gray-700 text-white shadow-lg">
          {categoryNames[tileType]}
        </div>
      </div>
    </div>
  )
}

