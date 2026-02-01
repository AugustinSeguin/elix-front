import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FaqItem } from "../../types/faq";
import Button from "../../components/button/Button";

const Faq = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<FaqItem[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    fetch("/faq.json")
      .then((res) => res.json())
      .then((data) => setQuestions(data.questions))
      .catch((err) => console.error("Error loading FAQ:", err));
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="relative flex items-center justify-center h-[60px] border-b border-gray-200 px-4 z-10 shadow-sm">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          size="sm"
          className="absolute left-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <MdArrowBackIosNew className="w-5 h-5 text-black" />
        </Button>
        <h1 className="text-lg font-bold tracking-widest text-black uppercase">
          FAQ
        </h1>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6 pb-24 flex flex-col items-center">
        <div className="w-full max-w-md border border-gray-200 rounded-lg p-5 shadow-sm">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="w-full border-b border-gray-200 py-5">
                <div
                  className="flex justify-between items-start cursor-pointer gap-4"
                  onClick={() => toggleItem(index)}
                >
                  <h3 className="text-[15px] font-bold text-black text-left flex-1 leading-tight">
                    {item.question}
                  </h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-primary flex-shrink-0 mt-0.5 p-0"
                  >
                    {isOpen ? (
                      <AiOutlineMinus className="w-5 h-5" />
                    ) : (
                      <AiOutlinePlus className="w-5 h-5" />
                    )}
                  </Button>
                </div>

                {isOpen && (
                  <div className="mt-3 text-[13px] text-black text-left whitespace-pre-line leading-relaxed pl-1">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Faq;
