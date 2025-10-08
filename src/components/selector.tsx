// import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';

const answers = [
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
];

type SelectorProps = {
  value: number;
  onChange: (value: number) => void;
};

export function Selector({ value, onChange }: SelectorProps) {
  return (
    <RadioGroupPrimitive.Root
      value={`${value}`}
      className="w-full grid grid-cols-5 gap-2 sm:gap-4 sm:p-4"
    >
      {answers.map((option) => (
        <RadioGroupPrimitive.Item
          key={option.value}
          value={option.value}
          className={`ring-[1px] ring-border rounded py-1 sm:px-3 data-[state=checked]:ring-3 data-[state=checked]:ring-black data-[state=checked]:shadow-lg data-[state=checked]:brightness-180 ${option.color} text-white transition-all duration-200`}
          onClick={() => onChange(parseInt(option.value))}
        >
          <span className="font-semibold tracking-tight text-xs sm:text-base">{option.label}</span>
        </RadioGroupPrimitive.Item>
      ))}
    </RadioGroupPrimitive.Root>
  );
}
