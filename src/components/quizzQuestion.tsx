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
    <div>
      <p>{question.label}</p>
      <Selector onChange={setValue} value={question.value}/>
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