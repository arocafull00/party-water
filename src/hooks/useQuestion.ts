import { useGameStore } from "@/store/useGameStore"
import type { TileType } from "@/types/game"
import drawQuestions from "@/data/questions/draw.json"
import popQuestions from "@/data/questions/pop.json"
import guessQuestions from "@/data/questions/guess.json"
import whoQuestions from "@/data/questions/who.json"
import mimeQuestions from "@/data/questions/mime.json"

const STORAGE_KEY = "party-water-questions"

type PopQuestion = { question: string; answer: string }
type QuestionItem = string | PopQuestion

const defaultQuestionMap: Record<TileType, QuestionItem[]> = {
  DIBUJAR: drawQuestions.questions,
  "CULTURA POPULAR": popQuestions.questions,
  "ADIVINA LA PALABRA": guessQuestions.questions,
  "QUIÉN ES MÁS PROBABLE QUE": whoQuestions.questions,
  MÍMICA: mimeQuestions.questions,
}

function getQuestionsFromStorage(): Record<TileType, QuestionItem[]> {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      const result: Record<TileType, QuestionItem[]> = {} as Record<TileType, QuestionItem[]>
      for (const type in defaultQuestionMap) {
        const tileType = type as TileType
        const storedQuestions = parsed[tileType]
        
        if (tileType === "CULTURA POPULAR" && storedQuestions) {
          const migrated = storedQuestions.map((item: string | PopQuestion) => {
            if (typeof item === "string") {
              return { question: item, answer: "" }
            }
            return item
          })
          result[tileType] = migrated.length > 0 ? migrated : defaultQuestionMap[tileType]
        } else {
          result[tileType] = storedQuestions || defaultQuestionMap[tileType]
        }
      }
      return result
    } catch {
      return defaultQuestionMap
    }
  }
  return defaultQuestionMap
}

export function useQuestion() {
  const setCurrentQuestion = useGameStore((state) => state.setCurrentQuestion)
  const openQuestionModal = useGameStore((state) => state.openQuestionModal)

  const getRandomQuestion = (tileType: TileType): { question: string; answer?: string } => {
    const questions = getQuestionsFromStorage()[tileType]
    if (!questions || questions.length === 0) {
      const defaultQuestion = defaultQuestionMap[tileType][0]
      if (typeof defaultQuestion === "string") {
        return { question: defaultQuestion || "Sin preguntas disponibles" }
      }
      return { question: defaultQuestion.question || "Sin preguntas disponibles", answer: defaultQuestion.answer }
    }
    
    const randomItem = questions[Math.floor(Math.random() * questions.length)]
    
    if (typeof randomItem === "string") {
      return { question: randomItem }
    }
    
    return { question: randomItem.question, answer: randomItem.answer }
  }

  const showQuestion = (tileType: TileType) => {
    const { question, answer } = getRandomQuestion(tileType)
    setCurrentQuestion(question, tileType, answer)
    openQuestionModal()
  }

  return { showQuestion, getRandomQuestion }
}

