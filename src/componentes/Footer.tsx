import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { FaXTwitter, FaYoutube} from "react-icons/fa6";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer
      className="relative w-full overflow-hidden bg-cover bg-center py-12 text-white"
      style={{
        backgroundImage: "url('/fondo-footer.png')",
      }}
    >
      

      <div className="relative z-10 mx-auto flex min-h-[520px] w-full max-w-[1500px] flex-col justify-center px-6 py-12 sm:px-10 lg:px-16">
        <div className="text-center md:text-left">
          <h2 className="text-lg font-medium tracking-wide text-[#183972] sm:text-xl md:text-2xl">
            UNIVERSIDAD NACIONAL AUTÓNOMA DE HONDURAS
          </h2>

          <p className="mt-2 text-sm text-[#183972] sm:text-base">
            Última actualización: 7 Marzo 2026, 09:34 am
          </p>
        </div>

        <div className="mt-7 flex justify-center gap-6 md:justify-start">
  <a
    href="https://www.facebook.com/cuentaoficialUNAH"
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#183972] transition-colors duration-300 hover:text-yellow-500"
  >
    <span className="sr-only">Facebook</span>
    <FaFacebookF />
  </a>

  <a
    href="https://x.com/UNAH_oficial"
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#183972] transition-colors duration-300 hover:text-yellow-500"
  >
    <span className="sr-only">X</span>
    <FaXTwitter  />
  </a>

  <a
    href="https://www.instagram.com/UNAH_oficial"
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#183972] transition-colors duration-300 hover:text-yellow-500"
  >
    <span className="sr-only">Instagram</span>
    <FaInstagram />
  </a>

  <a
    href="https://www.linkedin.com/company/UNAH_oficial"
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#183972] transition-colors duration-300 hover:text-yellow-500"
  >
    <span className="sr-only">LinkedIn</span>
    <FaLinkedinIn />
  </a>

  <a
    href="https://www.youtube.com/UNAH_oficial "
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#183972] transition-colors duration-300 hover:text-yellow-500"
  >
    <span className="sr-only">YouTube</span>
    <FaYoutube />
  </a>


</div>

        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <div className="mb-8 flex flex-col items-center justify-center gap-8 text-center sm:flex-row">
            <img
              src="https://www.bing.com/th/id/OIP.46ZnGwEvtfi33n-PjchjfQAAAA?w=193&h=135&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
              alt="Logo UNAH"
              className="h-auto w-32"
            />

            <img
              src="https://dircom.unah.edu.hn/dmsdocument/17473-sellos-acreditacion-azul"
              alt="Sellos de acreditación"
              className="h-auto w-64"
            />
          </div>

          <p className="text-sm text-[#183972] sm:text-base">
            Derechos reservados Universidad Nacional Autónoma de Honduras 2026
          </p>

          <p className="mt-1 text-sm text-[#183972] sm:text-base">
            Desarrollado por la{" "}
            <a href="#" className="font-semibold text-[#183972] underline decoration-yellow-400 decoration-2 underline-offset-4">
              Dirección Ejecutiva de Gestión de Tecnología
            </a>
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-4">
          
               <a href="https://mail.unah.edu.hn/" target="_blank" rel="noopener noreferrer" className="bg-yellow-400 px-5 py-2 font-semibold text-[#183972] hover:bg-yellow-300 rounded-lg">
                Contactanos 
              </a>

              <a href="https://www.unah.edu.hn/" target="_blank" rel="noopener noreferrer" className="bg-yellow-400 px-5 py-2 font-semibold text-[#183972] hover:bg-yellow-300 rounded-lg">
                Portal
              </a>
           
          </div>


        </div>


      </div>
    </footer>
  );
}

