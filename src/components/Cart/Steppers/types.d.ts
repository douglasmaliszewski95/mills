export type StepType = {
  step: number;
  text: string;
  active: true | false;
  activeMobile: true | false;
};

export type SteppersProps = {
  steps: StepType[];
};
