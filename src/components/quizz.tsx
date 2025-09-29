import { useState } from "react";
import { QuizzQuestion } from "./quizzQuestion";
import { type Question} from "../types/question";
import { QUESTIONS_LABLES, QUESSTIONS_PART } from "../constants/questions";
import { Button } from "./ui/button";

export function Quizz() {
  const [isQuizzFinished, setIsQuizzFinished] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizz, setQuizz] = useState<Question[]>([]);

  
  const currentQuestion: Question = {
    label: QUESTIONS_LABLES[questionIndex],
    value: quizz[questionIndex]?.value ?? undefined, 
  };

  const setValue = (value: number) => {
    const newQuizz = [...quizz];
    newQuizz[questionIndex] = { label: QUESTIONS_LABLES[questionIndex], value };
    setQuizz(newQuizz);
  };

  const nextQuestion = () => {
    if (questionIndex < QUESTIONS_LABLES.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }

  };

  const previousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  const finishQizz = () => {
    setIsQuizzFinished(true);
  }

  const resetQuizz = () => {
    setQuizz([]);
    setQuestionIndex(0);
    setIsQuizzFinished(false);
  }

  const currentPartLabel = (() => {
    const parts = Object.values(QUESSTIONS_PART).sort((a, b) => a.index - b.index);
    let label = parts[0]?.label ?? "";
    for (const part of parts) {
      if (questionIndex >= part.index) label = part.label;
    }
    return label;
  })();

  return (
    <div>
      {
        isQuizzFinished ? (
          <div>
            <p>Le resultat du quizz est : {quizz.reduce((a, b) => a + b.value, 0)}</p>
            <Button onClick={resetQuizz}>Recommencer le quizz</Button>
          </div>
        ) : (

          <>
            <div className="mb-4 text-center">
              <h2 className="text-3xl font-semibold text-muted-foreground">{currentPartLabel}</h2>
            </div>
            <QuizzQuestion
            question={currentQuestion}
            nextQuestion={nextQuestion}
            previousQuestion={previousQuestion}
            setValue={setValue}
            finishQizz={finishQizz}
            isFirstQuestion={questionIndex === 0}
            isLatestQuestion={questionIndex === QUESTIONS_LABLES.length - 1}
            />
          </>
        )
        
      }
      
    </div>
  );
}
