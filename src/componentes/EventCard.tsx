"use client";

import { useState, useEffect, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type EventCardProps = {
  title: string;
  date: string;
  type: string;
  typeColor?: "blue" | "green" | "yellow" | "red" | "purple" | "gray";
  description: string;
};

const typeStyles: Record<string, string> = {
  blue: "bg-blue-100 text-blue-800 border-blue-200",
  green: "bg-emerald-100 text-emerald-800 border-emerald-200",
  yellow: "bg-amber-100 text-amber-800 border-amber-200",
  red: "bg-rose-100 text-rose-800 border-rose-200",
  purple: "bg-purple-100 text-purple-800 border-purple-200",
  gray: "bg-slate-100 text-slate-800 border-slate-200",
};

const titlePreviewStyle: CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const descriptionPreviewStyle: CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export default function EventCard({
  title,
  date,
  type,
  typeColor = "gray",
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

  const badgeClass = typeStyles[typeColor] ?? typeStyles.gray;

  return (
    <>
      <Card
        onClick={() => setOpenDetail(true)}
        className="flex h-[350px] cursor-pointer flex-col overflow-hidden rounded-lg border border-slate-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <div className="flex items-start gap-4">
          <div className="flex min-w-20 flex-col items-center rounded-3xl bg-yellow-300 px-4 py-4 text-[#183972] shadow-md">
            <span className="text-4xl font-black leading-none">{day}</span>

            <span className="mt-2 text-sm font-semibold uppercase tracking-wide">
              {month}
            </span>
          </div>

          <div className="min-w-0 flex-1 pt-2">
            <h3
              className="text-2xl font-black leading-tight text-[#183972]"
              style={titlePreviewStyle}
            >
              {title}
            </h3>
          </div>
        </div>

        <p
          className="mt-5 h-[84px] text-base leading-7 text-slate-600"
          style={descriptionPreviewStyle}
        >
          {description}
        </p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <p className="truncate text-sm font-semibold text-slate-500">
            {fullDate}
          </p>

          <span
            className={`inline-flex shrink-0 rounded-md border px-4 py-2 text-sm font-bold ${badgeClass}`}
          >
            {type}
          </span>
        </div>
      </Card>

      {openDetail &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-black/40 px-4 backdrop-blur-xl">
            <Card className="relative flex max-h-[85vh] w-full max-w-2xl flex-col rounded-lg border-slate-200 bg-white p-0 shadow-2xl">
              <div className="border-b border-slate-200 p-6 md:p-8">
                <span
                  className={`inline-flex rounded-md border px-4 py-2 text-sm font-bold ${badgeClass}`}
                >
                  {type}
                </span>

                <h2 className="mt-6 text-3xl font-black leading-tight text-[#183972] md:text-4xl">
                  {title}
                </h2>

                <p className="mt-4 text-lg font-semibold text-slate-500">
                  {fullDate}
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="rounded-lg bg-slate-50 p-6">
                  <h3 className="mb-3 text-xl font-bold text-[#183972]">
                    Detalles del evento
                  </h3>

                  <p className="whitespace-pre-line text-base leading-7 text-slate-600">
                    {description}
                  </p>

                  <p className="mt-4 text-base leading-7 text-slate-600">
                    Este evento pertenece a la categoría{" "}
                    <strong>{type}</strong> y forma parte del calendario
                    académico de la UNAH.
                  </p>
                </div>
              </div>

              <div className="flex justify-end border-t border-slate-200 p-6">
                <Button
                  type="button"
                  onClick={() => setOpenDetail(false)}
                  className="rounded-lg bg-yellow-400 px-5 py-2 font-semibold text-[#183972] hover:bg-yellow-300"
                >
                  Cerrar
                </Button>
              </div>
            </Card>
          </div>,
          document.body,
        )}
    </>
  );
}