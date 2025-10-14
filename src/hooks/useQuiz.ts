import { useState, useCallback, useMemo } from 'react';
import { type Question } from '../types/question';
import { QUESTIONS_LABELS } from '../constants/questions';

export interface UseQuizReturn {
  // State
  isQuizFinished: boolean;
  questionIndex: number;
  quiz: Question[];
  isAnimating: boolean;

  // Actions
  setValue: (value: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  finishQuiz: () => void;
  resetQuiz: () => void;

  // Computed values
  currentQuestion: Question;
  isFirstQuestion: boolean;
  isLatestQuestion: boolean;
  progress: number;
}

export function useQuiz(): UseQuizReturn {
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentQuestion: Question = useMemo(
    () => ({
      label: QUESTIONS_LABELS[questionIndex],
      value: quiz[questionIndex]?.value ?? undefined,
    }),
    [questionIndex, quiz],
  );

  const isFirstQuestion = useMemo(() => questionIndex === 0, [questionIndex]);
  const isLatestQuestion = useMemo(
    () => questionIndex === QUESTIONS_LABELS.length - 1,
    [questionIndex],
  );
  const progress = useMemo(
    () => Math.round(((questionIndex + 1) / QUESTIONS_LABELS.length) * 100),
    [questionIndex],
  );

  const setValue = useCallback(
    (value: number) => {
      setQuiz((prevQuiz) => {
        const newQuiz = [...prevQuiz];
        newQuiz[questionIndex] = { label: QUESTIONS_LABELS[questionIndex], value };
        return newQuiz;
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

  const finishQuiz = useCallback(() => {
    setIsQuizFinished(true);
  }, []);

  const resetQuiz = useCallback(() => {
    setQuiz([]);
    setQuestionIndex(0);
    setIsQuizFinished(false);
  }, []);

  return {
    // State
    isQuizFinished,
    questionIndex,
    quiz,
    isAnimating,

    // Actions
    setValue,
    nextQuestion,
    previousQuestion,
    finishQuiz,
    resetQuiz,

    // Computed values
    currentQuestion,
    isFirstQuestion,
    isLatestQuestion,
    progress,
  };
}
