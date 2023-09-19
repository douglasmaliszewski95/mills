interface PostProps {
    title: string;
    data: string;
    text: string;
    image: string;
    portalImage?: string;
    link: string;
}

interface MillsNewsComponentProps {
    posts: PostProps[];
}

export {MillsNewsComponentProps, PostProps}

