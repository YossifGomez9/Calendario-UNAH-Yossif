export default function Navbar() {
  return (
    <header className="relative z-50 w-full bg-[#183972] px-6 py-2 shadow-md">
      <nav className="mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-3 sm:grid-cols-3">
        <div className="flex justify-center sm:justify-start">
          <img
            src="https://www.unah.edu.hn/themes/portalunah-new/assets/images/logo-unah-blanco.png"
            alt="Logo UNAH"
            className="h-12 w-auto"
          />
        </div>

        <div className="flex justify-center">
          <h2 className="text-center text-lg font-bold text-gray-200 sm:text-xl">
            Calendario Académico UNAH 
          </h2>
        </div>

        <div className="hidden justify-end sm:flex">
          <a
            href="#calendario"
            className="bg-yellow-400 px-5 py-1 font-semibold text-[#183972] hover:bg-yellow-300 rounded-lg"
          >
            Ver calendario
          </a>
        </div>
      </nav>
    </header>
  );
}
