export const Statistics = () => {
  interface statsProps {
    quantity: string;
    description: string;
  }

  const stats: statsProps[] = [
    {
      quantity: "1.000+",
      description: "Contratações Realizadas",
    },
    {
      quantity: "50+",
      description: "Empresas Parceiras",
    },
    {
      quantity: "5x",
      description: "Entrevistas Garantidas",
    },
    {
      quantity: "70%",
      description: "Aprovação",
    },
  ];

  return (
    <section id="statistics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map(({ quantity, description }: statsProps) => (
          <div key={description} className="space-y-2 text-center">
            <h2 className="text-4xl font-bold text-[#16a34a]">{quantity}</h2>
            <p className="text-lg text-muted-foreground font-medium tracking-wide">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
