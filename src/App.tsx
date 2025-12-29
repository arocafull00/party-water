import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Game } from "@/components/Game"
import { QuestionsEditor } from "@/components/QuestionsEditor"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/questions" element={<QuestionsEditor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
