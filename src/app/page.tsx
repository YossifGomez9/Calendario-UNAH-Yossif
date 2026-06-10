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

      <section className="grid h-[500px] w-full grid-cols-1 overflow-hidden lg:grid-cols-2">
  <div className="flex h-full w-full items-center justify-center overflow-hidden">
    <Header />
  </div>

  <div className="flex h-full w-full items-center justify-center overflow-hidden">
    <Carrucel />
  </div>
</section>

      <CalendarSection events={academicEvents} />

      <Footer />
    </main>
  ); 
} 