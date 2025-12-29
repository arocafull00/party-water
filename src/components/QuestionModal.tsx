import { useEffect } from "react"
import { useGameStore } from "@/store/useGameStore"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Timer, Eye } from "lucide-react"

const TILE_COLORS: Record<string, string> = {
  DIBUJAR: "bg-blue-500",
  "CULTURA POPULAR": "bg-purple-500",
  "ADIVINA LA PALABRA": "bg-green-500",
  "QUIÉN ES MÁS PROBABLE QUE": "bg-yellow-500",
  MÍMICA: "bg-red-500",
}

const PRIVATE_QUESTIONS: string[] = ["MÍMICA", "DIBUJAR", "ADIVINA LA PALABRA"]

export function QuestionModal() {
  const isOpen = useGameStore((state) => state.isQuestionModalOpen)
  const currentQuestion = useGameStore((state) => state.currentQuestion)
  const currentTileType = useGameStore((state) => state.currentTileType)
  const timer = useGameStore((state) => state.timer)
  const isGameStarted = useGameStore((state) => state.isGameStarted)
  const isWordRevealed = useGameStore((state) => state.isWordRevealed)
  const setTimer = useGameStore((state) => state.setTimer)
  const setWordRevealed = useGameStore((state) => state.setWordRevealed)
  const startGame = useGameStore((state) => state.startGame)
  const answerCorrect = useGameStore((state) => state.answerCorrect)
  const answerWrong = useGameStore((state) => state.answerWrong)
  const closeQuestionModal = useGameStore((state) => state.closeQuestionModal)

  const isPrivateQuestion = currentTileType ? PRIVATE_QUESTIONS.includes(currentTileType) : false

  useEffect(() => {
    if (!isOpen || !isGameStarted) return

    setTimer(60)

    const interval = setInterval(() => {
      const currentTimer = useGameStore.getState().timer
      const newTimer = Math.max(0, currentTimer - 1)
      setTimer(newTimer)
      
      if (newTimer === 0) {
        clearInterval(interval)
        answerWrong()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isOpen, isGameStarted, setTimer, answerWrong])

  const handleRevealWord = () => {
    setWordRevealed(true)
  }

  if (!currentQuestion || !currentTileType) return null

  const shouldShowWord = !isPrivateQuestion || isWordRevealed || isGameStarted

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeQuestionModal()}>
      <DialogContent className="max-w-md bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle
            className={`${TILE_COLORS[currentTileType]} text-white p-4 rounded-lg text-center mb-4`}
          >
            {currentTileType}
          </DialogTitle>
          <DialogDescription className="text-center pt-4">
            {isGameStarted && (
              <div className="flex items-center justify-center gap-2 mb-4 text-white">
                <Timer className="w-5 h-5" />
                <span className="text-2xl font-bold">{timer}s</span>
              </div>
            )}
            {shouldShowWord ? (
              <p className="text-lg font-semibold text-orange-200">
                {currentQuestion}
              </p>
            ) : (
              <div className="space-y-4">
                <p className="text-white text-lg mb-4">
                  Acércate a la pantalla y presiona el botón para ver tu palabra
                </p>
                <Button
                  onClick={handleRevealWord}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-xl px-12 py-8 w-full flex items-center justify-center gap-3"
                >
                  <Eye className="w-6 h-6" />
                  Revelar palabra
                </Button>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 justify-center pt-4">
          {!isGameStarted ? (
            !isPrivateQuestion || isWordRevealed ? (
              <Button
                onClick={startGame}
                className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-6"
              >
                Empezar
              </Button>
            ) : null
          ) : (
            <>
              <Button
                onClick={answerCorrect}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                ✓ Correcto
              </Button>
              <Button
                onClick={answerWrong}
                className="bg-transparent hover:bg-transparent text-orange-200 border border-orange-200"
              >
                ✗ Incorrecto
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

