"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { EventosAcademicos } from "../data/events";
import EventCard from "./EventCard";

type CalendarSectionProps = {
  events?: EventosAcademicos[];
  loadStatus?: "success" | "fallback" | "empty";
  loadMessage?: string;
};

const ITEMS_PER_PAGE = 6;

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function CalendarSection({
  events = [],
  loadStatus = "success",
  loadMessage,
}: CalendarSectionProps) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("Todos");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const eventTypes = useMemo(() => {
    const types = Array.from(new Set(events.map((event) => event.type)));
    return ["Todos", ...types];
  }, [events]);

  const filteredEvents = useMemo(() => {
    const text = normalizeText(search.trim());

    return events.filter((event) => {
      const eventDate = new Date(`${event.date}T00:00:00`);

      const dateText = eventDate.toLocaleDateString("es-HN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const matchesSearch =
        !text ||
        normalizeText(event.title).includes(text) ||
        normalizeText(event.type).includes(text) ||
        normalizeText(event.description).includes(text) ||
        normalizeText(event.date).includes(text) ||
        normalizeText(dateText).includes(text);

      const matchesType =
        selectedType === "Todos" || event.type === selectedType;

      const matchesDate = !selectedDate || event.date === selectedDate;

      return matchesSearch && matchesType && matchesDate;
    });
  }, [events, search, selectedType, selectedDate]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredEvents.length / ITEMS_PER_PAGE),
  );

  const visibleEvents = filteredEvents.slice(
    currentPage * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
  );

  const activeFilters =
    search.trim() !== "" || selectedType !== "Todos" || selectedDate !== "";

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(0);
  };

  const handleFilterChange = (type: string) => {
    setSelectedType(type);
    setCurrentPage(0);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setCurrentPage(0);
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedType("Todos");
    setSelectedDate("");
    setCurrentPage(0);
  };

  const previousPage = () => {
    setCurrentPage((page) => Math.max(0, page - 1));
  };

  const nextPage = () => {
    setCurrentPage((page) => Math.min(totalPages - 1, page + 1));
  };

  const getPaginationItems = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const current = currentPage + 1;
    let start = Math.max(1, current - 1);
    let end = start + 2;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - 2);
    }

    const pages: Array<number | "..."> = [];

    for (let page = start; page <= end; page++) {
      pages.push(page);
    }

    if (end < totalPages) {
      pages.push("...");
    }

    return pages;
  };

  const renderPagination = (className = "") => {
    return (
      <div className={`flex w-full justify-center ${className}`}>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
          <Button
            type="button"
            onClick={previousPage}
            disabled={currentPage === 0}
            className="h-9 rounded-full px-3 text-lg font-black text-[#183972] hover:bg-[#183972] hover:text-white disabled:opacity-40"
            aria-label="Página anterior"
          >
            ‹
          </Button>

          {getPaginationItems().map((item, index) =>
            item === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="flex h-9 min-w-8 items-center justify-center text-sm font-black text-slate-400"
              >
                ...
              </span>
            ) : (
              <Button
                key={item}
                type="button"
                onClick={() => setCurrentPage(item - 1)}
                className={`h-9 min-w-9 rounded-full px-3 text-sm font-black transition-all ${currentPage + 1 === item
                    ? "bg-[#183972] text-white hover:bg-[#102a58]"
                    : "text-[#183972] hover:bg-yellow-300 hover:text-[#183972]"
                  }`}
                aria-label={`Ir a la página ${item}`}
              >
                {item}
              </Button>
            ),
          )}

          <Button
            type="button"
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="h-9 rounded-full px-3 text-lg font-black text-[#183972] hover:bg-[#183972] hover:text-white disabled:opacity-40"
            aria-label="Página siguiente"
          >
            ›
          </Button>
        </div>
      </div>
    );
  };

  return (
    <section
      id="calendario"
      className="w-full bg-[#183972] px-4 py-20 sm:px-8 lg:px-12"
    >
      <div className="mx-auto w-full max-w-[1500px]">



        <div className="mb-12 flex flex-col items-center justify-center text-center">
          <span className="inline-flex rounded-md bg-blue-100 px-5 py-2 text-base font-bold text-blue-900 shadow-sm">
            Vista general
          </span>

          <div className="mt-5 flex flex-col items-center justify-center gap-4 lg:flex-row lg:gap-8">
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Calendario académico UNAH
            </h2>

            <img
              src="/puma-unah.png"
              alt="Mascota UNAH"
              className="h-28 w-auto -translate-y-4 object-contain opacity-95 drop-shadow-2xl sm:h-32 lg:h-30"
            />
          </div>
        </div>


        <Card className="mx-auto rounded-2xl border-0 bg-white p-5 shadow-xl sm:p-8 lg:p-10">
          <div className="mb-8 rounded-2xl bg-[#183972] p-5">
            <div className="flex w-full flex-col gap-4 lg:flex-row">
              <div className="relative w-full lg:flex-[2]">
                <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#183972]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-4.35-4.35m1.1-5.4a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
                    />
                  </svg>
                </span>

                <Input
                  value={search}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  placeholder="Buscar por evento, categoría o fecha..."
                  className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-base font-semibold text-[#183972] shadow-sm placeholder:text-slate-400 focus:border-yellow-400 focus:ring-yellow-300"
                />
              </div>

              <div className="w-full lg:flex-1">
                <select
                  value={selectedType}
                  onChange={(event) => handleFilterChange(event.target.value)}
                  className="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-semibold text-[#183972] shadow-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300"
                  aria-label="Filtrar eventos por tipo"
                >
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full lg:flex-1">
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(event) => handleDateChange(event.target.value)}
                  className="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 text-base font-semibold text-[#183972] shadow-sm focus:border-yellow-400 focus:ring-yellow-300"
                  aria-label="Filtrar eventos por fecha"
                />
              </div>

              <div className="w-full lg:flex-1">
                <Button
                  type="button"
                  onClick={clearFilters}
                  disabled={!activeFilters}
                  className="h-14 w-full rounded-xl bg-yellow-400 px-4 font-black text-[#183972] shadow-sm hover:bg-yellow-300 disabled:opacity-50"
                >
                  Limpiar
                </Button>
              </div>
            </div>
          </div>

          {loadStatus !== "success" && (
            <div className="mb-8 rounded-xl bg-yellow-50 px-5 py-4 text-sm font-bold text-[#183972]">
              {loadMessage ??
                "No se pudieron cargar los eventos desde Payload. Revisa el backend."}
            </div>
          )}

          <div className="mb-8 flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-bold text-[#183972]">
              {filteredEvents.length} eventos encontrados
            </p>

            <p className="text-sm font-semibold text-slate-500">
              Página {currentPage + 1} de {totalPages}
            </p>
          </div>

          {renderPagination("mb-8")}

          {visibleEvents.length > 0 ? (
            <div className="overflow-hidden rounded-xl">
              <div
                key={`${selectedType}-${search}-${selectedDate}-${currentPage}`}
                className="grid auto-rows-fr gap-x-6 gap-y-8 py-6 transition-all duration-300 ease-in-out md:grid-cols-2 xl:grid-cols-3"
              >
                {visibleEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    title={event.title}
                    date={event.date}
                    type={event.type}
                    typeColor={event.typeColor}
                    description={event.description}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-slate-50 p-10 text-center">
              <h3 className="text-2xl font-black text-[#183972]">
                No se encontraron eventos
              </h3>

              <p className="mt-3 text-base font-semibold text-slate-500">
                Cambia la búsqueda, limpia los filtros o registra nuevos eventos.
              </p>
            </div>
          )}

          {renderPagination("mt-8")}
        </Card>
      </div>
    </section>
  );
}