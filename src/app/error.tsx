"use client";

import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_34%),linear-gradient(135deg,#183972,#102a58)] px-6">
      <section className="w-full max-w-xl rounded-3xl border border-white/20 bg-white/95 p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-3xl font-black text-red-700">
          !
        </div>

        <h1 className="mt-5 text-3xl font-black text-[#183972]">
          No se pudo cargar la página
        </h1>

        <p className="mt-4 text-base leading-7 text-slate-600">
          Ocurrió un problema inesperado. Puedes intentar cargar nuevamente.
        </p>

        <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-500">
          {error.message}
        </p>

        <Button
          type="button"
          onClick={reset}
          className="mt-6 rounded-xl bg-yellow-400 px-6 py-3 font-black text-[#183972] shadow-lg shadow-yellow-400/30 hover:bg-yellow-300"
        >
          Intentar nuevamente
        </Button>
      </section>
    </main>
  );
}
