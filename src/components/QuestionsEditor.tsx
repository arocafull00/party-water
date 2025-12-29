import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import type { TileType } from "@/types/game"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"

const TILE_COLORS: Record<TileType, string> = {
  DIBUJAR: "bg-blue-500",
  "CULTURA POPULAR": "bg-purple-500",
  "ADIVINA LA PALABRA": "bg-green-500",
  "QUIÉN ES MÁS PROBABLE QUE": "bg-yellow-500",
  MÍMICA: "bg-red-500",
}

const TILE_TYPES: TileType[] = [
  "DIBUJAR",
  "CULTURA POPULAR",
  "ADIVINA LA PALABRA",
  "QUIÉN ES MÁS PROBABLE QUE",
  "MÍMICA",
]

const STORAGE_KEY = "party-water-questions"

function loadQuestionsFromStorage(): Record<TileType, string[]> {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return {}
    }
  }
  return {}
}

function saveQuestionsToStorage(questions: Record<TileType, string[]>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(questions))
}

function loadDefaultQuestions(): Record<TileType, string[]> {
  return {
    DIBUJAR: [
      "Kebab",
      "Toni pizzeria",
      "Teresianas",
      "Administrador",
      "El Audi",
      "Piccadilly",
      "Jorgito",
      "Loro en el starbucks",
      "Cultura popular de water",
      "Amumu",
    ],
    "CULTURA POPULAR": [
      "Cuanto vale un kebab completo en el toni?",
      "Que numero es el kebab con queso?",
      "Que dia es el cumple de water?",
      "Cuantos miembros hay actualmente en water?",
      "Cuantos emoticonos hay en el nombre de whatsapp de water?",
      "Que lleva la pizza xema?",
      "Cuanto vale el bocadillo \"Senda\"?",
      "Ordena los ganadores del balon de oro",
      "De donde viene el nombre de \"Waterpolla\"?",
      "Por que se creo el grupo \"Waterpollo\"?",
      "Que estudió richar",
      "De que esta hecho el te favorito de Mora?",
      "Bebida alcoholica que no encontraba Loro en 2018",
      "Como se llamaba la ciudad en la que estuvo trabajando Poten en Alemania?",
    ],
    "ADIVINA LA PALABRA": [
      "Correa",
      "Embutido del pueblo de Folk",
      "Falla",
      "Gosset",
      "Secarral",
      "Raygun",
      "Genetica",
      "Cuuuuquiiis",
    ],
    "QUIÉN ES MÁS PROBABLE QUE": [
      "Se lie con la ex de alguien del grupo",
      "Conduzca borracho",
      "Se vaya a dormir antes en año nuevo",
      "Se ponga a llorar el dia del admin",
      "Coja una baja",
      "Meta el ultimo gol de cabeza en un culo",
      "Se haga tinder",
      "Vaya al cafe berlin",
      "Se case primero",
      "Sea el proximo administrador",
      "Se vaya en uber a casa",
      "Haga una Daniflada",
    ],
    MÍMICA: [
      "Xema",
      "Raquel Navarro",
      "11 audi",
      "Lydia domi",
      "Richar uber",
      "Trol animando en el banquillo",
      "Loro desahuciado despues de currar en el starbucks",
      "Una charla triste",
      "Mini Pekka",
      "Luffy",
    ],
  }
}

export function QuestionsEditor() {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState<Record<TileType, string[]>>(() => {
    const stored = loadQuestionsFromStorage()
    const defaults = loadDefaultQuestions()
    
    const merged: Record<TileType, string[]> = {} as Record<TileType, string[]>
    for (const type of TILE_TYPES) {
      merged[type] = stored[type] || defaults[type] || []
    }
    return merged
  })
  const [newQuestion, setNewQuestion] = useState<Record<TileType, string>>({
    DIBUJAR: "",
    "CULTURA POPULAR": "",
    "ADIVINA LA PALABRA": "",
    "QUIÉN ES MÁS PROBABLE QUE": "",
    MÍMICA: "",
  })

  useEffect(() => {
    saveQuestionsToStorage(questions)
  }, [questions])

  const addQuestion = (tileType: TileType) => {
    const question = newQuestion[tileType].trim()
    if (!question) return

    setQuestions((prev) => ({
      ...prev,
      [tileType]: [...prev[tileType], question],
    }))
    setNewQuestion((prev) => ({ ...prev, [tileType]: "" }))
  }

  const removeQuestion = (tileType: TileType, index: number) => {
    setQuestions((prev) => ({
      ...prev,
      [tileType]: prev[tileType].filter((_, i) => i !== index),
    }))
  }

  const resetCategory = (tileType: TileType) => {
    const defaults = loadDefaultQuestions()
    setQuestions((prev) => ({
      ...prev,
      [tileType]: defaults[tileType] || [],
    }))
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al juego
          </Button>
          <h1 className="text-4xl font-bold text-gray-800">
            Editor de Preguntas
          </h1>
        </div>

        <div className="space-y-8">
          {TILE_TYPES.map((tileType) => (
            <div
              key={tileType}
              className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h2
                  className={`${TILE_COLORS[tileType]} text-white px-4 py-2 rounded-lg font-bold text-lg`}
                >
                  {tileType}
                </h2>
                <Button
                  onClick={() => resetCategory(tileType)}
                  variant="outline"
                  size="sm"
                >
                  Restaurar por defecto
                </Button>
              </div>

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newQuestion[tileType]}
                  onChange={(e) =>
                    setNewQuestion((prev) => ({
                      ...prev,
                      [tileType]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addQuestion(tileType)
                    }
                  }}
                  placeholder="Escribe una nueva pregunta..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  onClick={() => addQuestion(tileType)}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Añadir
                </Button>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {questions[tileType].length === 0 ? (
                  <p className="text-gray-500 italic text-center py-4">
                    No hay preguntas en esta categoría
                  </p>
                ) : (
                  questions[tileType].map((question, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <span className="flex-1 text-gray-800">{question}</span>
                      <Button
                        onClick={() => removeQuestion(tileType, index)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Total: {questions[tileType].length} preguntas
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

