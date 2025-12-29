import { useGameStore } from "@/store/useGameStore"

export function useDiceRoll() {
  const setDiceValue = useGameStore((state) => state.setDiceValue)
  const diceValue = useGameStore((state) => state.diceValue)
  const currentPlayerIndex = useGameStore((state) => state.currentPlayerIndex)
  const movePlayer = useGameStore((state) => state.movePlayer)

  const rollDice = () => {
    if (diceValue !== null) return

    const roll = Math.floor(Math.random() * 6) + 1
    setDiceValue(roll)
    movePlayer(roll)
  }

  return { rollDice, diceValue }
}

