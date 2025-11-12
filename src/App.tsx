import "./App.css"; // 👈 volta esse import aqui

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./pages/landing-page";
import QuizPage from "./components/Quizz";
import Cadastro from "./components/Cadastro";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Use UMA das duas opções: */}
        {/* A) Se a LandingPage já renderiza tudo sozinha: */}
        {/* <Route path="/" element={<LandingPage />} /> */}

        {/* B) Se prefere montar as seções aqui: */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/quizz" element={<QuizPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
