"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Zap,
  Brain,
  RotateCcw,
  ChevronRight,
  Timer as TimerIcon,
  AlertCircle,
} from "lucide-react";
import { LogoIcon } from "@/components/Icons";
import { useNavigate } from "react-router-dom";
import { ApprovedVSL } from "./ApprovedVsl";
import { questions } from "@/mock/questions/questions.data";

type StoredUser = {
  name: string;
  email: string;
  phone: string;
  savedAt: string;
};

const ATTEMPT_KEY = "goDevQuizAttempts";
const MAX_ATTEMPTS = 10;
const QUIZ_MINUTES = 45;
const QUIZ_SECONDS = QUIZ_MINUTES * 60;
const USER_STORE_KEY = "goDevUser";

export default function QuizPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState<StoredUser | null>(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [streak, setStreak] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [progress, setProgress] = useState(0);

  const [secondsLeft, setSecondsLeft] = useState(QUIZ_SECONDS);
  const [attempts, setAttempts] = useState<number>(0);
  const [locked, setLocked] = useState<boolean>(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setProgress((current / questions.length) * 100);
  }, [current]);

  useEffect(() => {
    const saved = Number(localStorage.getItem(ATTEMPT_KEY) || "0");
    setAttempts(saved);
    if (saved >= MAX_ATTEMPTS) {
      setLocked(true);
    }
  }, []);

  useEffect(() => {
    if (locked || showResult) return;
    if (secondsLeft <= 0) {
      finalize();
      return;
    }

    timerRef.current = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, locked, showResult]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(USER_STORE_KEY);
      if (!raw) {
        navigate("/cadastro", { replace: true });
        return;
      }

      const parsed: StoredUser = JSON.parse(raw);
      if (!parsed?.name || !parsed?.email) {
        navigate("/cadastro", { replace: true });
        return;
      }

      setUser(parsed);
    } catch {
      navigate("/cadastro", { replace: true });
    }
  }, [navigate]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeStr = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null || showResult || locked) return;

    setSelectedOption(index);
    const correct = index === questions[current].correctIndex;
    setIsCorrect(correct);

    if (correct) {
      setScore((s) => s + 1);
      setStreak((st) => st + 1);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 600);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      setShowExplanation(true);
    }, 250);
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setShowExplanation(false);
    } else {
      finalize();
    }
  };

  const sendResultToWebhook = (storedUser: StoredUser | null) => {
    if (!storedUser?.name || !storedUser?.email || !storedUser?.phone) return;

    const baseUrl =
      "https://webhook.sellflux.app/v2/webhook/custom/3b49a118dfb7fc66cbc4631ff08351c0?name=name&email=email&phone=phone";

    fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: storedUser.name,
        email: storedUser.email,
        phone: storedUser.phone,
      }),
    }).catch(() => {});
  };

  const finalize = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    const gradeRaw = (score / questions.length) * 10;
    const approved = gradeRaw > 7;

    if (approved) {
      sendResultToWebhook(user);
    }

    setShowExplanation(false);
    setShowResult(true);

    setAttempts((prev) => {
      const next = Math.min(prev + 1, MAX_ATTEMPTS);
      localStorage.setItem(ATTEMPT_KEY, String(next));
      if (next >= MAX_ATTEMPTS) setLocked(true);
      return next;
    });
  };

  const resetQuiz = () => {
    setScore(0);
    setCurrent(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setShowExplanation(false);
    setStreak(0);
    setProgress(0);
    setSecondsLeft(QUIZ_SECONDS);
  };

  const attemptsLeft = useMemo(
    () => Math.max(0, MAX_ATTEMPTS - attempts),
    [attempts]
  );

  if (locked) {
    return (
      <section className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="flex flex-col items-center mb-8">
            <LogoIcon size={72} />
            <h1 className="text-3xl md:text-4xl font-extrabold mt-4 text-foreground">
              Limite de tentativas atingido
            </h1>
            <p className="text-muted-foreground mt-2">
              Você já realizou o teste{" "}
              <span className="font-semibold">{MAX_ATTEMPTS}</span> vezes.
              <br />
              Em breve o time da{" "}
              <span className="text-primary font-semibold">Go Dev</span> entrará
              em contato.
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            <p className="text-sm text-muted-foreground">
              Caso acredite que isso é um engano, entre em contato com o
              suporte.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    const grade = Math.round(((score / questions.length) * 10) * 10) / 10;
    const approved = grade > 7;

    return (
      <section className="min-h-screen bg-background">
        {approved ? (
          <div className="w-full">
            {/* barra fixa */}
            <div className="bg-red-600 text-white py-2.5 px-4 text-center text-sm md:text-base sticky top-0 z-50 shadow">
              <AlertCircle className="inline w-4 h-4 mr-2 -mt-0.5" />
              Assista ao vídeo completo para garantir sua vaga
            </div>

            <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
              {/* topo minimal: logo pequena + badge */}
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="h-8 w-8 rounded-full border border-border flex items-center justify-center">
                  <LogoIcon size={60} />
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-lg font-semibold text-green-700 dark:text-green-300">
                  <div className="h-6 w-6 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center">
                    <Trophy className="w-3.5 h-3.5" />
                  </div>

                  <span className="text-foreground/90 dark:text-foreground">
                    Aprovado
                  </span>

                  <span className="text-muted-foreground">•</span>

                  <span className="text-foreground/90 dark:text-foreground">
                    Nota{" "}
                    <span className="text-primary font-black">
                      {grade.toFixed(1)}
                    </span>
                  </span>
                </div>
              </div>

              {/* headline única */}
              <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center text-foreground mb-6 leading-tight">
                Você provou ser qualificado para entrar no{" "}
                <span className="text-primary">Banco de Talentos</span>
                <br />
                <span className="font-thin">E por conta disso...</span>
              </h1>

              {/* vídeo */}
              <div className="mb-10">
                <ApprovedVSL />
              </div>

              {/* rodapé discreto */}
              <p className="text-center text-xs md:text-sm text-muted-foreground">
                {score} de {questions.length} questões corretas •{" "}
                {Math.round(percentage)}% de aproveitamento
              </p>
            </div>
          </div>
        ) : (
          // ❌ REPROVADO (mantido igual)
          <div className="max-w-2xl mx-auto px-4 py-16">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                Nota: {grade.toFixed(1)}/10
              </h1>
              <p className="text-lg text-muted-foreground">
                Você precisa de no mínimo 7.0 para ser aprovado
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <div className="w-full bg-muted h-3 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <p className="text-center text-muted-foreground mb-6">
                {score} de {questions.length} questões corretas (
                {Math.round(percentage)}%)
              </p>

              <p className="text-sm text-muted-foreground text-center">
                Você ainda tem{" "}
                <span className="font-bold">{attemptsLeft}</span> tentativa
                {attemptsLeft > 1 ? "s" : ""} disponível
                {attemptsLeft > 1 ? "eis" : ""}
              </p>
            </div>

            {attemptsLeft > 0 && (
              <Button onClick={resetQuiz} className="w-full h-14 text-lg font-bold">
                <RotateCcw className="w-5 h-5 mr-2" />
                Tentar Novamente
              </Button>
            )}
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg border border-border">
                <LogoIcon size={24} />
              </div>
              <div>
                <div className="text-muted-foreground text-sm">{user?.name}</div>
                <div className="text-foreground font-semibold">
                  Questão {current + 1} de {questions.length}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold">
              <TimerIcon className="w-5 h-5" />
              {timeStr}
            </div>
          </div>

          <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="text-xs text-muted-foreground mt-4 text-center">
            Você tem {QUIZ_MINUTES} minutos para concluir. O teste encerra
            automaticamente quando o tempo acabar.
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 mb-6 animate-in slide-in-from-right duration-500">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 leading-tight">
            {questions[current].question}
          </h2>

          <div className="space-y-3 mb-6">
            {questions[current].options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = idx === questions[current].correctIndex;
              const showCorrect = selectedOption !== null && isCorrectAnswer;
              const showWrong = isSelected && isCorrect === false;

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-5 rounded-xl font-medium transition-all duration-300 border-2 ${
                    showCorrect
                      ? "bg-green-500/20 border-green-500 text-green-600 dark:text-green-400 scale-105"
                      : showWrong
                      ? "bg-red-500/20 border-red-500 text-red-600 dark:text-red-400 animate-shake"
                      : isSelected
                      ? "bg-primary/20 border-primary text-primary"
                      : "bg-muted/50 border-border text-foreground hover:bg-muted hover:border-primary/50"
                  } ${
                    selectedOption !== null ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt}</span>
                    {showCorrect && <span className="text-2xl">✓</span>}
                    {showWrong && <span className="text-2xl">✗</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div
              className={`p-5 rounded-xl border-2 animate-in slide-in-from-bottom duration-500 ${
                isCorrect
                  ? "bg-green-500/10 border-green-500/30"
                  : "bg-primary/10 border-primary/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isCorrect ? "bg-green-500" : "bg-primary"}`}>
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4
                    className={`font-semibold mb-2 ${
                      isCorrect
                        ? "text-green-600 dark:text-green-400"
                        : "text-primary"
                    }`}
                  >
                    {isCorrect ? "Correto! 🎉" : "Atenção! 📚"}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {questions[current].explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {showExplanation && (
          <Button
            onClick={handleNext}
            className="w-full h-14 text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl animate-in slide-in-from-bottom"
          >
            {current + 1 < questions.length ? (
              <>
                Próxima Questão
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                Finalizar Prova
                <Trophy className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        )}

        {streak > 1 && !showExplanation && (
          <div
            className={`mt-4 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold ${
              animate ? "animate-bounce" : ""
            }`}
          >
            <Zap className="w-5 h-5" />
            {streak}x Streak!
          </div>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      `}</style>
    </section>
  );
}