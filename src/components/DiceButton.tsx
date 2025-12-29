import { useState } from "react"
import { useDiceRoll } from "@/hooks/useDiceRoll"
import { useGameStore } from "@/store/useGameStore"
import { Button } from "@/components/ui/button"
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react"

const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6]

export function DiceButton() {
  const { rollDice, diceValue } = useDiceRoll()
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
  const hasRolled = diceValue !== null

  return (
    <Button
      onClick={handleRollDice}
      disabled={hasRolled || isQuestionModalOpen || isRolling}
      className={`
        w-full bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 
        text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-300
        ${isRolling ? "animate-pulse" : ""}
        ${hasRolled ? "opacity-75 cursor-not-allowed" : ""}
      `}
    >
      <div className="flex items-center justify-center gap-2">
        {displayValue ? (
          <DiceIcon className="w-5 h-5" />
        ) : (
          <span className="text-xl">🎲</span>
        )}
        <span>Tirar dado {displayValue ? `(${displayValue})` : ""}</span>
      </div>
    </Button>
  )
}

