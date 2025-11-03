export const ProblemSection = () => {
  return (
    <section
      id="problem"
      className="container py-24 sm:py-32 text-center"
    >
      {/* Título */}
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        O que o modelo tradicional{" "}
        <span className="bg-gradient-to-b from-[#22c55e]/60 to-[#16a34a] text-transparent bg-clip-text">
          não te contam
        </span>{" "}
        sobre conseguir uma vaga...
      </h2>

      <p className="text-xl text-muted-foreground md:w-3/4 mx-auto mb-12">
        O mercado está cheio de oportunidades — mas a forma como a maioria tenta
        chegar até elas está completamente <strong>quebrada</strong>.
      </p>

      {/* Bloco comparativo */}
      <div className="grid md:grid-cols-2 gap-8 text-left">
        {/* Lado Esquerdo - Modelo Tradicional */}
        <div className="bg-muted/40 border rounded-xl p-8 space-y-4">
          <h3 className="text-2xl font-semibold flex items-center gap-2 text-red-500">
             Modelo Tradicional
          </h3>

          <ul className="space-y-3 text-lg text-muted-foreground">
            <li>❌ Enviar dezenas de currículos e nunca receber retorno.</li>
            <li>❌ Ficar horas preenchendo formulários em sites de vaga.</li>
            <li>❌ Mandar mensagens para recrutadores e ser ignorado.</li>
            <li>❌ Tentar vaga na gringa e nem saber se foi avaliado.</li>
            <li>❌ Passar por processos longos e desorganizados.</li>
            <li>❌ Sentir que o mercado é um ciclo sem fim.</li>
          </ul>

          <p className="text-lg text-muted-foreground mt-6">
            O resultado? <strong>Frustração, ansiedade</strong> e a sensação de
            que nada anda pra frente — mesmo tendo talento.
          </p>
        </div>

        {/* Lado Direito - Solução GoDev */}
        <div className="bg-[#f0fdf4] dark:bg-[#052e1658] border border-[#16a34a]/10 rounded-xl p-8 space-y-4">
          <h3 className="text-2xl font-semibold flex items-center gap-2 text-[#16a34a]">
            Modelo GoDev
          </h3>

          <ul className="space-y-3 text-lg text-muted-foreground">
            <li>✅ Conexão direta com empresas que estão contratando.</li>
            <li>✅ Processo guiado por especialistas em tecnologia.</li>
            <li>✅ Vagas CLT e PJ em empresas sólidas e sérias.</li>
            <li>✅ Até <strong>5 entrevistas garantidas</strong>.</li>
            <li>✅ Avaliação técnica e comportamental real.</li>
            <li>✅ Oportunidades em empresas como Bosch e Mercedes.</li>
          </ul>

          <p className="text-lg text-muted-foreground mt-6">
            Em vez de competir por atenção,{" "}
            <strong>você é apresentado diretamente</strong> às empresas certas —
            e tem chance real de ser contratado.
          </p>
        </div>
      </div>

      {/* Frase final de contraste */}
      <p className="text-xl md:text-2xl font-semibold mt-16 text-muted-foreground">
        Enquanto o resto do mercado tenta ser notado...{" "}
        <span className="text-[#16a34a] font-bold">
          os devs da GoDev estão sendo contratados.
        </span>
      </p>
    </section>
  );
};
