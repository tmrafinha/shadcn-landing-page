import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "../components/Icons";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "1. Faça o Teste",
    description:
      "Complete o Teste de Competência GoDev™ gratuitamente e descubra sua nota de compatibilidade com o mercado tech.",
  },
  {
    icon: <MapIcon />,
    title: "2. Entre no Banco",
    description:
      "Seja adicionado ao Banco de Talentos GoDev™ e fique visível para empresas que estão contratando agora.",
  },
  {
    icon: <PlaneIcon />,
    title: "3. Receba Entrevistas",
    description:
      "Com uma pontuação acima de 7, você garante até 5 entrevistas reais com empresas parceiras, CLT ou PJ.",
  },
  {
    icon: <GiftIcon />,
    title: "4. Conquiste a Oportunidade",
    description:
      "Aproveite as conexões criadas pela GoDev e dê o próximo passo na sua carreira tech.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="howItWorks" className="container text-center py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold">
        Como{" "}
        <span className="bg-gradient-to-b from-[#22c55e]/60 to-[#16a34a] text-transparent bg-clip-text">
          Funciona
        </span>{" "}
        o Processo
      </h2>

      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Veja como o processo da <strong>GoDev</strong> conecta você a
        oportunidades reais — de forma simples, gratuita e transparente.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card key={title} className="bg-muted/50">
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
