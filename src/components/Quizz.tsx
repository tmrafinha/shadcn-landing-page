// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Trophy, Zap, Target, Brain, Sparkles, RotateCcw, ChevronRight } from "lucide-react";

// interface Question {
//   question: string;
//   options: string[];
//   correctIndex: number;
//   explanation: string;
// }

// const questions: Question[] = [
//   {
//     question: "Qual comando do Git adiciona arquivos ao staging antes de um commit?",
//     options: ["git add", "git stage", "git commit-add", "git push"],
//     correctIndex: 0,
//     explanation: "git add prepara os arquivos para o próximo commit, movendo-os para a staging area."
//   },
//   {
//     question: "Em JavaScript, qual das seguintes declarações cria uma função arrow?",
//     options: ["function fn() {}", "const fn = () => {}", "fn: function() {}", "var fn => {}"],
//     correctIndex: 1,
//     explanation: "Arrow functions usam a sintaxe () => {} e têm comportamento diferente de 'this'."
//   },
//   {
//     question: "No CSS, qual propriedade controla a distância entre linhas de texto?",
//     options: ["line-height", "letter-spacing", "text-spacing", "word-spacing"],
//     correctIndex: 0,
//     explanation: "line-height define o espaço vertical entre linhas de texto."
//   },
//   {
//     question: "Em React, qual hook serve para gerenciar estado dentro de um componente funcional?",
//     options: ["useEffect", "useContext", "useState", "useReducer"],
//     correctIndex: 2,
//     explanation: "useState é o hook fundamental para adicionar estado reativo em componentes funcionais."
//   },
//   {
//     question: "Qual banco de dados NoSQL é orientado a documentos e muito usado com Node.js?",
//     options: ["MySQL", "PostgreSQL", "MongoDB", "RedisDB"],
//     correctIndex: 2,
//     explanation: "MongoDB armazena dados em documentos JSON-like e é perfeito para aplicações Node.js."
//   },
// ];

// export default function QuizPage() {
//   const [current, setCurrent] = useState(0);
//   const [score, setScore] = useState(0);
//   const [showResult, setShowResult] = useState(false);
//   const [selectedOption, setSelectedOption] = useState<number | null>(null);
//   const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
//   const [showExplanation, setShowExplanation] = useState(false);
//   const [streak, setStreak] = useState(0);
//   const [animate, setAnimate] = useState(false);
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     setProgress((current / questions.length) * 100);
//   }, [current]);

//   const handleOptionClick = (index: number) => {
//     if (selectedOption !== null) return;
    
//     setSelectedOption(index);
//     const correct = index === questions[current].correctIndex;
//     setIsCorrect(correct);
    
//     if (correct) {
//       setScore(score + 1);
//       setStreak(streak + 1);
//       setAnimate(true);
//       setTimeout(() => setAnimate(false), 600);
//     } else {
//       setStreak(0);
//     }
    
//     setTimeout(() => {
//       setShowExplanation(true);
//     }, 400);
//   };

//   const handleNext = () => {
//     if (current + 1 < questions.length) {
//       setCurrent(current + 1);
//       setSelectedOption(null);
//       setIsCorrect(null);
//       setShowExplanation(false);
//     } else {
//       setShowResult(true);
//     }
//   };

//   const resetQuiz = () => {
//     setScore(0);
//     setCurrent(0);
//     setShowResult(false);
//     setSelectedOption(null);
//     setIsCorrect(null);
//     setShowExplanation(false);
//     setStreak(0);
//     setProgress(0);
//   };

//   const getScoreMessage = () => {
//     const percentage = (score / questions.length) * 100;
//     if (percentage === 100) return { title: "LENDÁRIO! 🏆", subtitle: "Perfeição absoluta!", color: "text-primary" };
//     if (percentage >= 80) return { title: "EXCELENTE! 🌟", subtitle: "Você é um mestre!", color: "text-primary" };
//     if (percentage >= 60) return { title: "MUITO BOM! 💪", subtitle: "Ótimo desempenho!", color: "text-primary" };
//     if (percentage >= 40) return { title: "BOM TRABALHO! 👍", subtitle: "Continue praticando!", color: "text-primary" };
//     return { title: "CONTINUE TENTANDO! 📚", subtitle: "A prática leva à perfeição!", color: "text-muted-foreground" };
//   };

