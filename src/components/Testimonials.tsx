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
    image: "images/prova-social-02.jpeg",
    name: "Juliano Costa",
    userName: "Dev Back-end",
    comment:
      "Eu tava há meses tentando uma vaga decente... e nada. E o que me deixava mais bravo é que meu currículo era melhor do que muito dev e mesmo assim nada de me chamarem pras entrevistas... Vi um post da godev e fiz o teste de competencia sem pretensão, hoje tô alocado num projeto PJ super massa e recebendo bem melhor. Recomendo!",
  },
  {
    image: "images/prova-social-04.jpeg",
    name: "Rafael Martins",
    userName: "Dev Mobile",
    comment:
      "Tirei 8.2 no teste e em poucos dias fiz 2 entrevistas. Fechei com uma empresa que presta serviço pra Stellantis.",
  },
  {
  image: "images/prova-social-03.jpeg",
  name: "Carlos Ferreira",
  userName: "Analista de Sistemas",
  comment:
    "Me chamaram pra uma vaga CLT top, empresa da VR, Gym Pass, tenho vários arregos...",
},
{
  image: "https://randomuser.me/api/portraits/men/32.jpg",
  name: "Lucas Andrade",
  userName: "Front-end Developer",
  comment:
    "Tava meio de saco cheio de tanto aplicar pra vaga, sério. Entrei no Banco de Talentos achando que ia ser mais do mesmo... mas em menos de duas semanas já tava em entrevista marcada. Hoje tô alocado num projeto PJ, contrato de 15k mês.",
},
{
  image: "images/prova-social-01.jpeg",
  name: "Gabriel Neres",
  userName: "Full Stack Dev",
  comment:
    "Só me frustrei durante meses no LinkedIn... aquilo virou uma mer**. Conheci a go dev pelo insta, entrei pro banco e começaram a aparecer várias entrevistas, não só CLT mas bastante projetos PJ tambem.",
},
{
  image: "https://randomuser.me/api/portraits/men/56.jpg",
  name: "Felipe Ramos",
  userName: "Engenheiro de Software",
  comment:
    "Sendo bem real, entrei achando que era mais um site genérico. Mas os caras entregam mesmo. Fiz o teste, fui aprovado e em 22 dias tava com contrato assinado. Hoje indico pra todo mundo que quer sair da mesmice.",
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
        Depoimentos reais de devs que entraram no{" "}
        <strong>Banco de Talentos GoDev™</strong> e conseguiram entrevistas,
        contratos e a liberdade de escolher onde trabalhar.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2 lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
        {testimonials.map(
          ({ image, name, userName, comment }: TestimonialProps) => (
            <Card
              key={name}
              className="max-w-md md:break-inside-avoid overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarImage alt={name} src={image} />
                  <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <CardTitle className="text-lg font-semibold">{name}</CardTitle>
                  <CardDescription>{userName}</CardDescription>
                </div>
              </CardHeader>

              <CardContent className="text-muted-foreground text-[15px] leading-relaxed">
                {comment}
              </CardContent>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
