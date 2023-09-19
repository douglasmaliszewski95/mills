import { Section } from "@/components/shared/Section/Section";
import Image from "next/image";
import leftArrow from "@/assets/large-orange-chevron-left.svg";
import rightArrow from "@/assets/large-orange-chevron-right.svg";

export const Pagination = ({
  postsPerPage,
  totalPosts,
  currentPage,
  nextPage,
  returnPage,
}: any) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <Section containerClass="flex items-center justify-center pb-8">
      <div className="flex flex-row">
        <button onClick={() => returnPage()}>
          <Image
            alt="seta pra esquerda"
            src={leftArrow}
            width={9}
            height={8}
            className="mx-2"
          />
        </button>
        <p className="text-xs text-green-800 font-normal">
          {currentPage} de {pageNumber.length}
        </p>
        <button onClick={() => nextPage()}>
          <Image
            alt="seta pra esquerda"
            src={rightArrow}
            width={9}
            height={8}
            className="mx-2"
          />
        </button>
      </div>
    </Section>
  );
};
