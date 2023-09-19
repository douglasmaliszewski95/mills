export default function DynamicSection({
  leftComponent,
  rightComponent,
  paddingTop = "",
  paddingBottom = "",
  backgroundColor = "",
  backgroundImage,
  backgroundImageSrc,
  backgroundStyle = "",
  customStyles = "",
  customDivStyles = "",
}: any) {
  return (
    <section
      style={{
        backgroundImage: `url(${backgroundImage ?? backgroundImageSrc?.src})`,
      }}
      className={`flex justify-center font-ibm-font tablet:py-6 ${paddingTop} ${paddingBottom} ${backgroundColor} ${backgroundStyle} ${customStyles}`}
    >
      <div
        className={`flex justify-between container tablet:flex-col ${customDivStyles}`}
      >
        {leftComponent}
        {rightComponent}
      </div>
    </section>
  );
}
