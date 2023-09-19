import { SectionProps } from "./types";

export const Section: React.FC<SectionProps> = (props) => {
  const {
    children,
    blur = "",
    sectionClass = "",
    containerClass = "",
    backgroundImage = "",
    backgroundLines,
  } = props;

  return (
    <section
      className={`flex justify-center ${sectionClass} ${
        backgroundImage && "bg-cover bg-no-repeat relative"
      }`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {backgroundLines && (
        <div
          className={`w-full h-full absolute bg-no-repeat bg-auto bg-right-top`}
          style={{ backgroundImage: `url(${backgroundLines.src})` }}
        ></div>
      )}
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
