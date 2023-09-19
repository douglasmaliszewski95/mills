export interface ListProps {
  question: string;
  url?: string;
  href?: string;
}

export interface FrequentQuestionsProps {
  frequentQuestions: {
    title?: string;
    text?: string;
    questions_fields?: ListProps[];
  };
}
