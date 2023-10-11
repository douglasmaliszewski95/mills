export const formatArrInOrder = (objectsList: any) => {
  objectsList.sort((a: { id: number }, b: { id: number }) => a.id - b.id);

  return objectsList;
};

export function uniqueArrayValues<T>(array: T[]): T[] {
  return array.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
}
