import { Pencil, Users, MessageCircle, HelpCircle, Hand } from "lucide-react"
import type { TileType } from "@/types/game"

const categories: { type: TileType; icon: React.ReactNode; name: string; color: string }[] = [
  {
    type: "DIBUJAR",
    icon: <Pencil className="w-4 h-4" />,
    name: "Dibujar",
    color: "text-blue-500",
  },
  {
    type: "CULTURA POPULAR",
    icon: <Users className="w-4 h-4" />,
    name: "Cultura Popular",
    color: "text-purple-500",
  },
  {
    type: "ADIVINA LA PALABRA",
    icon: <MessageCircle className="w-4 h-4" />,
    name: "Adivina la Palabra",
    color: "text-green-500",
  },
  {
    type: "QUIÉN ES MÁS PROBABLE QUE",
    icon: <HelpCircle className="w-4 h-4" />,
    name: "Quién es más probable",
    color: "text-yellow-500",
  },
  {
    type: "MÍMICA",
    icon: <Hand className="w-4 h-4" />,
    name: "Mímica",
    color: "text-red-500",
  },
]

export function CategoryLegend() {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-xs text-black/80 uppercase tracking-wide px-1">
        Categorías
      </h3>
      <div className="space-y-1.5">
        {categories.map((category) => (
          <div
            key={category.type}
            className="flex items-center gap-2 text-black/90 text-sm bg-white/10 rounded-lg px-2 py-1.5"
          >
            <div className={category.color}>{category.icon}</div>
            <span className="text-xs">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

