"use client";

import { useEffect, useRef, useState } from "react";
import {
  Brain,
  Timer as TimerIcon,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import { LogoIcon } from "@/components/Icons";
import { useNavigate } from "react-router-dom";

type TraitKey = "executor" | "analitico" | "colaborador" | "inovador";

interface PersonalityQuestion {
  question: string;
  trait: TraitKey;
}

type StoredUser = {
  name: string;
  email: string;
  phone: string;
  savedAt: string;
};

const QUIZ_MINUTES = 30;
const QUIZ_SECONDS = QUIZ_MINUTES * 60;
const USER_STORE_KEY = "goDevUser";

const personalityOptions = [
  "Discordo totalmente",
  "Discordo parcialmente",
  "Neutro",
  "Concordo parcialmente",
  "Concordo totalmente",
];

const questions: PersonalityQuestion[] = [
  // EXECUTOR
  { question: "Gosto de assumir responsabilidade e puxar as coisas pra andar no time.", trait: "executor" },
  { question: "Quando vejo um problema no projeto, meu primeiro impulso é já pensar em como resolver.", trait: "executor" },
  { question: "Prefiro decisões claras e objetivas a discussões longas sem conclusão.", trait: "executor" },
  { question: "Me sinto confortável em assumir prazos desafiadores quando acredito na solução.", trait: "executor" },
  { question: "Não gosto de ficar parado esperando instrução, prefiro ir lá e fazer.", trait: "executor" },
  { question: "Quando o time trava, eu naturalmente tomo a frente e organizo os próximos passos.", trait: "executor" },
  { question: "Eu me cobro bastante por resultado, não só por esforço.", trait: "executor" },

  // ANALÍTICO
  { question: "Gosto de entender o “porquê” das coisas antes de começar a executar.", trait: "analitico" },
  { question: "Me sinto confortável mergulhando em detalhes técnicos e documentação.", trait: "analitico" },
  { question: "Tenho facilidade em identificar problemas em lógica, performance ou arquitetura.", trait: "analitico" },
  { question: "Antes de decidir, gosto de olhar dados, métricas ou evidências.", trait: "analitico" },
  { question: "Curto refatorar código pra deixá-lo mais limpo, organizado e sustentável.", trait: "analitico" },
  { question: "Costumo questionar suposições e buscar a causa raiz dos problemas.", trait: "analitico" },
  { question: "Gosto de criar ou seguir padrões, guidelines e boas práticas.", trait: "analitico" },

  // COLABORADOR
  { question: "Gosto de ajudar outras pessoas do time, mesmo quando não é oficialmente minha tarefa.", trait: "colaborador" },
  { question: "Me preocupo se a comunicação do time está clara e todo mundo sabe o que fazer.", trait: "colaborador" },
  { question: "Tenho facilidade em traduzir termos técnicos pra uma linguagem que o cliente entenda.", trait: "colaborador" },
  { question: "Prefiro trabalhar em equipe a ficar 100% isolado nas minhas tarefas.", trait: "colaborador" },
  { question: "Geralmente sou a pessoa que tenta trazer o time de volta pro foco quando a conversa desanda.", trait: "colaborador" },
  { question: "Me importo genuinamente com o clima do time e com o bem-estar das pessoas.", trait: "colaborador" },
  { question: "Curto dar e receber feedback de forma honesta e respeitosa.", trait: "colaborador" },

  // INOVADOR
  { question: "Gosto de testar coisas novas, ferramentas, libs e abordagens diferentes.", trait: "inovador" },
  { question: "Frequentemente tenho ideias de melhorias pro produto ou pro processo.", trait: "inovador" },
  { question: "Não fico preso a uma única forma de resolver o problema; gosto de explorar alternativas.", trait: "inovador" },
  { question: "Me sinto motivado quando posso criar algo do zero ou pensar em novas soluções.", trait: "inovador" },
  { question: "Curto acompanhar tendências de tecnologia, novos frameworks, IA, etc.", trait: "inovador" },
  { question: "Não tenho medo de errar ao experimentar uma abordagem nova (desde que seja controlado).", trait: "inovador" },
  { question: "Gosto de conectar ideias de áreas diferentes pra criar algo novo.", trait: "inovador" },
];

const traitProfiles: Record<
  TraitKey,
  {
    label: string;
    headline: string;
    description: string;
    strengths: string[];
    idealEnv: string;
  }
> = {
  executor: {
    label: "Executor",
    headline: "Perfil Executor — foco em ação e entrega.",
    description:
      "Você tende a ser a pessoa que puxa o bonde, assume responsabilidade e gosta de ver as coisas saindo do papel. Times contam com pessoas como você pra manter o ritmo, bater meta e tirar projeto da gaveta.",
    strengths: [
      "Alta orientação a resultados",
      "Facilidade em tomar decisão",
      "Gosto por assumir responsabilidade",
      "Ajuda o time a sair da inércia",
    ],
    idealEnv:
      "Ambientes com desafios reais, metas claras, prazos definidos e espaço pra liderança técnica.",
  },
  analitico: {
    label: "Analítico",
    headline: "Perfil Analítico — profundidade técnica e visão de detalhe.",
    description:
      "Você tende a ser a pessoa que aprofunda, olha causa raiz, pensa arquitetura e qualidade. Times precisam muito de quem cuida da consistência e da saúde do código a longo prazo.",
    strengths: [
      "Pensamento estruturado",
      "Atenção a detalhes importantes",
      "Busca por causa raiz e precisão",
      "Preocupação com qualidade e boas práticas",
    ],
    idealEnv:
      "Projetos que valorizam qualidade técnica, revisões de código, arquitetura bem pensada e decisões orientadas a dados.",
  },
  colaborador: {
    label: "Colaborador",
    headline: "Perfil Colaborador — conexão, comunicação e time forte.",
    description:
      "Você tende a ser a pessoa que conecta, facilita conversa, ajuda o time a funcionar melhor. Empresas valorizam muito quem sabe somar técnica com empatia e clareza na comunicação.",
    strengths: [
      "Boa comunicação com diferentes perfis",
      "Facilidade em trabalhar em equipe",
      "Preocupação com clima e alinhamento",
      "Ajuda a reduzir ruído e conflitos",
    ],
    idealEnv:
      "Times com colaboração forte, squads multidisciplinares, contato com produto, cliente e outras áreas.",
  },
  inovador: {
    label: "Inovador",
    headline: "Perfil Inovador — criatividade aplicada à tecnologia.",
    description:
      "Você tende a ser a pessoa que traz novas ideias, experimenta abordagens diferentes e olha além do óbvio. Em tech, isso é ouro pra evoluir produto, processo e experiência do usuário.",
    strengths: [
      "Visão criativa de solução",
      "Curiosidade por novas tecnologias",
      "Capacidade de conectar ideias diferentes",
      "Conforto em testar e iterar",
    ],
    idealEnv:
      "Projetos com espaço pra experimentação, discovery, inovação contínua e melhoria de produto.",
  },
};

export default function PersonalityTestPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState<StoredUser | null>(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [showResult, setShowResult] = useState(false);
  const [progress, setProgress] = useState(0);

  const [secondsLeft, setSecondsLeft] = useState(QUIZ_SECONDS);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Progresso (baseado em quantas foram respondidas)
  useEffect(() => {
    const answeredCount = answers.filter((a) => a !== null).length;
    setProgress((answeredCount / questions.length) * 100);
  }, [answers]);

  // Timer
  useEffect(() => {
    if (showResult) return;
    if (secondsLeft <= 0) {
      finalize();
      return;
    }

    timerRef.current = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, showResult]);

  // Carrega usuário do localStorage
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
    setAnswers((prev) => {
      const clone = [...prev];
      clone[current] = index;
      return clone;
    });

    // Avança automático
    if (current + 1 < questions.length) {
      setTimeout(() => {
        setCurrent((c) => (c < questions.length - 1 ? c + 1 : c));
      }, 200);
    } else {
      setTimeout(() => {
        finalize();
      }, 200);
    }
  };

  const computeTraitScores = () => {
    const scores: Record<TraitKey, number> = {
      executor: 0,
      analitico: 0,
      colaborador: 0,
      inovador: 0,
    };

    questions.forEach((q, i) => {
      const ans = answers[i];
      if (ans !== null) {
        // escala 1 a 5 (index 0–4 → valor 1–5)
        scores[q.trait] += ans + 1;
      }
    });

    return scores;
  };

  const finalize = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowResult(true);
  };

  // Resultado
  if (showResult) {
    const traitScores = computeTraitScores();

    const sortedTraits = (Object.keys(traitScores) as TraitKey[]).sort(
      (a, b) => traitScores[b] - traitScores[a]
    );

    const mainTrait = sortedTraits[0];
    const profile = traitProfiles[mainTrait];

    const totalTimeUsed = QUIZ_SECONDS - secondsLeft;
    const usedMinutes = Math.max(0, Math.floor(totalTimeUsed / 60));
    const usedSeconds = Math.max(0, totalTimeUsed % 60);
    const usedTimeStr = `${String(usedMinutes).padStart(
      2,
      "0"
    )}:${String(usedSeconds).padStart(2, "0")}`;

    return (
      <section className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-3xl w-full">
          <div className="w-full flex justify-center mb-4">
            <LogoIcon />
          </div>

          <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-700">
            <h1 className="text-2xl md:text-4xl font-black mb-3 text-foreground">
              Resultado do{" "}
              <span className="text-primary">Teste de Personalidade GoDev™</span>
            </h1>
            <p className="text-muted-foreground">
              O objetivo desse teste é te ajudar a entender{" "}
              <span className="font-semibold">
                como você atua dentro de times de tecnologia
              </span>
              , não te encaixar em uma caixa fixa. 😉
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 mb-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-1">
                Seu perfil predominante:
              </h2>
              <p className="text-2xl font-bold text-primary">
                {profile.label}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Tempo total de conclusão:{" "}
                <span className="font-semibold">{usedTimeStr}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                (Esse tempo é só um indicador do seu ritmo de resposta — não
                muda o seu perfil.)
              </p>
            </div>

            <div className="bg-muted/50 rounded-xl p-6 border border-border mb-6">
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                {profile.headline}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {profile.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-muted/50 rounded-xl p-5 border border-border">
                <h4 className="font-semibold text-foreground mb-2">
                  Seus pontos fortes naturais
                </h4>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  {profile.strengths.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-muted/50 rounded-xl p-5 border border-border">
                <h4 className="font-semibold text-foreground mb-2">
                  Tipo de ambiente que tende a te favorecer
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {profile.idealEnv}
                </p>
              </div>
            </div>

            <div className="bg-muted/50 rounded-xl p-5 border border-border mb-4">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Como ficaram seus outros traços de perfil
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {(Object.keys(traitProfiles) as TraitKey[]).map((trait) => (
                  <div key={trait} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        {traitProfiles[trait].label}
                      </span>
                      <span className="text-foreground font-semibold">
                        {traitScores[trait]}
                      </span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary/70"
                        style={{
                          width: `${
                            (traitScores[trait] /
                              (questions.length * 5)) *
                            100 *
                            2
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Importante: você não é só um tipo. Você tem um pouco de cada
                traço — aqui a gente só mostra qual deles apareceu com mais
                força nesse momento.
              </p>
            </div>

            <div className="bg-muted/50 rounded-xl p-5 border border-border">
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Próximos passos com a Go Dev
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                A ideia é usar esse resultado junto com o{" "}
                <span className="font-semibold">
                  Teste de Competência Técnica
                </span>{" "}
                pra entender não só <strong>o que você sabe</strong>, mas{" "}
                <strong>como você gosta de atuar em time</strong>.
                <br />
                <br />
                Em breve o time da{" "}
                <span className="text-primary font-semibold">Go Dev</span> vai
                analisar seu perfil completo e{" "}
                <strong>entrar em contato com você</strong> pra alinhar as
                melhores oportunidades que combinem com seu jeito de trabalhar.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentAnswer = answers[current];

  return (
    <section className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {/* Header com Logo + Timer + Progresso */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg border border-border">
                <LogoIcon size={24} />
              </div>
              <div>
                <div className="text-muted-foreground text-sm">
                  {user?.name}
                </div>
                <div className="text-foreground font-semibold">
                  Pergunta {current + 1} de {questions.length}
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
        </div>

        {/* Card da Pergunta */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-6 animate-in slide-in-from-right duration-500">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 leading-tight">
            {questions[current].question}
          </h2>

          <p className="text-xs text-muted-foreground mb-4">
            Responda pensando em como você{" "}
            <span className="font-semibold">
              costuma agir na maioria das vezes
            </span>
            , não em situações isoladas.
          </p>

          <div className="space-y-3 mb-6">
            {personalityOptions.map((opt, idx) => {
              const isSelected = currentAnswer === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleOptionClick(idx)}
                  className={`w-full text-left p-4 rounded-xl font-medium transition-all duration-300 border-2
                    ${
                      isSelected
                        ? "bg-primary/15 border-primary text-primary"
                        : "bg-muted/50 border-border text-foreground hover:bg-muted hover:border-primary/50"
                    }
                    cursor-pointer
                    focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt}</span>
                    {isSelected && <span className="text-lg">●</span>}
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-xs text-muted-foreground">
            Não existe resposta certa ou errada aqui — é um teste de{" "}
            <strong>estilo de atuação</strong>, não de conhecimento técnico.
          </p>
        </div>

        {/* Sem botão de próxima — avanço automático */}
      </div>
    </section>
  );
}
