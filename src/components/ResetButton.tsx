import { useGameStore } from "@/store/useGameStore"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

export function ResetButton() {
  const resetGame = useGameStore((state) => state.resetGame)

  const handleReset = () => {
    localStorage.removeItem("party-water-board-tiles")
    resetGame()
    window.location.reload()
  }

  return (
    <Button
      onClick={handleReset}
      variant="outline"
      className="fixed bottom-4 right-4 z-10 bg-gray-800 border-gray-700 text-gray-200 shadow-lg hover:shadow-xl hover:bg-gray-700"
    >
      <RotateCcw className="w-4 h-4" />
      Reiniciar
    </Button>
  )
}

