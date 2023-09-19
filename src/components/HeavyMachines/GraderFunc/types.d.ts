interface SquareProps {
    src: string;
    title: string;
    id: number;
}

interface GraderFuncProps {
    title: string;
    description: string;
    squaresInfo: SquareProps[];
}

export {GraderFuncProps,SquareProps}