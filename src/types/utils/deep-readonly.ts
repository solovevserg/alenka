
/**
 * Solution based on zenmumbler from GitHub 
 * @see https://stackoverflow.com/a/49670389/9582909
 */
type DeepReadonly<T> =
    T extends (infer R)[] ? DeepReadonlyArray<R> : // TODO: Handle tuples
    T extends Set<infer R> ? ReadonlySet<DeepReadonly<R>>  :
    T extends Map<infer TKey, infer TValue> ? ReadonlyMap<DeepReadonly<TKey>,DeepReadonly<TValue>>  :
    T extends Function ? T :
    T extends object ? DeepReadonlyObject<T> :
    T;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};