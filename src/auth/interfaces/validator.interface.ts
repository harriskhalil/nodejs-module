export interface Validator<T = any, TResult = boolean> {
  validate(input: T): TResult | Promise<TResult>;
}
