import { useState } from "react"
import { useDiceRoll } from "@/hooks/useDiceRoll"
import { useGameStore } from "@/store/useGameStore"
import { Button } from "@/components/ui/button"
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react"

const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6]

export function Dice() {
  const { rollDice, diceValue } = useDiceRoll()
  const currentPlayerIndex = useGameStore((state) => state.currentPlayerIndex)
  const isQuestionModalOpen = useGameStore((state) => state.isQuestionModalOpen)
  const [isRolling, setIsRolling] = useState(false)
  const [rollingValue, setRollingValue] = useState<number | null>(null)

  const handleRollDice = () => {
    if (diceValue !== null || isQuestionModalOpen) return

    setIsRolling(true)
    setRollingValue(Math.floor(Math.random() * 6) + 1)

    const rollInterval = setInterval(() => {
      setRollingValue(Math.floor(Math.random() * 6) + 1)
    }, 100)

    setTimeout(() => {
      clearInterval(rollInterval)
      rollDice()
      setIsRolling(false)
    }, 1000)
  }

  const displayValue = isRolling ? rollingValue : diceValue
  const DiceIcon = displayValue ? diceIcons[displayValue - 1] : Dice1

  return (
    <div className="fixed top-4 right-4 z-10 flex flex-col items-center gap-2">
      <div className="text-sm font-semibold text-gray-300">
        Turno: Equipo {currentPlayerIndex + 1}
      </div>
      <Button
        onClick={handleRollDice}
        disabled={diceValue !== null || isQuestionModalOpen || isRolling}
        size="lg"
        className={`w-20 h-20 text-4xl font-bold transition-transform duration-150 bg-gray-800 hover:bg-gray-700 text-white border-gray-700 ${
          isRolling ? "animate-spin" : ""
        }`}
      >
        {displayValue ? (
          <DiceIcon className={`w-12 h-12 ${isRolling ? "animate-pulse" : ""}`} />
        ) : (
          <span className="text-2xl">🎲</span>
        )}
      </Button>
      {displayValue && (
        <div className={`text-2xl font-bold text-white ${isRolling ? "animate-pulse" : ""}`}>
          {displayValue}
        </div>
      )}
    </div>
  )
}

