import "./App.css"; // 👈 volta esse import aqui

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./pages/landing-page";
import QuizPage from "./components/Quizz";
import Cadastro from "./components/Cadastro";
import PersonalityTestPage from "./components/Teste-de-personalidade";
import CadastroTestePersonalidade from "./components/Cadastro-teste-de-personalidade";
import ApprovedVslPage from "./components/ApprovedVslPage";

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
        <Route path="/teste-de-personalidade" element={<PersonalityTestPage />} />
        <Route path="/cadastro-teste-de-personalidade" element={<CadastroTestePersonalidade />} />
        <Route path="/vsl-godev" element={<ApprovedVslPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
