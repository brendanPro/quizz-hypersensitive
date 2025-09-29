import { useState } from "react";
import { Selector } from "./selector";
import { Button } from "./ui/button";
import { type Question } from "../types/question";
type QuestionProps = {
  question: Question;
  setValue?: (value: number) => void;
  nextQuestion?: () => void;
  previousQuestion?: () => void;
  finishQizz?: () => void;
  isLatestQuestion?: boolean;
  isFirstQuestion?: boolean;
}
export function QuizzQuestion({ question, setValue, nextQuestion , previousQuestion, finishQizz, isFirstQuestion, isLatestQuestion}: QuestionProps) {
  const handleNextQuestion = () => {
    nextQuestion();
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
      <p className="text-lg font-medium leading-relaxed text-balance break-words mb-6 twoline-clamp twoline-height">{question.label}</p>
      <div className="mb-6">
        <Selector onChange={setValue} value={question.value}/>
      </div>
      <Button onClick={previousQuestion} disabled={isFirstQuestion} className="m-4">Précédent</Button>
      {
        isLatestQuestion ? (
          <Button onClick={finishQizz} disabled={question.value === undefined}>Voir le resultat</Button>
        ) : (
          <Button onClick={handleNextQuestion} disabled={question.value === undefined}>Suivant</Button>
        )
      }
      
      
    </div>
  );
}