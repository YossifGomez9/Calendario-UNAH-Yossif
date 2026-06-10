"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("welcome-modal-shown");

    if (!alreadyShown) {
      setOpen(true);
      sessionStorage.setItem("welcome-modal-shown", "true");
    }
  }, []);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-2xl">
        <h2 className="text-2xl font-black text-[#183972]">
          !Bienvenido Pumita¡
        </h2>

        <p className="mt-4 text-base leading-7 text-slate-600">
          Encuentra las fechas mas importantes
        </p>
<br />
        <Button
          onClick={() => setOpen(false)}
          className="bg-yellow-400 px-5 py-2 font-semibold text-[#183972] hover:bg-yellow-300 rounded-lg"
        >
          Entendido
        </Button>
      </div>
    </div>
  );
}