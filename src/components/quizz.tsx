import { useState, useCallback, useMemo, memo } from 'react';
import { QuizzQuestion } from './quizzQuestion';
import { type Question } from '../types/question';
import { QUESTIONS_LABELS, QUESSTIONS_PART } from '../constants/questions';
import { Button } from './ui/button';
import { QuizzResult } from './quizzResult';

export const Quizz = memo(function Quizz() {
  const [isQuizzFinished, setIsQuizzFinished] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizz, setQuizz] = useState<Question[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentQuestion: Question = useMemo(
    () => ({
      label: QUESTIONS_LABELS[questionIndex],
      value: quizz[questionIndex]?.value ?? undefined,
    }),
    [questionIndex, quizz],
  );

  const setValue = useCallback(
    (value: number) => {
      setQuizz((prevQuizz) => {
        const newQuizz = [...prevQuizz];
        newQuizz[questionIndex] = { label: QUESTIONS_LABELS[questionIndex], value };
        return newQuizz;
      });
    },
    [questionIndex],
  );

  const nextQuestion = useCallback(() => {
    if (questionIndex < QUESTIONS_LABELS.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setQuestionIndex((prevIndex) => prevIndex + 1);
        setIsAnimating(false);
      }, 250);
    }
  }, [questionIndex]);

  const previousQuestion = useCallback(() => {
    if (questionIndex > 0) {
      setQuestionIndex((prevIndex) => prevIndex - 1);
    }
  }, [questionIndex]);

  const finishQizz = useCallback(() => {
    setIsQuizzFinished(true);
  }, []);

  const resetQuizz = useCallback(() => {
    setQuizz([]);
    setQuestionIndex(0);
    setIsQuizzFinished(false);
  }, []);

  const currentPartLabel = useMemo(() => {
    const parts = Object.values(QUESSTIONS_PART).sort((a, b) => a.index - b.index);
    let label = parts[0]?.label ?? '';
    for (const part of parts) {
      if (questionIndex >= part.index) label = part.label;
    }
    return label;
  }, [questionIndex]);

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
        <h2 className="text-2xl sm:text-3xl font-semibold text-muted-foreground">
          {currentPartLabel}
        </h2>
      </div>

      <div key={`question-${currentPartLabel}`} className="fade-in-delay mt-4">
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
});
