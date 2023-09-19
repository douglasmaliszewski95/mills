interface SmallLoaderCarouselComponentProps {
  image: string;
  titulo: string;
  text: string;
  id: string;
}

interface SmallLoaderFuncProps {
  title: string;
  carouselComp: SmallLoaderCarouselComponentProps[];
}

export { SmallLoaderCarouselComponentProps, SmallLoaderFuncProps };
