import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

export const metadata = { title: "项目 | 何亦清" };

export default function ProjectsPage() {
  return (
    <div className="pt-20">
      <ProjectsSection />
      <Footer />
    </div>
  );
}
