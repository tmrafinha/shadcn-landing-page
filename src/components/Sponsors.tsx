interface SponsorProps {
  image: string;
  name: string;
}

const sponsors: SponsorProps[] = [
  {
    image: "/images/centauro.png",
    name: "Centauro",
  },
  {
    image: "/images/chillibeans.png",
    name: "Chilli Beans",
  },
  {
    image: "/images/fastshop.png",
    name: "Fast Shop",
  },
  {
    image: "/images/hering.png",
    name: "Hering",
  },
];

export const Sponsors = () => {
  return (
    <section
      id="sponsors"
      className="container sm:py-32"
    >
      <h2 className="text-center text-2xl md:text-3xl font-extrabold mb-10 text-primary tracking-tight">
        +50 Empresas<span className="text-zinc-300"> parceiras</span>
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-10 opacity-80">
        {sponsors.map(({ image, name }: SponsorProps) => (
          <div
            key={name}
            className="flex items-center justify-center grayscale hover:grayscale-0 transition-all"
          >
            <img
              src={image}
              alt={name}
              className="h-8 md:h-10 object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
