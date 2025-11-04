import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TestimonialProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
}

const testimonials: TestimonialProps[] = [
  {
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Lucas Andrade",
    userName: "Desenvolvedor Front-end",
    comment:
      "Em menos de duas semanas depois de fazer o teste, fui chamado pra três entrevistas. Hoje estou alocado como PJ em um projeto com a Yamaha!",
  },
  {
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Marina Silva",
    userName: "Dev Full Stack",
    comment:
      "A GoDev me ajudou a encontrar uma vaga que fazia sentido pro meu perfil. O processo foi rápido, direto e humano. Recomendo demais!",
  },
  {
    image: "https://randomuser.me/api/portraits/men/56.jpg",
    name: "Felipe Ramos",
    userName: "Engenheiro de Software",
    comment:
      "Eu já estava cansado de mandar currículo no LinkedIn. Entrei no Banco de Talentos da GoDev e em menos de 10 dias fechei contrato com uma startup incrível.",
  },
  {
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    name: "Juliana Costa",
    userName: "Desenvolvedora Back-end",
    comment:
      "Achei que precisaria de mais experiência pra conseguir algo bom, mas a GoDev realmente conecta a gente com empresas que valorizam nosso potencial.",
  },
  {
    image: "https://randomuser.me/api/portraits/men/83.jpg",
    name: "Rafael Martins",
    userName: "Dev Mobile",
    comment:
      "Passei no teste da GoDev, tirei nota 8.2 e recebi 5 oportunidades reais. Hoje presto serviço pra uma empresa da Stellantis.",
  },
  {
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    name: "Carla Ferreira",
    userName: "Analista de Sistemas",
    comment:
      "A proposta da GoDev é diferente de tudo que já vi. Eles realmente se preocupam em entender o perfil técnico e comportamental de cada candidato.",
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold">
        Por que os profissionais{" "}
        <span className="bg-gradient-to-b from-[#22c55e]/60 to-[#16a34a] text-transparent bg-clip-text">
          confiam na GoDev
        </span>
      </h2>

      <p className="text-xl text-muted-foreground pt-4 pb-8">
        Veja histórias reais de desenvolvedores e profissionais tech que
        participaram do{" "}
        <strong>Banco de Talentos GoDev</strong> e conquistaram entrevistas e
        contratos com grandes empresas.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2 lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
        {testimonials.map(
          ({ image, name, userName, comment }: TestimonialProps) => (
            <Card
              key={name}
              className="max-w-md md:break-inside-avoid overflow-hidden"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarImage alt={name} src={image} />
                  <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <CardTitle className="text-lg">{name}</CardTitle>
                  <CardDescription>{userName}</CardDescription>
                </div>
              </CardHeader>

              <CardContent>{comment}</CardContent>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
