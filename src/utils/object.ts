export const indexate = <T>(key: keyof T, items: T[]): Record<string, T> => {
  const indexated = items.reduce((acc, item) => {
    acc[String(item[key])] = item;
    return acc;
  }, {} as Record<string, T>);
  return indexated;
};

export const groupBy = <T extends object>(items: T[], grouper: keyof T) => (
  items.reduce((acc, item) => {
    const group = item[grouper];
    acc.set(group, [...(acc.get(group) || []), item]);
    return acc;
  }, new Map<T[keyof T], T[]>())
);
