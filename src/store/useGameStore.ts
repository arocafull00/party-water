import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { GameState, Player, TileType } from "@/types/game"

export const CATEGORY_TIMERS: Record<TileType, number> = {
  DIBUJAR: 90,
  "CULTURA POPULAR": 60,
  "ADIVINA LA PALABRA": 60,
  "QUIÉN ES MÁS PROBABLE QUE": 5,
  MÍMICA: 60,
}

interface GameStore extends GameState {
  isGameStarted: boolean
  isWordRevealed: boolean
  setDiceValue: (value: number) => void
  movePlayer: (steps: number) => void
  setCurrentQuestion: (question: string, tileType: TileType, answer?: string) => void
  openQuestionModal: () => void
  closeQuestionModal: () => void
  startGame: () => void
  setTimer: (time: number) => void
  setWordRevealed: (revealed: boolean) => void
  answerCorrect: () => void
  answerWrong: () => void
  resetGame: () => void
  checkWinner: () => number | null
}

const initialPlayers: Player[] = [
  {
    id: 1,
    name: "Equipo 1",
    position: 0,
    scores: {
      DIBUJAR: 0,
      "CULTURA POPULAR": 0,
      "ADIVINA LA PALABRA": 0,
      "QUIÉN ES MÁS PROBABLE QUE": 0,
      MÍMICA: 0,
    },
  },
  {
    id: 2,
    name: "Equipo 2",
    position: 0,
    scores: {
      DIBUJAR: 0,
      "CULTURA POPULAR": 0,
      "ADIVINA LA PALABRA": 0,
      "QUIÉN ES MÁS PROBABLE QUE": 0,
      MÍMICA: 0,
    },
  },
]

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      players: initialPlayers,
      currentPlayerIndex: 0,
      diceValue: null,
      currentQuestion: null,
      currentAnswer: null,
      currentTileType: null,
      isQuestionModalOpen: false,
      isGameStarted: false,
      isWordRevealed: false,
      timer: 60,
      winner: null,
      boardTiles: null,

      setDiceValue: (value) => set({ diceValue: value }),

      movePlayer: (steps) => {
        const state = get()
        const currentPlayer = state.players[state.currentPlayerIndex]
        const boardSize = state.boardTiles?.length || 30
        const newPosition = (currentPlayer.position + steps) % boardSize
        
        set({
          players: state.players.map((player, index) =>
            index === state.currentPlayerIndex
              ? { ...player, position: newPosition }
              : player
          ),
        })
      },

      setCurrentQuestion: (question, tileType, answer) =>
        set({ currentQuestion: question, currentTileType: tileType, currentAnswer: answer || null }),

      openQuestionModal: () => {
        const state = get()
        const timer = state.currentTileType ? CATEGORY_TIMERS[state.currentTileType] : 60
        set({ isQuestionModalOpen: true, timer, isGameStarted: false, isWordRevealed: false })
      },

      closeQuestionModal: () =>
        set({
          isQuestionModalOpen: false,
          currentQuestion: null,
          currentAnswer: null,
          currentTileType: null,
          diceValue: null,
          isGameStarted: false,
          isWordRevealed: false,
        }),

      startGame: () => set({ isGameStarted: true }),

      setTimer: (time) => set({ timer: time }),

      setWordRevealed: (revealed) => set({ isWordRevealed: revealed }),

      answerCorrect: () => {
        const state = get()
        const tileType = state.currentTileType

        if (!tileType) return

        const updatedPlayers = state.players.map((player, index) =>
          index === state.currentPlayerIndex
            ? {
                ...player,
                scores: {
                  ...player.scores,
                  [tileType]: player.scores[tileType] + 1,
                },
              }
            : player
        )

        set({
          players: updatedPlayers,
          isQuestionModalOpen: false,
          currentQuestion: null,
          currentAnswer: null,
          currentTileType: null,
          diceValue: null,
          isGameStarted: false,
          isWordRevealed: false,
        })

        const winner = get().checkWinner()
        if (winner !== null) {
          set({ winner })
        }
      },

      answerWrong: () => {
        const state = get()
        const nextPlayerIndex = (state.currentPlayerIndex + 1) % 2
        
        set({
          currentPlayerIndex: nextPlayerIndex,
          isQuestionModalOpen: false,
          currentQuestion: null,
          currentAnswer: null,
          currentTileType: null,
          diceValue: null,
          isGameStarted: false,
          isWordRevealed: false,
        })
      },

      resetGame: () =>
        set({
          players: initialPlayers,
          currentPlayerIndex: 0,
          diceValue: null,
          currentQuestion: null,
          currentAnswer: null,
          currentTileType: null,
          isQuestionModalOpen: false,
          isGameStarted: false,
          isWordRevealed: false,
          timer: 60,
          winner: null,
          boardTiles: null,
        }),

      checkWinner: () => {
        const state = get()
        for (let i = 0; i < state.players.length; i++) {
          const player = state.players[i]
          const hasAllCategories =
            player.scores.DIBUJAR > 0 &&
            player.scores["CULTURA POPULAR"] > 0 &&
            player.scores["ADIVINA LA PALABRA"] > 0 &&
            player.scores["QUIÉN ES MÁS PROBABLE QUE"] > 0 &&
            player.scores.MÍMICA > 0

          if (hasAllCategories) {
            return i
          }
        }
        return null
      },
    }),
    {
      name: "party-water-game-storage",
    }
  )
)

