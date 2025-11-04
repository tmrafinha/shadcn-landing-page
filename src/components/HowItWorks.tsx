import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  MedalIcon,    
  PlaneIcon,   
  ChartIcon,
  MagnifierIcon,     
} from "../components/Icons";

interface StepProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const steps: StepProps[] = [
  {
    icon: <MedalIcon />,
    title: "1. Teste GoDev™",
    description:
      "Faça o Teste de Competência GoDev™ e descubra sua nota de compatibilidade com o mercado de tecnologia.",
  },
  {
    icon: <MagnifierIcon />,
    title: "2. Banco de Talentos",
    description:
      "Com base na sua nota, você entra para o Banco de Talentos GoDev™ — onde empresas parceiras encontram profissionais prontos.",
  },
  {
    icon: <ChartIcon />,
    title: "3. Entrevistas Reais",
    description:
      "Os candidatos com melhor desempenho são indicados para até 5 entrevistas reais com empresas parceiras (CLT ou PJ).",
  },
  {
    icon: <PlaneIcon />,
    title: "4. Conquiste a Vaga",
    description:
      "Você é contratado por empresas que valorizam performance e o que você realmente sabe fazer.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="howItWorks" className="container text-center py-10 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold">
        Como{" "}
        <span className="bg-gradient-to-b from-[#22c55e]/60 to-[#16a34a] text-transparent bg-clip-text">
          Funciona
        </span>{" "}
        o Processo
      </h2>

      <p className="md:w-3/4 mx-auto mt-4 mb-12 text-xl text-muted-foreground">
        Simples, direto e eficiente — o caminho para conquistar sua vaga tech em 4 etapas.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map(({ icon, title, description }: StepProps) => (
          <Card
            key={title}
            className="bg-muted/40 border border-[#16a34a]/20 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 rounded-2xl"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center text-xl font-semibold">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#16a34a]/10">
                  {icon}
                </div>
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-lg">
              {description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
