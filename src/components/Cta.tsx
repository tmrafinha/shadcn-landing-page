import { Button } from "./ui/button";

export const Cta = () => {
  return (
    <section
      id="cta"
      className="bg-muted/50 py-20 mb-10  sm:my-32 border-t border-b m-4"
    >
      <div className="container lg:grid lg:grid-cols-2 place-items-center gap-12">
        <div className="lg:col-start-1 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Dê o próximo passo na sua{" "}
            <span className="bg-gradient-to-b from-[#22c55e]/60 to-[#16a34a] text-transparent bg-clip-text">
              jornada como dev
            </span>
          </h2>
          <p className="text-muted-foreground text-xl mt-4 mb-8">
            Mostre seu potencial com o{" "}
            <strong>Teste de Competência GoDev™</strong> e entre para o{" "}
            <strong>Banco de Talentos GoDev™</strong>. Nossa equipe conecta você
            diretamente com empresas que{" "}
            <strong>valorizam habilidade e resultado</strong> — não só um
            currículo.
          </p>
        </div>

        <div className="space-y-4 flex flex-col items-center lg:items-end w-full">
          <a href="/cadastro">
          <Button className="w-full md:w-auto text-lg px-8 py-6 font-semibold">
            Fazer o Teste de Competência
          </Button></a>
          {/* <Button
            variant="outline"
            className="w-full md:w-auto text-lg px-8 py-6 font-semibold"
          >
            Acessar o Banco de Talentos
          </Button> */}
        </div>
      </div>
    </section>
  );
};
