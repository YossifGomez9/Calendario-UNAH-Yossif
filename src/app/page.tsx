import Navbar from "../componentes/Navbar";
import Header from "../componentes/Header";
import CalendarSection from "../componentes/CalendarSection";
import Footer from "../componentes/Footer";
import Carrucel from "../componentes/Carrucel";
import { getAcademicEvents } from "@/lib/getAcademicEvents";

export default async function Home() {
  const academicEvents = await getAcademicEvents();

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-slate-100">
      <Navbar />

      <section className="grid min-h-[calc(100vh-64px)] w-full grid-cols-1 overflow-hidden lg:grid-cols-2">
        <div className="min-h-[calc(100vh-64px)] w-full overflow-hidden">
          <Header />
        </div>

        <div className="min-h-[calc(100vh-64px)] w-full overflow-hidden">
          <Carrucel />
        </div>
      </section>

      <CalendarSection events={academicEvents} />

      <Footer />
    </main>
  );
}