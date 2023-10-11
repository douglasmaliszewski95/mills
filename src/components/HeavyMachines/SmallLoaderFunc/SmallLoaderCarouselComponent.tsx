import { SmallLoaderCarouselComponentProps } from "./types"

export const SmallLoaderCarouselComponent: React.FC<SmallLoaderCarouselComponentProps> = (props) => {
    const {image, text, titulo} = props;
    return (
        <div className="flex flex-col gap-4 items-center justify-center text-green-800 mt-10 desktop:h-[250px]">
            <img src={image} width={42} height={42} />
            <h3 className="tablet:text-sm text-lg font-semibold">{titulo}</h3>
            <p className="text-base font-normal tablet:text-xs w-[70%] text-center">{text}</p>
        </div>
    )
}