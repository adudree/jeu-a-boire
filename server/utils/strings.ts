export const snakeToCamel = (str: string): string => str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
export const objectKeysToCamel = <T extends Record<string, any>>(obj: T): T => {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [snakeToCamel(key), value])
    ) as T;
};
