import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export const metadata = { title: "关于我 | 何亦清" };

export default function AboutPage() {
  return (
    <div className="pt-20">
      <AboutSection />
      <Footer />
    </div>
  );
}
