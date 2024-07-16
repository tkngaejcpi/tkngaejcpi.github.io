import type { Operator } from '@models/Logic';

export function pipe<A>(a: A): A;
export function pipe<A, B>(a: A, fab: (a: A) => B): B;
export function pipe<A, B, C>(a: A, fab: (a: A) => B, fbc: (b: B) => C): C;
export function pipe<A, B, C, D>(
  a: A,
  fab: (a: A) => B,
  fbc: (b: B) => C,
  fcd: (c: C) => D,
): D;
export function pipe<A, B, C, D, E>(
  a: A,
  fab: (a: A) => B,
  fbc: (b: B) => C,
  fcd: (c: C) => D,
  fde: (d: D) => E,
): E;
export function pipe<A, B, C, D, E, F>(
  a: A,
  fab: (a: A) => B,
  fbc: (b: B) => C,
  fcd: (c: C) => D,
  fde: (d: D) => E,
  fef: (e: E) => F,
): E;

export function pipe(value: unknown, ...fns: Function[]) {
  return fns.reduce((acc, fn) => fn(acc), value);
}

/**
 * @description add a pre hook to a function before calling it
 */
export function preHook<A, B>(
  opr: Operator<A>,
): (fn: (a: A) => B) => (a: A) => B {
  return function (fn) {
    return function (a: A) {
      return pipe(a, opr, fn);
    };
  };
}

/**
 * @description add a post hook to a function before returning the result
 */
export function postHook<A, B>(
  opr: Operator<B>,
): (fn: (a: A) => B) => (a: A) => B {
  return function (fn) {
    return function (a: A) {
      return pipe(a, fn, opr);
    };
  };
}
