import { useNavigate as useRRNavigate } from "react-router-dom";

type To = string;

export function useAppNavigate() {
  const navigate = useRRNavigate();

  return {
    push: (to: To) => navigate(to),
    replace: (to: To) => navigate(to, { replace: true }),
    back: () => navigate(-1),

    goHome: () => navigate("/"),
    goToCadastro: () => navigate("/cadastro"),
    goToQuiz: () => navigate("/quizz"),
  };
}
