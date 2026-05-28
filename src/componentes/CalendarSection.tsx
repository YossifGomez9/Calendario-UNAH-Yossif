"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { EventosAcademicos } from "../data/events";
import EventCard from "./EventCard";

type CalendarSectionProps = {
  events?: EventosAcademicos[];
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
        <div className="flex items-center gap-3 rounded-lg bg-[#183972] px-4 py-3 text-white shadow-lg">
          <Button
            type="button"
            onClick={previousPage}
            disabled={currentPage === 0}
            variant="ghost"
            className="h-10 rounded-lg px-3 text-base font-bold text-white hover:bg-yellow-300 hover:text-[#183972] disabled:opacity-40"
            aria-label="Página anterior"
          >
            ‹
          </Button>

          {getPaginationItems().map((item, index) =>
            item === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="flex h-10 min-w-10 items-center justify-center text-lg font-bold text-white"
              >
                ...
              </span>
            ) : (
              <Button
                key={item}
                type="button"
                onClick={() => setCurrentPage(item - 1)}
                variant="ghost"
                className={`h-10 min-w-10 rounded-lg px-3 text-base font-bold transition-all ${
                  currentPage + 1 === item
                    ? "bg-yellow-400 text-[#183972] hover:bg-yellow-300 hover:text-[#183972]"
                    : "text-white hover:bg-yellow-300 hover:text-[#183972]"
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
            variant="ghost"
            className="h-10 rounded-lg px-3 text-base font-bold text-white hover:bg-yellow-300 hover:text-[#183972] disabled:opacity-40"
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
      className="relative w-full overflow-hidden bg-slate-100 px-4 py-20 sm:px-8 lg:px-12"
    >
      <div className="absolute inset-0 bg-[#183972]" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px]">
        <div className="mb-12 text-center">
          <span className="rounded-md bg-blue-100 px-5 py-2 text-base font-bold text-blue-900 shadow-sm">
            Vista general
          </span>

          <h2 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Calendario académico UNAH
          </h2>
        </div>

        <Card className="mx-auto rounded-lg border-slate-200 bg-white/95 p-6 shadow-2xl backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="mb-8 w-full rounded-md bg-[#183972] p-7 text-white">
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
                  className="h-14 w-full rounded-md border-2 border-yellow-400 bg-white pl-12 pr-4 text-base font-semibold text-[#183972] placeholder:text-slate-400 focus:ring-yellow-300"
                />
              </div>

              <div className="w-full lg:flex-1">
                <select
                  value={selectedType}
                  onChange={(event) => handleFilterChange(event.target.value)}
                  className="h-14 w-full rounded-md border-2 border-yellow-400 bg-white px-4 text-base font-semibold text-[#183972] outline-none focus:ring-2 focus:ring-yellow-300"
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
                  className="h-14 w-full rounded-md border-2 border-yellow-400 bg-white px-4 text-base font-semibold text-[#183972] focus:ring-yellow-300"
                  aria-label="Filtrar eventos por fecha"
                />
              </div>

              <div className="w-full lg:flex-1">
                <Button
                  type="button"
                  onClick={clearFilters}
                  className="h-14 w-full rounded-md bg-yellow-400 px-4 text-base font-bold text-[#183972] hover:bg-yellow-300"
                >
                  Limpiar
                </Button>
              </div>
            </div>
          </div>

          {renderPagination("mb-8")}

          {visibleEvents.length > 0 ? (
            <div className="overflow-hidden rounded-md">
              <div
                key={`${selectedType}-${search}-${selectedDate}-${currentPage}`}
                className="grid gap-x-6 gap-y-8 py-6 transition-all duration-300 ease-in-out md:grid-cols-2 xl:grid-cols-3"
              >
                {visibleEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    title={event.title}
                    date={event.date}
                    type={event.type}
                    description={event.description}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-base font-semibold text-slate-500">
              No se encontraron eventos con esa búsqueda o filtro.
            </div>
          )}

          {renderPagination("mt-8")}
        </Card>
      </div>
    </section>
  );
}