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
import { useState } from 'react';

type QuizzResultProps = {
  quizz: Question[];
};

const chartConfig = {
  result: {
    label: 'Resultat du quizz',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export function QuizzResult({ quizz }: QuizzResultProps) {
  const [email, setUserEmail] = useState<string>('');
  const max = QUESTIONS_LABELS.length * MAX_VALUE_PER_QUESTION;
  const total = quizz.reduce((a, b) => a + b.value, 0);
  const percent = Math.round((total / max) * 100);

  const { isSuccess, isLoading, refetch } = useQuery({
    queryKey: ['token'],
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
      return response.json();
    },
    enabled: false,
  });

  const chartData = [
    {
      result: percent,
      fill: 'var(--chart-2)',
    },
  ];
  const resultDescription = RESULT_DESCRIPTION.find((result) => total <= result.score);

  if (isLoading)
    return (
      <>
        <div className="text-center text-xl font-semibold">Sauvegarde du résultat en cours...</div>
      </>
    );

  if (isSuccess)
    return (
      <>
        <div className="text-center text-xl font-semibold">
          Félicitations, vous avez terminé le quizz !{' '}
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
        <p className="text-center text-2xl font-bold">{resultDescription?.description}</p>
      </>
    );

  return (
    <div className="grid w-full max-w-sm items-center gap-3 m-auto">
      <p className="mb-5 font-semibold text-xl">Il ne reste plus qu'une dernière étape &#128522;</p>
      <InputLabel htmlFor="email">Email</InputLabel>
      <Input
        type="email"
        id="email"
        placeholder="Entrez votre email pour connaitre votre résultat"
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <Button onClick={() => refetch()}>Voir mon résultat</Button>
    </div>
  );
}
