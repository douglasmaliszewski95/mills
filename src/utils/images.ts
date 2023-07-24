export const getImageSrc = (image: any) => {
  return image?.fields.native.links[0].href || "";
};

export const getMobileImageName = (name: string) => {
  return "m" + name.substring(1, name.length);
};
