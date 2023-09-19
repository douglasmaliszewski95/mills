export const formatArrInOrder = (objectsList: any) => {
    objectsList.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);

    return objectsList;
  }

