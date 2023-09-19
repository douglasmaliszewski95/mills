export interface AboutWithButtonProps {
    title: string;
    description: string;
    src: string;
    btnText?: string;
    orientation?: string;
    theme?: string;
    type?: 'singleBtn' | 'multipleBtns';
    multipleBtns?: string[];
    link?: string;
}