//   if (showResult) {
//     const { title, subtitle, color } = getScoreMessage();
//     const percentage = Math.round((score / questions.length) * 100);
    
//     return (
//       <section className="min-h-screen bg-background flex items-center justify-center p-4">
//         <div className="max-w-2xl w-full">
//           <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-700">
//             <div className="inline-flex items-center justify-center w-24 h-24 bg-primary rounded-full mb-6 animate-bounce">
//               <Trophy className="w-12 h-12 text-primary-foreground" />
//             </div>
//             <h1 className={`text-5xl md:text-6xl font-black mb-3 ${color} animate-in zoom-in duration-500 delay-200`}>
//               {title}
//             </h1>
//             <p className="text-xl text-muted-foreground animate-in fade-in delay-300">
//               {subtitle}
//             </p>
//           </div>

//           <div className="bg-card border border-border rounded-2xl p-8 mb-6 animate-in slide-in-from-bottom duration-700 delay-200">
//             <div className="text-center mb-8">
//               <div className="inline-flex items-center gap-3 mb-4">
//                 <div className="text-7xl font-black text-primary">
//                   {score}
//                 </div>
//                 <div className="text-4xl text-muted-foreground font-light">/</div>
//                 <div className="text-5xl font-bold text-muted-foreground">
//                   {questions.length}
//                 </div>
//               </div>
//               <div className="text-2xl font-semibold text-foreground mb-2">
//                 {percentage}% de acertos
//               </div>
//               <div className="w-full bg-muted h-3 rounded-full overflow-hidden">
//                 <div 
//                   className="h-full bg-primary transition-all duration-1000 ease-out"
//                   style={{ width: `${percentage}%` }}
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//               <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
//                 <Target className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
//                 <div className="text-2xl font-bold text-green-600 dark:text-green-400">{score}</div>
//                 <div className="text-sm text-muted-foreground">Acertos</div>
//               </div>
//               <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
//                 <Zap className="w-8 h-8 text-red-600 dark:text-red-400 mx-auto mb-2" />
//                 <div className="text-2xl font-bold text-red-600 dark:text-red-400">{questions.length - score}</div>
//                 <div className="text-sm text-muted-foreground">Erros</div>
//               </div>
//               <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-center">
//                 <Brain className="w-8 h-8 text-primary mx-auto mb-2" />
//                 <div className="text-2xl font-bold text-primary">{percentage}%</div>
//                 <div className="text-sm text-muted-foreground">Precisão</div>
//               </div>
//             </div>

//             <div className="bg-muted/50 rounded-xl p-6 border border-border">
//               <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
//                 <Sparkles className="w-5 h-5 text-primary" />
//                 Sua Jornada Dev
//               </h3>
//               <p className="text-muted-foreground leading-relaxed">
//                 {percentage === 100 && "Você alcançou a maestria! Seu conhecimento técnico está impecável. Continue assim e você conquistará qualquer desafio de programação! 🚀"}
//                 {percentage >= 80 && percentage < 100 && "Você demonstrou um domínio excepcional! Está no caminho certo para se tornar um desenvolvedor referência. Continue aprimorando suas habilidades! 💎"}
//                 {percentage >= 60 && percentage < 80 && "Você tem uma base sólida e está evoluindo bem! Com mais prática e dedicação, você chegará ao próximo nível rapidamente. 🎯"}
//                 {percentage >= 40 && percentage < 60 && "Você está progredindo! Continue estudando e praticando. Cada erro é uma oportunidade de aprender e crescer como desenvolvedor. 📈"}
//                 {percentage < 40 && "Todo grande desenvolvedor começou do zero. Use este resultado como motivação para estudar mais. Você tem potencial, basta dedicação! 💪"}
//               </p>
//             </div>
//           </div>

