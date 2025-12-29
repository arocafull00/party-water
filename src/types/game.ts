export type TileType = "DIBUJAR" | "CULTURA POPULAR" | "ADIVINA LA PALABRA" | "QUIÉN ES MÁS PROBABLE QUE" | "MÍMICA"

export interface Player {
  id: number
  name: string
  position: number
  scores: {
    DIBUJAR: number
    "CULTURA POPULAR": number
    "ADIVINA LA PALABRA": number
    "QUIÉN ES MÁS PROBABLE QUE": number
    MÍMICA: number
  }
}

export interface GameState {
  players: Player[]
  currentPlayerIndex: number
  diceValue: number | null
  currentQuestion: string | null
  currentAnswer: string | null
  currentTileType: TileType | null
  isQuestionModalOpen: boolean
  timer: number
  winner: number | null
  boardTiles: TileType[] | null
}

