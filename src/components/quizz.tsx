import { useState } from 'react';
import { QuizzQuestion } from './quizzQuestion';
import { type Question } from '../types/question';
import { QUESTIONS_LABELS, QUESSTIONS_PART } from '../constants/questions';
import { Button } from './ui/button';
import { QuizzResult } from './quizzResult';

export function Quizz() {
  const [isQuizzFinished, setIsQuizzFinished] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizz, setQuizz] = useState<Question[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentQuestion: Question = {
    label: QUESTIONS_LABELS[questionIndex],
    value: quizz[questionIndex]?.value ?? undefined,
  };

  const setValue = (value: number) => {
    const newQuizz = [...quizz];
    newQuizz[questionIndex] = { label: QUESTIONS_LABELS[questionIndex], value };
    setQuizz(newQuizz);
  };

  const nextQuestion = () => {
    if (questionIndex < QUESTIONS_LABELS.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setQuestionIndex(questionIndex + 1);
        setIsAnimating(false);
      }, 250);
    }
  };

  const previousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  const finishQizz = () => {
    setIsQuizzFinished(true);
  };

  const resetQuizz = () => {
    setQuizz([]);
    setQuestionIndex(0);
    setIsQuizzFinished(false);
  };

  const currentPartLabel = (() => {
    const parts = Object.values(QUESSTIONS_PART).sort((a, b) => a.index - b.index);
    let label = parts[0]?.label ?? '';
    for (const part of parts) {
      if (questionIndex >= part.index) label = part.label;
    }
    return label;
  })();

  if (isQuizzFinished) {
    return (
      <>
        <QuizzResult quizz={quizz} />
        {/* <Button onClick={resetQuizz}>Recommencer le quizz</Button> */}
      </>
    );
  }

  return (
    <>
      <div key={`part-${currentPartLabel}`} className="mb-4 text-center fade-in">
        <h2 className="text-3xl font-semibold text-muted-foreground">{currentPartLabel}</h2>
      </div>

      <div key={`question-${currentPartLabel}`} className="fade-in-delay">
        <QuizzQuestion
          question={currentQuestion}
          nextQuestion={nextQuestion}
          previousQuestion={previousQuestion}
          setValue={setValue}
          finishQizz={finishQizz}
          isFirstQuestion={questionIndex === 0}
          isLatestQuestion={questionIndex === QUESTIONS_LABELS.length - 1}
          isAnimating={isAnimating}
        />
      </div>
    </>
  );
}