//           <Button
//             onClick={resetQuiz}
//             className="w-full h-14 text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
//           >
//             <RotateCcw className="w-5 h-5 mr-2" />
//             Fazer Quiz Novamente
//           </Button>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="min-h-screen bg-background flex items-center justify-center p-4">
//       <div className="max-w-3xl w-full">
//         {/* Header com Progress */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between mb-3">
//             <div className="flex items-center gap-3">
//               <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
//                 {current + 1}
//               </div>
//               <div>
//                 <div className="text-muted-foreground text-sm">Questão</div>
//                 <div className="text-foreground font-semibold">{current + 1} de {questions.length}</div>
//               </div>
//             </div>
            
//             {streak > 1 && (
//               <div className={`flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold ${animate ? 'animate-bounce' : ''}`}>
//                 <Zap className="w-5 h-5" />
//                 {streak}x Streak!
//               </div>
//             )}
//           </div>
          
//           <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
//             <div 
//               className="h-full bg-primary transition-all duration-500 ease-out"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//         </div>

//         {/* Question Card */}
//         <div className="bg-card border border-border rounded-2xl p-8 mb-6 animate-in slide-in-from-right duration-500">
//           <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 leading-tight">
//             {questions[current].question}
//           </h2>
          
//           <div className="space-y-3 mb-6">
//             {questions[current].options.map((opt, idx) => {
//               const isSelected = selectedOption === idx;
//               const isCorrectAnswer = idx === questions[current].correctIndex;
//               const showCorrect = selectedOption !== null && isCorrectAnswer;
//               const showWrong = isSelected && !isCorrect;

//               return (
//                 <button
//                   key={idx}
//                   onClick={() => handleOptionClick(idx)}
//                   disabled={selectedOption !== null}
//                   className={`w-full text-left p-5 rounded-xl font-medium transition-all duration-300 border-2 ${
//                     showCorrect
//                       ? 'bg-green-500/20 border-green-500 text-green-600 dark:text-green-400 scale-105'
//                       : showWrong
//                       ? 'bg-red-500/20 border-red-500 text-red-600 dark:text-red-400 animate-shake'
//                       : isSelected
//                       ? 'bg-primary/20 border-primary text-primary'
//                       : 'bg-muted/50 border-border text-foreground hover:bg-muted hover:border-primary/50 hover:scale-102'
//                   } ${selectedOption !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <span>{opt}</span>
//                     {showCorrect && <span className="text-2xl">✓</span>}
//                     {showWrong && <span className="text-2xl">✗</span>}
//                   </div>
//                 </button>
//               );
//             })}
//           </div>

//           {/* Explanation */}
//           {showExplanation && (
//             <div className={`p-5 rounded-xl border-2 animate-in slide-in-from-bottom duration-500 ${
//               isCorrect 
//                 ? 'bg-green-500/10 border-green-500/30' 
//                 : 'bg-primary/10 border-primary/30'
//             }`}>
//               <div className="flex items-start gap-3">
//                 <div className={`p-2 rounded-lg ${isCorrect ? 'bg-green-500' : 'bg-primary'}`}>
//                   <Brain className="w-5 h-5 text-white" />
//                 </div>
//                 <div className="flex-1">
//                   <h4 className={`font-semibold mb-2 ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-primary'}`}>
//                     {isCorrect ? 'Perfeito! 🎉' : 'Aprenda mais! 📚'}
//                   </h4>
//                   <p className="text-muted-foreground text-sm leading-relaxed">
//                     {questions[current].explanation}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Next Button */}
//         {showExplanation && (
//           <Button
//             onClick={handleNext}
//             className="w-full h-14 text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl animate-in slide-in-from-bottom"
//           >
//             {current + 1 < questions.length ? (
//               <>
//                 Próxima Questão
//                 <ChevronRight className="w-5 h-5 ml-2" />
//               </>
//             ) : (
//               <>
//                 Ver Resultado Final
//                 <Trophy className="w-5 h-5 ml-2" />
//               </>
//             )}
//           </Button>
//         )}
//       </div>

//       <style jsx>{`
//         @keyframes shake {
//           0%, 100% { transform: translateX(0); }
//           25% { transform: translateX(-10px); }
//           75% { transform: translateX(10px); }
//         }
//         .animate-shake {
//           animation: shake 0.4s ease-in-out;
//         }
//       `}</style>
//     </section>
//   );
// }