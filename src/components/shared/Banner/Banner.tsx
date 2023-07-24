import Link from "next/link";
import { BannerProps } from "./types";

export const Banner: React.FC<BannerProps> = (props) => {
  const { breadcrumb, title, backgroundImage, blur = "", linkList } = props;
  return (
    <section className="flex justify-center text-white">
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
        className="flex bg-no-repeat bg-cover w-full tablet:flex-col tablet:py-0"
      >
        <div className="flex justify-center items-center flex-col bg-black/60 w-full h-60 tablet:h-40">
          <div className="container justify-start tablet:flex-col tablet:px-4">
            <ul className="flex gap-1 text-white mb-4 tablet:mb-6">
              {linkList?.map((link: any, index: number) => (
                <li key={link.name} className="flex gap-1 tablet:text-[10px]">
                  <Link href="#">{link?.name}</Link>
                  {index < linkList.length - 1 && <p> {">"} </p>}
                </li>
              ))}
            </ul>
            <h1 className="text-white text-4xl font-bold tablet:text-base tablet:font-semibold tablet:text-lg">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};
