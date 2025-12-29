import { useGameStore } from "@/store/useGameStore"
import { useQuestion } from "@/hooks/useQuestion"
import type { TileType } from "@/types/game"
import { useEffect } from "react"
import { Tile } from "@/components/Tile"

const TILE_TYPES: TileType[] = [
  "DIBUJAR",
  "CULTURA POPULAR",
  "ADIVINA LA PALABRA",
  "QUIÉN ES MÁS PROBABLE QUE",
  "MÍMICA",
]

function generateBoard(): TileType[] {
  const tiles: TileType[] = []
  const counts: Record<TileType, number> = {
    DIBUJAR: 0,
    "CULTURA POPULAR": 0,
    "ADIVINA LA PALABRA": 0,
    "QUIÉN ES MÁS PROBABLE QUE": 0,
    MÍMICA: 0,
  }

  for (let i = 0; i < 30; i++) {
    const availableTypes = TILE_TYPES.filter((type) => counts[type] < 6)
    const randomType =
      availableTypes[Math.floor(Math.random() * availableTypes.length)]
    tiles.push(randomType)
    counts[randomType]++
  }

  return tiles
}

export function Board() {
  const players = useGameStore((state) => state.players)
  const diceValue = useGameStore((state) => state.diceValue)
  const currentPlayerIndex = useGameStore((state) => state.currentPlayerIndex)
  const { showQuestion } = useQuestion()
  const boardTiles = useGameStore((state) => state.boardTiles)

  useEffect(() => {
    if (boardTiles === null) {
      const storedTiles = localStorage.getItem("party-water-board-tiles")
      if (!storedTiles) {
        const newTiles = generateBoard()
        localStorage.setItem("party-water-board-tiles", JSON.stringify(newTiles))
        useGameStore.setState({ boardTiles: newTiles })
      } else {
        const parsedTiles = JSON.parse(storedTiles)
        if (parsedTiles.length !== 30) {
          const newTiles = generateBoard()
          localStorage.setItem("party-water-board-tiles", JSON.stringify(newTiles))
          useGameStore.setState({ boardTiles: newTiles })
        } else {
          useGameStore.setState({ boardTiles: parsedTiles })
        }
      }
    }
  }, [boardTiles])

  const tiles = boardTiles || []

  useEffect(() => {
    if (diceValue !== null && tiles.length > 0) {
      const currentPlayerIndex = useGameStore.getState().currentPlayerIndex
      const currentPlayer = players[currentPlayerIndex]
      const tileIndex = currentPlayer.position % tiles.length
      const tileType = tiles[tileIndex]
      if (tileType) {
        const timer = setTimeout(() => {
          showQuestion(tileType)
        }, 500)
        return () => clearTimeout(timer)
      }
    }
  }, [diceValue, players, tiles, showQuestion])


  if (tiles.length === 0) {
    return (
      <div className="relative w-full h-full bg-gray-100 rounded-lg p-4 flex items-center justify-center">
        <div className="text-gray-500">Cargando tablero...</div>
      </div>
    )
  }

  const currentPlayer = players[currentPlayerIndex]

  if (tiles.length !== 30) {
    return (
      <div className="relative w-full h-full bg-gray-100 rounded-lg p-4 flex items-center justify-center">
        <div className="text-gray-500">Generando tablero...</div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-orange-50 rounded-lg p-4">
      <div className="relative w-full h-full grid grid-cols-6 grid-rows-5 gap-2">
        {tiles.slice(0, 30).map((tileType, index) => {
          const playersOnTile = players
            .filter((player) => player.position % tiles.length === index)
            .map((player) => player.id)
          const isActive = currentPlayer && (currentPlayer.position % tiles.length === index)

          return (
            <Tile
              key={index}
              tileType={tileType}
              isActive={isActive}
              hasPlayer={playersOnTile.length > 0 ? playersOnTile : undefined}
            />
          )
        })}
      </div>
    </div>
  )
}

