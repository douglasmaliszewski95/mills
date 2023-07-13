import { SectionProps } from "./types";

export const Section: React.FC<SectionProps> = (props) => {
  const {
    children,
    blur = "",
    sectionClass = "",
    containerClass = "",
    backgroundImage = "",
  } = props;

  return (
    <section
      className={`flex justify-center ${sectionClass} ${
        backgroundImage && "bg-cover bg-no-repeat"
      }`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className={`${
          blur ? "w-full flex justify-center" : "container"
        } ${containerClass} ${blur}`}
      >
        {blur ? <div className="container">{children}</div> : children}
      </div>
    </section>
  );
};
