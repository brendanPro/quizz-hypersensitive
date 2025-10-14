import { useState, memo, useCallback } from 'react';
import { Selector } from './selector';
import { Button } from './ui/button';
import { type Question } from '../types/question';

interface QuestionProps {
  question: Question;
  setValue: (value: number) => void;
  nextQuestion: () => void;
  previousQuestion?: () => void;
  finishQizz?: () => void;
  isLatestQuestion?: boolean;
  isFirstQuestion?: boolean;
  isAnimating?: boolean;
}

export const QuizzQuestion = memo(function QuizzQuestion({
  question,
  setValue,
  nextQuestion,
  previousQuestion,
  finishQizz,
  isFirstQuestion,
  isLatestQuestion,
  isAnimating = false,
}: QuestionProps) {
  const handleNextQuestion = useCallback(() => {
    nextQuestion();
  }, [nextQuestion]);

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="relative overflow-hidden mb-6">
        <p
          className={`sm:text-lg text-base font-medium leading-relaxed text-balance break-words sm:threeline-clamp sm:threeline-height fiveline-clamp fiveline-height transition-transform duration-500 ease-in-out ${
            isAnimating
              ? 'transform -translate-x-full opacity-0'
              : 'transform translate-x-0 opacity-100'
          }`}
          role="heading"
          aria-level={3}
        >
          {question.label}
        </p>
      </div>
      <div className="mb-6">
        <Selector onChange={setValue} value={question.value} />
      </div>
      <Button
        onClick={previousQuestion}
        disabled={isFirstQuestion}
        className="m-4"
        aria-label="Question précédente"
      >
        Précédent
      </Button>
      {isLatestQuestion ? (
        <Button
          onClick={finishQizz}
          disabled={question.value === undefined}
          aria-label="Terminer le quiz et voir le résultat"
        >
          Voir mon résultat
        </Button>
      ) : (
        <Button
          onClick={handleNextQuestion}
          disabled={question.value === undefined}
          aria-label="Question suivante"
        >
          Suivant
        </Button>
      )}
    </div>
  );
});
