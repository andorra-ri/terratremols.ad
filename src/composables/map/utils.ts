export const parse = (input: unknown): unknown => {
  if (Array.isArray(input)) return input.map(parse);
  if (input === null) return null;
  if (typeof input === 'object') {
    return Object.entries(input).reduce((acc, [key, value]) => {
      acc[key] = parse(value);
      return acc;
    }, {} as Record<string, unknown>);
  }
  if (typeof input !== 'string') return input;
  try {
    return JSON.parse(input);
  } catch (error) {
    return input;
  }
};
