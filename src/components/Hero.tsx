import { Button } from "./ui/button";
import { HeroCards } from "./HeroCards";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-4xl md:text-6xl font-bold leading-tight">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#16a34a] via-[#22c55e] to-[#4ade80] text-transparent bg-clip-text">
              Conectamos
            </span>{" "}
          </h1>{" "}
          <h2 className="inline">
            fornecedores de tecnologia com{" "}
            <span className="inline bg-gradient-to-r from-[#22c55e] via-[#4ade80] to-[#86efac] text-transparent bg-clip-text">
              empresas contratando.
            </span>
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Seja CLT ou PJ, faça parte do{" "}
          <strong>Banco de Talentos GoDev™</strong> e tenha a chance de ser
          indicado para vagas e projetos reais com empresas parceiras.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <a href="/cadastro">
            <Button className="w-full md:w-1/3 bg-gradient-to-r from-[#16a34a] via-[#22c55e] to-[#4ade80] text-white font-semibold">
            Entrar no banco de talentos
          </Button>
          </a>

          {/* <a
            rel="noreferrer noopener"
            href="#"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Entrar no Banco de Talentos
            <GitHubLogoIcon className="ml-2 w-5 h-5" />
          </a> */}
        </div>
      </div>

      {/* Hero cards section */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
