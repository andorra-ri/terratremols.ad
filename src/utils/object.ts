export const indexate = <T>(key: keyof T, items: T[]): Record<string, T> => {
  const indexated = items.reduce((acc, item) => {
    acc[String(item[key])] = item;
    return acc;
  }, {} as Record<string, T>);
  return indexated;
};
