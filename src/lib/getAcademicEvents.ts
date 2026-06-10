import {
  events,
  type EventTypeColor,
  type EventosAcademicos,
} from "@/data/events";

type PayloadEventType =
  | string
  | number
  | {
      id: string | number;
      name?: string;
      title?: string;
      color?: EventTypeColor;
    };

type PayloadAcademicEvent = {
  id: string | number;
  title: string;
  date: string;
  eventType?: PayloadEventType;
  description: string;
};

type PayloadResponse = {
  docs: PayloadAcademicEvent[];
};

function getTypeName(eventType: PayloadEventType | undefined): string {
  if (typeof eventType === "object" && eventType !== null) {
    return eventType.name || eventType.title || "General";
  }

  if (typeof eventType === "string") {
    return eventType;
  }

  return "General";
}

function getTypeColor(eventType: PayloadEventType | undefined): EventTypeColor {
  if (typeof eventType === "object" && eventType !== null && eventType.color) {
    return eventType.color;
  }

  return "gray";
}

export async function getAcademicEvents(): Promise<EventosAcademicos[]> {
  const baseUrl = (
    process.env.NEXT_PUBLIC_PAYLOAD_URL ||
    "https://calendario-unah-backend.vercel.app"
  )
    .trim()
    .replace(/\/+$/, "");

  const apiUrl =
    `${baseUrl}/api/eventos-academicos?limit=100&sort=date&depth=1`;

  try {
    const response = await fetch(apiUrl, {
      next: {
        revalidate: 10,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        `Error ${response.status} al consultar Payload:`,
        errorText,
      );

      return events;
    }

    const data = (await response.json()) as PayloadResponse;

    console.log(
      `Eventos recibidos desde Payload: ${data.docs.length}`,
    );

    return data.docs.map((event) => ({
      id: event.id,
      title: event.title,
      date: event.date.slice(0, 10),
      type: getTypeName(event.eventType),
      typeColor: getTypeColor(event.eventType),
      description: event.description,
    }));
  } catch (error) {
    console.error(
      "No se pudieron cargar los eventos desde Payload:",
      error,
    );

    return events;
  }
}

