import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Facebook, Instagram, Linkedin } from "lucide-react";

interface TeamProps {
  imageUrl: string;
  name: string;
  position: string;
  socialNetworks: SociaNetworkslProps[];
}

interface SociaNetworkslProps {
  name: string;
  url: string;
}

const teamList: TeamProps[] = [
  {
    imageUrl: "https://i.pravatar.cc/150?img=59",
    name: "Rafael Amaro",
    position: "Co-fundador • CEO da GoDev",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/rafael-amaro-moreira/",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/",
      },
    ],
  },
  {
    imageUrl: "https://i.pravatar.cc/150?img=47",
    name: "Danilo Convertino",
    position: "Co-fundador • Head de Operações",
    socialNetworks: [
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/",
      },
    ],
  },
];

export const Team = () => {
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin size="20" />;
      case "Facebook":
        return <Facebook size="20" />;
      case "Instagram":
        return <Instagram size="20" />;
    }
  };

  return (
    <section id="team" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold">
        <span className="bg-gradient-to-b from-[#22c55e]/60 to-[#16a34a] text-transparent bg-clip-text">
          Fundadores{" "}
        </span>
        da GoDev
      </h2>

      <p className="mt-4 mb-10 text-xl text-muted-foreground md:w-3/4">
        A GoDev foi fundada por profissionais que vieram do campo técnico e
        sabem o que é viver o dia a dia de quem busca oportunidades reais na
        área de tecnologia. Hoje, o foco é ajudar outros devs a conquistar o
        mesmo.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10">
        {teamList.map(({ imageUrl, name, position, socialNetworks }: TeamProps) => (
          <Card
            key={name}
            className="bg-muted/50 relative mt-8 flex flex-col justify-center items-center"
          >
            <CardHeader className="mt-8 flex justify-center items-center pb-2">
              <img
                src={imageUrl}
                alt={`${name} ${position}`}
                className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover"
              />
              <CardTitle className="text-center">{name}</CardTitle>
              <CardDescription className="text-[#16a34a]">
                {position}
              </CardDescription>
            </CardHeader>

            <CardContent className="text-center pb-2">
              {name === "Rafael Amaro" ? (
                <p>
                  Programador desde 2021, já fechou contratos com empresas como{" "}
                  <strong>Bosch</strong>, <strong>Stellantis</strong> e{" "}
                  <strong>Mercedes-Benz</strong>. Hoje lidera a GoDev com foco em
                  conectar talentos e transformar carreiras na tecnologia.
                </p>
              ) : (
                <p>
                  Atuou em empresas como <strong>Promenac</strong> e outras
                  grandes organizações do setor automotivo e tecnológico. Na
                  GoDev, comanda as operações e parcerias estratégicas.
                </p>
              )}
            </CardContent>

            <CardFooter>
              {socialNetworks.map(({ name, url }: SociaNetworkslProps) => (
                <div key={name}>
                  <a
                    rel="noreferrer noopener"
                    href={url}
                    target="_blank"
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    <span className="sr-only">{name} icon</span>
                    {socialIcon(name)}
                  </a>
                </div>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
