import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { type Question } from '../types/question';
import { ChartContainer, type ChartConfig } from './ui/chart';
import {
  MAX_VALUE_PER_QUESTION,
  QUESTIONS_LABELS,
  RESULT_DESCRIPTION,
} from '@/constants/questions';
import { BACKEND_URL, RESULT_HANDLER } from '@/constants/backend';
import { Label as InputLabel } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { useState, memo, useMemo, useCallback } from 'react';

interface QuizzResultProps {
  quizz: Question[];
}

const chartConfig = {
  result: {
    label: 'Resultat du quizz',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export const QuizzResult = memo(function QuizzResult({ quizz }: QuizzResultProps) {
  const [email, setUserEmail] = useState<string>('');

  const max = QUESTIONS_LABELS.length * MAX_VALUE_PER_QUESTION;
  const total = useMemo(() => quizz.reduce((a, b) => a + b.value, 0), [quizz]);
  const percent = useMemo(() => Math.round((total / max) * 100), [total, max]);

  const result = useMemo(() => RESULT_DESCRIPTION.find((result) => total <= result.score), [total]);
  const { isSuccess, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['save-result', total, email],
    queryFn: async () => {
      const response = await fetch(`${BACKEND_URL}${RESULT_HANDLER}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scoreTotal: total,
          email,
          answers: quizz,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la sauvegarde: ${response.statusText}`);
      }

      return response.json();
    },
    enabled: false,
    retry: 2,
  });

  const chartData = useMemo(
    () => [
      {
        result: percent,
        fill: 'var(--chart-2)',
      },
    ],
    [percent],
  );

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  }, []);

  const handleSaveResult = useCallback(() => {
    if (email.trim()) {
      refetch();
    }
  }, [email, refetch]);

  if (isLoading) {
    return (
      <div className="text-center text-xl font-semibold" role="status" aria-live="polite">
        Sauvegarde du résultat en cours...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-xl font-semibold text-red-600" role="alert">
        <p>Erreur lors de la sauvegarde: {error?.message}</p>
        <Button onClick={handleSaveResult} className="mt-4">
          Réessayer
        </Button>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <>
        <div className="text-center text-2xl font-semibold text-teal-700">
          Félicitations, vous avez terminé le quizz !
          <p>Votre score d'hypersensibilité est de : </p>
        </div>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={(360 * percent) / 100}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="result" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].result.toLocaleString()}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        ></tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
        <p className="text-2xl font-bold mb-16 text-teal-700">{result?.step}</p>
        <div>
          <p className="text-xl font-bold mb-2">{result?.profile}</p>
          <p className="mb-4 text-lg font-normal whitespace-pre-line">{result?.description}</p>
          <p className="mb-4 text-lg font-normal whitespace-pre-line"><strong>💡 Votre force,</strong> {result?.strength}</p>
          <p className="mb-4 text-lg font-normal whitespace-pre-line"><strong>⚖️ Votre défi,</strong> {result?.challenge}</p>
          <p className="text-lg font-normal whitespace-pre-line"><strong>🎯 Conseil de coach :</strong> {result?.advice}</p>
        </div>
      </>
    );
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-3 m-auto">
      <p className="mb-5 font-semibold text-xl">Il ne reste plus qu'une dernière étape &#128522;</p>
      <InputLabel htmlFor="email">Email</InputLabel>
      <Input
        type="email"
        id="email"
        placeholder="Entrez votre email pour connaitre votre résultat"
        value={email}
        onChange={handleEmailChange}
        required
        aria-describedby="email-help"
      />
      <p id="email-help" className="text-sm text-muted-foreground">
        Votre email sera utilisé uniquement pour vous envoyer vos résultats
      </p>
      <Button
        onClick={handleSaveResult}
        disabled={!email.trim()}
        aria-label="Sauvegarder et voir le résultat"
      >
        Voir mon résultat
      </Button>
    </div>
  );
});
