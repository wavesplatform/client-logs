export const toHash = <T extends string>(
    array: Array<T>
): Record<T, boolean> => {
    return array.reduce((acc, item) => {
        acc[item] = true;
    }, Object.create(null));
};
