interface Stories {
  id: string;
  image: string;
  name: string;
  occupation: string;
  article: string;
  alt: string;
}

export interface SuccessStoriesProps {
  stories: Stories[] | undefined;
  successHistoryTexts: {
    buttonText: string;
    hrefButton: string;
    text: string;
    title: string;
  };
  theme?: "rentalLight" | "rentalHeavy";
}
