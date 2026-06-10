import { Card } from "@/components/ui/card";
import WelcomeModal from "@/componentes/Modal";

export default function Header() {
  return (
    <>
      <WelcomeModal />

      <section
        className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#edf2f7] bg-cover bg-center p-0"
        style={{
          backgroundImage:
            "url('https://curc.unah.edu.hn/assets/assets/common/sol-cut.png')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/75 via-[#edf2f7]/80 to-blue-100/70" />
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-yellow-300/25 blur-3xl" />
        <div className="absolute -bottom-24 right-8 h-72 w-72 rounded-full bg-[#183972]/20 blur-3xl" />

        <div className="relative z-10 flex w-full items-center justify-center px-6">
          <Card className="w-full max-w-md rounded-2xl bg-white px-6 py-7 text-center shadow-lg md:px-8 md:py-8">
            <h2 className="mb-3 text-center text-3xl font-bold tracking-wide text-[#183972]">
              Aquí encontrarás...
            </h2>

            <p className="mx-auto max-w-sm text-center text-base leading-7 text-gray-600">
              Tu recurso confiable para estar al tanto de todas las fechas
              importantes. Aquí encontrarás información actualizada. ¡Mantente
              informado y no te pierdas ningún evento importante en tu vida
              universitaria!
            </p>
          </Card>
        </div>
      </section>
    </>
  );
}


