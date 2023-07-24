import { getCredentialsOCC } from "./getCredentialsOCC";

export const getImageOCC = async (src: string) => {
  try {
    const url = `/api/imageOCC?src=${src}`;
    const response = await fetch(url);

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    return null;
  }
};
