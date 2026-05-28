"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const slides = [
  {
    title: "Admisiones",
    description:
      "Información sobre el proceso de matrícula académica para el próximo período.",
    image:
      "https://blogs.unah.edu.hn/assets/sistema-de-admision/blog/11244/thumbnail-IMG-1115.jpg",
  },
  {
    title: "Exámenes",
    description:
      "Información sobre el proceso de exámenes para el próximo período.",
    image:
      "https://latitudhn.com/wp-content/uploads/2024/12/DSC_0394-scaled-1.jpg",
  },
  {
    title: "Feriados",
    description: "Información sobre los feriados del próximo período.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/c6/Palacio_Universitario_de_la_UNAH.jpg",
  },
];

export default function CarrucelComponent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const intervalRef = useRef<number | null>(null);

  const next = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const replaceBrokenImage = useCallback(
    (image: HTMLImageElement) => {
      const fallbacks = [
        "https://picsum.photos/id/1018/1920/1080",
        "https://picsum.photos/id/1015/1920/1080",
        "https://picsum.photos/id/1019/1920/1080",
      ];

      image.src = fallbacks[currentSlide % fallbacks.length];
    },
    [currentSlide],
  );

  useEffect(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      if (autoplay) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 5000);

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [autoplay]);

  return (
    <section className="relative h-full min-h-[calc(100vh-64px)] w-full overflow-hidden">
      <style>{`
        .slide-content {
          transition: all 0.6s ease 0.3s;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>

      <div
        className="relative h-full min-h-[calc(100vh-64px)] w-full overflow-hidden"
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
      >
        <div className="relative h-full min-h-[calc(100vh-64px)] w-full">
          {slides.map((slide, index) => (
            <div
              key={slide.title}
              className={`absolute inset-0 transition-opacity duration-700 ${
                currentSlide === index
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-gray-800">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-full min-h-[calc(100vh-64px)] w-full object-cover opacity-80"
                  onError={(event) => replaceBrokenImage(event.currentTarget)}
                  loading="lazy"
                />
              </div>

              <div className="relative z-10 flex h-full min-h-[calc(100vh-64px)] w-full items-center px-10">
                <div
                  className={`max-w-2xl transform text-white slide-content transition-all duration-700 ${
                    currentSlide === index
                      ? "translate-x-0 opacity-100"
                      : "translate-x-10 opacity-0"
                  }`}
                >
                  <h2 className="mb-4 text-4xl font-bold md:text-5xl">
                    {slide.title}
                  </h2>

                  <p className="mb-8 text-xl md:text-2xl">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={prev}
            className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-all hover:bg-black/70 md:h-12 md:w-12"
            aria-label="Diapositiva anterior"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 md:h-6 md:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={next}
            className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-all hover:bg-black/70 md:h-12 md:w-12"
            aria-label="Siguiente diapositiva"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 md:h-6 md:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 space-x-2">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Ir a la diapositiva ${index + 1}`}
                className={`h-2 rounded-full transition-all md:h-3 ${
                  currentSlide === index
                    ? "w-4 bg-white md:w-6"
                    : "w-2 bg-white/50 md:w-3"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
