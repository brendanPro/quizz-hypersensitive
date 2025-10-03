import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { type Question } from '../types/question';
import { ChartContainer, type ChartConfig } from './ui/chart';
import {
  MAX_VALUE_PER_QUESTION,
  QUESTIONS_LABELS,
  RESULT_DESCRIPTION,
} from '@/constants/questions';

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
  const max = QUESTIONS_LABELS.length * MAX_VALUE_PER_QUESTION;
  const total = quizz.reduce((a, b) => a + b.value, 0);
  const percent = Math.round((total / max) * 100);
  const chartData = [
    {
      result: percent,
      fill: 'var(--chart-2)',
    },
  ];
  const resultDescription = RESULT_DESCRIPTION.find((result) => total <= result.score);

  return (
    <>
      <div className="text-center">
        Féliciation, vous avez fini le quizz!
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
      <p className="text-center">{resultDescription?.description}</p>
    </>
  );
}
