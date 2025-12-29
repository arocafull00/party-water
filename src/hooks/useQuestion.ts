import { useGameStore } from "@/store/useGameStore"
import type { TileType } from "@/types/game"
import drawQuestions from "@/data/questions/draw.json"
import popQuestions from "@/data/questions/pop.json"
import guessQuestions from "@/data/questions/guess.json"
import whoQuestions from "@/data/questions/who.json"
import mimeQuestions from "@/data/questions/mime.json"

const STORAGE_KEY = "party-water-questions"

const defaultQuestionMap: Record<TileType, string[]> = {
  DIBUJAR: drawQuestions.questions,
  "CULTURA POPULAR": popQuestions.questions,
  "ADIVINA LA PALABRA": guessQuestions.questions,
  "QUIÉN ES MÁS PROBABLE QUE": whoQuestions.questions,
  MÍMICA: mimeQuestions.questions,
}

function getQuestionsFromStorage(): Record<TileType, string[]> {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      const result: Record<TileType, string[]> = {} as Record<TileType, string[]>
      for (const type in defaultQuestionMap) {
        result[type as TileType] = parsed[type] || defaultQuestionMap[type as TileType]
      }
      return result
    } catch {
      return defaultQuestionMap
    }
  }
  return defaultQuestionMap
}

const questionMap = getQuestionsFromStorage()

export function useQuestion() {
  const setCurrentQuestion = useGameStore((state) => state.setCurrentQuestion)
  const openQuestionModal = useGameStore((state) => state.openQuestionModal)
  const players = useGameStore((state) => state.players)
  const currentPlayerIndex = useGameStore((state) => state.currentPlayerIndex)

  const getRandomQuestion = (tileType: TileType): string => {
    const questions = getQuestionsFromStorage()[tileType]
    if (!questions || questions.length === 0) {
      return defaultQuestionMap[tileType][0] || "Sin preguntas disponibles"
    }
    return questions[Math.floor(Math.random() * questions.length)]
  }

  const showQuestion = (tileType: TileType) => {
    const question = getRandomQuestion(tileType)
    setCurrentQuestion(question, tileType)
    openQuestionModal()
  }

  return { showQuestion, getRandomQuestion }
}

