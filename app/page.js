import { Suspense } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        {/* Hero with nature gradient */}
        <section className="bg-nature relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-10 left-10 w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-white/3 blur-3xl" />

          <div className="flex flex-col items-center justify-center text-center gap-8 px-4 sm:px-8 py-16 sm:py-28 max-w-4xl mx-auto relative z-10">
            <span className="text-7xl" style={{ animation: "float 6s ease-in-out infinite" }}>🦦</span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
              Nutre tu cuerpo en sintonia con tu ciclo
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
              Descubre que alimentos necesita tu cuerpo en cada fase de tu ciclo
              menstrual. Recomendaciones personalizadas basadas en ciencia.
            </p>
            <Link
              href="/dashboard"
              className="btn btn-lg border-none text-[var(--color-dark)] font-bold text-lg px-10 bg-white hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5"
            >
              Comenzar
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="bg-nature-soft px-4 sm:px-8 py-12 sm:py-24 relative">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-[var(--color-dark)] text-center mb-16">
              Todo lo que necesitas
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass rounded-2xl p-5 sm:p-8 shadow-nature hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5" style={{ background: "linear-gradient(135deg, var(--color-coral), #e8968e)" }}>
                  🍎
                </div>
                <h3 className="text-xl font-bold text-[var(--color-dark)] mb-3">
                  Nutricion por Fase
                </h3>
                <p className="text-[var(--color-dark)]/60 text-sm leading-relaxed">
                  Cada fase de tu ciclo tiene necesidades nutricionales distintas.
                  Te decimos que comer y por que, respaldado por estudios clinicos.
                </p>
              </div>

              <div className="glass rounded-2xl p-5 sm:p-8 shadow-nature hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5" style={{ background: "linear-gradient(135deg, var(--color-river), #7bbfdb)" }}>
                  🌙
                </div>
                <h3 className="text-xl font-bold text-[var(--color-dark)] mb-3">
                  Tu Ciclo, Visual
                </h3>
                <p className="text-[var(--color-dark)]/60 text-sm leading-relaxed">
                  Visualiza en que dia y fase de tu ciclo estas con un grafico
                  interactivo. Sabe cuando viene tu proximo periodo.
                </p>
              </div>

              <div className="glass rounded-2xl p-5 sm:p-8 shadow-nature hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5" style={{ background: "linear-gradient(135deg, var(--color-sage), var(--color-bright))" }}>
                  🔬
                </div>
                <h3 className="text-xl font-bold text-[var(--color-dark)] mb-3">
                  Basado en Ciencia
                </h3>
                <p className="text-[var(--color-dark)]/60 text-sm leading-relaxed">
                  Cada recomendacion explica la razon cientifica detras. Omega-3
                  para calambres, magnesio para PMS, y mucho mas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-[var(--color-cream)] px-4 sm:px-8 py-12 sm:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[var(--color-dark)] mb-16">
              Como funciona
            </h2>
            <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
              <div className="flex-1">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-5 shadow-lg" style={{ background: "linear-gradient(135deg, var(--color-sage), var(--color-sage-light))" }}>
                  1
                </div>
                <h4 className="font-bold text-[var(--color-dark)] mb-2 text-lg">Ingresa tus datos</h4>
                <p className="text-sm text-[var(--color-dark)]/60 leading-relaxed">
                  Tu nombre, duracion de ciclo y fecha de tu ultimo periodo.
                </p>
              </div>
              <div className="flex-1">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-5 shadow-lg" style={{ background: "linear-gradient(135deg, var(--color-fresh), var(--color-bright))" }}>
                  2
                </div>
                <h4 className="font-bold text-[var(--color-dark)] mb-2 text-lg">Conoce tu fase</h4>
                <p className="text-sm text-[var(--color-dark)]/60 leading-relaxed">
                  Calculamos automaticamente en que fase de tu ciclo estas hoy.
                </p>
              </div>
              <div className="flex-1">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-5 shadow-lg" style={{ background: "linear-gradient(135deg, var(--color-river), #7bbfdb)" }}>
                  3
                </div>
                <h4 className="font-bold text-[var(--color-dark)] mb-2 text-lg">Come mejor</h4>
                <p className="text-sm text-[var(--color-dark)]/60 leading-relaxed">
                  Recibe recomendaciones de alimentos especificos para tu fase actual.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
