/**
 * Deeply makes all properties of an object optional
 * @example
 * type Foo = {
 *   a: string;
 *   b: {
 *     c: string;
 *   };
 * };
 * type Bar = DeepPartial<Foo>;
 * Bar is now
 * {
 *  a?: string;
 *  b?: {
 *    c?: string;
 *  };
 * }
 * @see https://stackoverflow.com/a/51365037/1047334
 * @see https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype
 */
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Deeply makes all properties of an object required
 * @example
 * type Foo = {
 *   a?: string;
 *   b?: {
 *     c?: string;
 *   };
 * };
 * type Bar = DeepRequired<Foo>;
 * Bar is now
 * {
 *   a: string;
 *   b: {
 *     c: string;
 *   };
 * }
 * @see https://stackoverflow.com/a/51365037/1047334
 * @see https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype
 */
export type DeepRequired<T> = {
    [P in keyof T]: T[P] extends object ? DeepRequired<T[P]> : T[P];
};
