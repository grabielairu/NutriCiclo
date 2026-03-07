import Link from "next/link";
import config from "@/config";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#1A2E1A] via-[#2D4A2D] to-[#1A3A3A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
        <div className="flex flex-col md:flex-row md:items-start gap-10">
          <div className="flex-shrink-0 md:w-64 text-center md:text-left">
            <Link
              href="/"
              className="flex gap-2 justify-center md:justify-start items-center"
            >
              <span className="text-2xl">🦦</span>
              <strong className="font-extrabold tracking-tight text-lg text-white">
                {config.appName}
              </strong>
            </Link>

            <p className="mt-3 text-sm text-white/60">
              {config.appDescription}
            </p>

            <p className="mt-3 text-sm text-white/30">
              &copy; {new Date().getFullYear()} {config.appName}
            </p>
          </div>

          <div className="flex-grow flex flex-wrap justify-center md:justify-end gap-16">
            <div>
              <div className="font-semibold text-white/80 tracking-widest text-sm mb-3">
                LEGAL
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <Link href="/tos" className="text-white/50 hover:text-white/80 transition-colors">
                  Terminos de servicio
                </Link>
                <Link href="/privacy-policy" className="text-white/50 hover:text-white/80 transition-colors">
                  Politica de privacidad
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10">
          <p className="text-xs text-white/30 text-center max-w-2xl mx-auto">
            Las recomendaciones de NutriCiclo son informativas y estan basadas en ciencia
            nutricional publicada. No sustituyen el consejo medico profesional. Consulta a
            tu profesional de salud para orientacion personalizada.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
