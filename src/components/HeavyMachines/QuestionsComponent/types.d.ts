interface QuestionsAndAnswersProps {
  answear: string;
  question: string;
  id: number;
}

interface QuestionsComponentProps {
  questionsList: QuestionsAndAnswers[];
}

export { QuestionsAndAnswersProps, QuestionsComponentProps };
