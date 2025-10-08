export type Result = {
  id: string;
  createdAt: Date;
  email: string;
  scoreTotal: number;
  answers: Array<{ label: string; value: number }>;
};
