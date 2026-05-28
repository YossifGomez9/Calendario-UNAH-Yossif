"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type EventCardProps = {
  title: string;
  date: string;
  type: string;
  description: string;
};

const typeStyles: Record<string, string> = {
  Admisiones: "bg-blue-100 text-blue-800 border-blue-200",
  Clases: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Exámenes: "bg-amber-100 text-amber-800 border-amber-200",
  Feriado: "bg-rose-100 text-rose-800 border-rose-200",
  General: "bg-slate-100 text-slate-800 border-slate-200",
};

export default function EventCard({
  title,
  date,
  type,
  description,
}: EventCardProps) {
  const [openDetail, setOpenDetail] = useState(false);

  useEffect(() => {
    if (openDetail) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openDetail]);

  const eventDate = new Date(`${date}T00:00:00`);

  const day = eventDate.toLocaleDateString("es-HN", {
    day: "2-digit",
  });

  const month = eventDate.toLocaleDateString("es-HN", {
    month: "short",
  });

  const fullDate = eventDate.toLocaleDateString("es-HN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Card onClick={() => setOpenDetail(true)} className="flex min-h-[350px] flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="flex items-start gap-4">
          <div className="flex min-w-20 flex-col items-center rounded-3xl bg-yellow-300 px-4 py-4 text-[#183972] shadow-md">
            <span className="text-4xl font-black leading-none">{day}</span>

            <span className="mt-2 text-sm font-semibold uppercase tracking-wide">
              {month}
            </span>
          </div>

          <div className="min-w-0 flex-1 pt-2">
            <h3 className="text-2xl font-black leading-tight text-[#183972]">
              {title}
            </h3>
          </div>
        </div>

        <p className="mt-5 flex-1 text-base leading-7 text-slate-600">
          {description}
        </p>

      

        <div className="mt-6 flex items-end justify-between gap-4">
          <p className="text-sm font-semibold text-slate-500">{fullDate}</p>

          <span
            className={`inline-flex rounded-md border px-4 py-2 text-sm font-bold ${
              typeStyles[type] ?? typeStyles.General
            }`}
          >
            {type}
          </span>
        </div>
      </Card>

      {openDetail &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-black/40 px-4 backdrop-blur-xl">
            <Card className="relative w-full max-w-2xl rounded-lg border-slate-200 bg-white p-8 shadow-2xl md:p-10">
              <Button
                onClick={() => setOpenDetail(false)}
                className="absolute right-5 top-5 rounded-md bg-[#183972] px-5 text-white hover:bg-[#102a58]"
              >
                Cerrar
              </Button>

              <div className="pr-20">
                <span
                  className={`inline-flex rounded-md border px-4 py-2 text-sm font-bold ${
                    typeStyles[type] ?? typeStyles.General
                  }`}
                >
                  {type}
                </span>

                <h2 className="mt-6 text-3xl font-black leading-tight text-[#183972] md:text-4xl">
                  {title}
                </h2>

                <p className="mt-4 text-lg font-semibold text-slate-500">
                  {fullDate}
                </p>

                <div className="mt-8 rounded-lg bg-slate-50 p-6">
                  <h3 className="mb-3 text-xl font-bold text-[#183972]">
                    Detalles del evento
                  </h3>

                  <p className="text-base leading-7 text-slate-600">
                    {description}
                  </p>

                  <p className="mt-4 text-base leading-7 text-slate-600">
                    Este evento pertenece a la categoría{" "}
                    <strong>{type}</strong> y forma parte del calendario
                    académico de la UNAH.
                  </p>
                </div>
              </div>
            </Card>
          </div>,
          document.body,
        )}
    </>
  );
}
