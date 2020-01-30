import { toArray } from './toArray';

export function concat<T>(args: Array<T> | T): (data: T | Array<T>) => Array<T> {
    return (item) => toArray(args).concat(item)
} 