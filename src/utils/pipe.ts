interface Pipe {
    <A>(a: A): A;
    <A, B>(a: A, fab: (a: A) => B): B;
    <A, B, C>(a: A, fab: (a: A) => B, fbc: (b: B) => C): C;
    <A, B, C, D>(a: A, fab: (a: A) => B, fbc: (b: B) => C, fcd: (c: C) => D): D;
}

export const pipe: Pipe = <A>(init: A, ...fns: Function[]) => fns.reduce((acc, fn) => fn(acc), init);