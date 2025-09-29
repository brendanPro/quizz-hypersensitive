import { useState } from "react";
import { QuizzQuestion } from "./quizzQuestion";
import { type Question} from "../types/question";
import { QUESTIONS_LABLES } from "../constants/questions";

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


  return (
    <div>
      {
        isQuizzFinished ? (
          <div>
            <p>Le resultat du quizz est : {quizz.reduce((a, b) => a + b.value, 0)}</p>
          </div>
        ) : (
          <QuizzQuestion
            question={currentQuestion}
            nextQuestion={nextQuestion}
            previousQuestion={previousQuestion}
            setValue={setValue}
            finishQizz={finishQizz}
            isFirstQuestion={questionIndex === 0}
            isLatestQuestion={questionIndex === QUESTIONS_LABLES.length - 1}
          />
        )
        
      }
      
    </div>
  );
}
