import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Como funciona o processo da GoDev?",
    answer:
      "Tudo começa com o Teste de Competência GoDev™ — uma avaliação rápida que mede suas habilidades técnicas e comportamentais. A partir do resultado, você entra no Banco de Talentos e passa a ser considerado para vagas alinhadas ao seu perfil.",
    value: "item-1",
  },
  {
    question: "O que é o Banco de Talentos GoDev™?",
    answer:
      "É uma base exclusiva de profissionais avaliados e validados pela nossa equipe. As empresas parceiras têm acesso direto a esses perfis, o que aumenta muito suas chances de entrevista e contratação.",
    value: "item-2",
  },
  {
    question: "Preciso ter muita experiência pra participar?",
    answer:
      "Não. O foco da GoDev é conectar profissionais competentes, independentemente do tempo de experiência. O Teste de Competência ajuda a destacar o seu nível atual e encontrar oportunidades compatíveis.",
    value: "item-3",
  },
  {
    question: "Como funcionam as entrevistas garantidas?",
    answer:
      "Profissionais com nota igual ou superior a 7 no Teste de Competência GoDev™ têm o perfil encaminhado para ao menos 5 empresas parceiras que buscam talentos na sua stack ou área de atuação.",
    value: "item-4",
  },
  {
    question: "Quanto tempo leva pra receber um retorno?",
    answer:
      "Depende da sua stack e da demanda do momento, mas a maioria dos profissionais qualificados começa a receber contatos de empresas em até 10 dias após entrar no Banco de Talentos.",
    value: "item-5",
  },
  {
    question: "Posso escolher entre vagas CLT e PJ?",
    answer:
      "Sim. A GoDev trabalha com empresas que contratam tanto no formato CLT quanto PJ. Você escolhe o modelo que mais se encaixa no seu momento profissional.",
    value: "item-6",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="container py-6 mb-32 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Perguntas{" "}
        <span className="bg-gradient-to-b from-[#22c55e]/60 to-[#16a34a] text-transparent bg-clip-text">
          Frequentes
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left text-lg font-semibold">
              {question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base leading-relaxed">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-6 text-center text-lg">
        Ainda ficou com dúvida?{" "}
        <a
          rel="noreferrer noopener"
          href="https://wa.me/47996542706"
          className="text-[#16a34a] transition-all border-[#16a34a] hover:border-b-2"
        >
          Fale com a gente
        </a>
      </h3>
    </section>
  );
};
