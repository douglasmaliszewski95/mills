import Image from "next/image";
import { PostCardProps } from "./types";
import Button from "@/components/shared/Button/Button";

export const PostCard: React.FC<PostCardProps> = (props) => {
  const { image, alt, category, title, date } = props;

  return (
    <div className="flex flex-col max-w-[256px] mx-2 tablet:mx-4 tablet:max-w-[300px]">
      <Image src={image} alt={alt} className="w-full rounded-t-md" />
      <div className="min-h-[160px] flex flex-col justify-between bg-white px-2 pt-2 pb-3 gap-1 rounded-b-md">
        <div>
          <p className="text-orange-500 text-xs mb-1">{category}</p>
          <p className="text-orange-500 font-semibold text-sm leading-5 mb-1">
            {title}
          </p>
          <p className="text-xs text-orange-500">
            <i>{date}</i>
          </p>
        </div>
        <Button variant="outlined" size="full">
          Leia mais
        </Button>
      </div>
    </div>
  );
};
