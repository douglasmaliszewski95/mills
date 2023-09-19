import _ from "lodash";

export const transformCMSArrayToObject = (
  arr: any[],
  param: string = "name"
) => {
  const formattedObj: { [key: string]: any } = {};

  arr?.forEach((item: any) => {
    if (!_.isEmpty(item)) {
      const element = item?.[param];
      formattedObj[element] = item;
    }
  });

  return formattedObj;
};
