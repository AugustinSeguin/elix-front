import { useMemo, useState, useEffect } from "react";
import type { PointerEvent } from "react";
import { QuestionDto } from "../../types/quiz";
import { getCategoryColor } from "../../helpers/categoryHelper";

interface TrueFalseQuestionProps {
  question: QuestionDto;
  selectedAnswerId?: number;
  onAnswerSelect: (answerId: number) => void;
  onAutoNext?: () => void;
}

const SWIPE_THRESHOLD = 100;

const TrueFalseQuestion = ({
  question,
  onAnswerSelect,
  onAutoNext,
}: TrueFalseQuestionProps) => {
  const categoryTitle = (() => {
    try {
      const cached = localStorage.getItem("categories");
      if (!cached) return undefined;
      const categories = JSON.parse(cached) as Array<{
        id: number;
        title?: string;
      }>;
      return categories.find((category) => category.id === question.categoryId)
        ?.title;
    } catch {
      return undefined;
    }
  })();

  const categoryColor = getCategoryColor(categoryTitle);

  const answers = question.answers || [];
  // On suppose que l'index 0 est "Vrai" (droite) et index 1 est "Faux" (gauche)
  const rightAnswer =
    answers.find((a) => a.title!.toLowerCase().includes("vrai")) || answers[0];
  const leftAnswer =
    answers.find((a) => a.title!.toLowerCase().includes("faux")) || answers[1];

  const [startX, setStartX] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [exitX, setExitX] = useState(0); // Pour l'animation de sortie

  // Réinitialiser la position quand la question change
  useEffect(() => {
    setDragX(0);
    setExitX(0);
  }, [question.id]);

  const rotation = useMemo(() => dragX / 10, [dragX]);
  const opacity = useMemo(() => Math.min(Math.abs(dragX) / 150, 0.8), [dragX]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (exitX !== 0) return;
    setIsDragging(true);
    setStartX(event.clientX);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setDragX(event.clientX - startX);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragX > SWIPE_THRESHOLD) {
      exitCard("right");
    } else if (dragX < -SWIPE_THRESHOLD) {
      exitCard("left");
    } else {
      setDragX(0);
    }
  };

  const exitCard = (direction: "left" | "right") => {
    const finalX = direction === "right" ? 1000 : -1000;
    setExitX(finalX);

    // Attendre la fin de l'animation avant de déclencher la suite
    setTimeout(() => {
      const answer = direction === "right" ? rightAnswer : leftAnswer;
      if (answer) {
        onAnswerSelect(answer.id);
      }
      onAutoNext?.();
    }, 250);
  };

  return (
    <div className="flex flex-col items-center gap-8 px-4 py-6 overflow-hidden">
      <div className="relative w-full aspect-[3/4] max-w-[320px]">
        {/* Feedback Visuel (Overlay sur la carte) */}
        {dragX !== 0 && (
          <div
            className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center rounded-[32px]"
            style={{
              backgroundColor:
                dragX > 0 ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)",
              opacity: opacity,
            }}
          >
            <span className="text-7xl font-bold text-white shadow-sm">
              {dragX > 0 ? "✓" : "✕"}
            </span>
          </div>
        )}

        {/* La Carte Tinder */}
        <div
          className="w-full h-full rounded-[32px] shadow-2xl touch-none select-none flex flex-col items-center justify-center p-8 text-center"
          style={{
            backgroundColor: categoryColor,
            transform:
              exitX !== 0
                ? `translateX(${exitX}px) rotate(${exitX / 10}deg)`
                : `translateX(${dragX}px) rotate(${rotation}deg)`,
            transition: isDragging
              ? "none"
              : "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            cursor: isDragging ? "grabbing" : "grab",
            transformOrigin: "bottom center", // Pivot style Tinder
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            setIsDragging(false);
            setDragX(0);
          }}
        >
          <h2 className="text-white text-2xl font-bold leading-tight">
            {question.title}
          </h2>

          <div className="absolute bottom-10 text-white/80 font-medium tracking-widest uppercase text-sm">
            Vrai ou Faux ?
          </div>
        </div>
      </div>

      {/* Boutons de secours (Maquette) */}
      <div className="flex w-full max-w-[320px] justify-between items-center mt-4">
        <button
          onClick={() => exitCard("left")}
          className="w-16 h-16 flex items-center justify-center rounded-full border-4 border-red-500 bg-white text-red-500 text-3xl font-bold hover:bg-red-50 transition-transform active:scale-90"
        >
          ✕
        </button>

        <button
          onClick={() => exitCard("right")}
          className="w-16 h-16 flex items-center justify-center rounded-full border-4 border-green-500 bg-white text-green-500 text-3xl font-bold hover:bg-green-50 transition-transform active:scale-90"
        >
          ✓
        </button>
      </div>

      <p className="text-gray-400 text-sm italic">
        Glisse la carte pour répondre
      </p>
    </div>
  );
};

export default TrueFalseQuestion;
