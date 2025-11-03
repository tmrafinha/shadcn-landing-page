import { Statistics } from "./Statistics";
import pilot from "../assets/piloto2.png";

export const About = () => {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={pilot}
            alt="Profissional de tecnologia GoDev"
            className="w-[300px] object-contain rounded-lg"
          />

          <div className="flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-[#22c55e]/60 to-[#16a34a] text-transparent bg-clip-text">
                  Sobre{" "}
                </span>
                a GoDev
              </h2>

              <p className="text-xl text-muted-foreground mt-4">
                Somos uma consultoria especializada em{" "}
                <strong>conectar profissionais de tecnologia a empresas que estão contratando</strong>,
                seja <strong>CLT</strong> ou <strong>PJ</strong>. 💼
              </p>

              <p className="text-xl text-muted-foreground mt-4">
                Atuamos como uma ponte entre fornecedores de tecnologia e oportunidades reais —
                indicando desenvolvedores, analistas e especialistas tech para
                empresas como <strong>Bosch</strong>, <strong>Mercedes</strong>,{" "}
                <strong>Stellantis</strong>, <strong>Yamaha</strong> e{" "}
                <strong>Americanas</strong>.
              </p>

              <p className="text-xl text-muted-foreground mt-4">
                Através do <strong>Banco de Talentos GoDev™</strong> e do{" "}
                <strong>Teste de Competência GoDev™</strong>, avaliamos o perfil
                técnico e comportamental de cada candidato.
              </p>

              {/* <p className="text-xl text-muted-foreground mt-4">
                Enquanto o mercado tradicional se baseia em concorrência e filtros automáticos,
                nós priorizamos o <strong>relacionamento humano</strong> e o{" "}
                <strong>match perfeito entre profissional e empresa</strong>.
              </p> */}
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
