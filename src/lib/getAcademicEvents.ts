import { events, type EventosAcademicos } from "@/data/events";

type PayloadAcademicEvent = {
  id: string | number;
  title: string;
  date: string;
  type: EventosAcademicos["type"];
  description: string;
};

type PayloadResponse = {
  docs: PayloadAcademicEvent[];
};

export async function getAcademicEvents(): Promise<EventosAcademicos[]> {
  const baseUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL;

  if (!baseUrl) {
    return events;
  }

  try {
    const response = await fetch(
      `${baseUrl}/api/eventos-academicos?limit=100&sort=date`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("No se pudieron cargar los eventos desde Payload.");
    }

    const data = (await response.json()) as PayloadResponse;

    return data.docs.map((event) => ({
      id: event.id,
      title: event.title,
      date: event.date.slice(0, 10),
      type: event.type,
      description: event.description,
    }));
  } catch (error) {
    console.error("Error cargando eventos desde Payload:", error);
    return events;
  }
}