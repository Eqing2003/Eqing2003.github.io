import ScrollReveal from "./ScrollReveal";

export default function SectionHeading({
  title,
  accent,
  subtitle,
}: {
  title: string;
  accent: string;
  subtitle: string;
}) {
  return (
    <ScrollReveal className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold mb-3">
        {title}
        <span className="text-gradient"> {accent}</span>
      </h2>
      <p className="text-gray-400 text-sm md:text-base">{subtitle}</p>
    </ScrollReveal>
  );
}
