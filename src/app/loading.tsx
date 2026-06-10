export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.20),transparent_34%),linear-gradient(135deg,#183972,#102a58)] px-6">
      <section className="w-full max-w-md rounded-3xl border border-white/20 bg-white/95 p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#183972] shadow-lg">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/35 border-t-yellow-400" />
        </div>

        <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-500">
          UNAH
        </p>

        <h1 className="mt-3 text-3xl font-black text-[#183972]">
          Cargando calendario
        </h1>

        <p className="mt-3 text-base leading-7 text-slate-600">
          Estamos preparando los eventos académicos y la información principal.
        </p>
      </section>
    </main>
  );
}
