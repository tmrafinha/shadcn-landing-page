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
    question: "O cadastro na GoDev é realmente gratuito?",
    answer:
      "Sim! Todo o processo é 100% gratuito — desde o Teste de Competência GoDev™ até a inclusão no nosso Banco de Talentos. Você só precisa preencher o teste e pronto, nossa equipe faz o resto.",
    value: "item-1",
  },
  {
    question: "Como funciona o Teste de Competência GoDev™?",
    answer:
      "O teste avalia suas principais habilidades técnicas e comportamentais, levando menos de 3 minutos para ser concluído. Ele nos ajuda a identificar as oportunidades ideais para o seu perfil.",
    value: "item-2",
  },
  {
    question: "Posso conseguir vagas CLT e também PJ?",
    answer:
      "Sim! A GoDev conecta profissionais de tecnologia a empresas que contratam tanto no modelo CLT quanto PJ. Você escolhe o formato que faz mais sentido pra sua realidade.",
    value: "item-3",
  },
  {
    question: "O que significa '5 entrevistas garantidas'?",
    answer:
      "Significa que, se sua nota for acima de 7 no Teste de Competência, nossa equipe garante o envio do seu perfil para pelo menos 5 oportunidades reais com empresas parceiras.",
    value: "item-4",
  },
  {
    question: "Em quanto tempo posso ser chamado para uma entrevista?",
    answer:
      "Na média, os profissionais qualificados são contatados por empresas em até 10 dias após entrarem no Banco de Talentos GoDev™ — dependendo da demanda de cada stack.",
    value: "item-5",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Perguntas{" "}
        <span className="bg-gradient-to-b from-[#22c55e]/60 to-[#16a34a] text-transparent bg-clip-text">
          Frequentes
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Ainda ficou com dúvida?{" "}
        <a
          rel="noreferrer noopener"
          href="#"
          className="text-[#16a34a] transition-all border-[#16a34a] hover:border-b-2"
        >
          Fale com a gente
        </a>
      </h3>
    </section>
  );
};
