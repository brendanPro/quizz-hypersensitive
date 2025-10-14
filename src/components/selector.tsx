import { memo, useCallback } from 'react';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';

const ANSWERS = [
  {
    label: 'Jamais',
    value: '0',
    color: 'bg-(--bg-color-0)',
  },
  {
    label: 'Rarement',
    value: '1',
    color: 'bg-(--bg-color-1)',
  },
  {
    label: 'Parfois',
    value: '2',
    color: 'bg-(--bg-color-2)',
  },
  {
    label: 'Souvent',
    value: '3',
    color: 'bg-(--bg-color-3)',
  },
  {
    label: 'Toujours',
    value: '4',
    color: 'bg-(--bg-color-4)',
  },
] as const;

interface SelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export const Selector = memo(function Selector({ value, onChange }: SelectorProps) {
  const handleOptionClick = useCallback(
    (optionValue: string) => {
      onChange(parseInt(optionValue));
    },
    [onChange],
  );
  return (
    <RadioGroupPrimitive.Root
      value={`${value}`}
      className="w-full grid grid-cols-5 gap-2 sm:gap-4 sm:p-4"
      role="radiogroup"
      aria-label="Sélectionnez votre réponse"
    >
      {ANSWERS.map((option) => (
        <RadioGroupPrimitive.Item
          key={option.value}
          value={option.value}
          className={`ring-[1px] ring-border rounded py-1 sm:px-3 data-[state=checked]:ring-3 data-[state=checked]:ring-black data-[state=checked]:shadow-lg data-[state=checked]:brightness-180 ${option.color} text-white transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
          onClick={() => handleOptionClick(option.value)}
          aria-label={option.label}
        >
          <span className="font-semibold tracking-tight text-xs sm:text-base">{option.label}</span>
        </RadioGroupPrimitive.Item>
      ))}
    </RadioGroupPrimitive.Root>
  );
});
