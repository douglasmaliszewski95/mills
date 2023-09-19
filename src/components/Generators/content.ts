import { getImage } from "@/services/hooks/getImage";
import { getText } from "@/services/hooks/getText";

export const getCMSText: any = async (param: string) => getText(param);
export const getCMSContent = async (param: string) => getImage(param);
