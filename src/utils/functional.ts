type Fn<A, B> = (_: A) => B;
export type Opr<A> = Fn<A, A>;

interface Pipe {
	<A>(a: A): A;
	<A, B>(a: A, ab: Fn<A, B>): B;
	<A, B, C>(a: A, ab: Fn<A, B>, bc: Fn<B, C>): C;
	<A, B, C, D>(a: A, ab: Fn<A, B>, bc: Fn<B, C>, cd: Fn<C, D>): D;
	<A, B, C, D, E>(
		a: A,
		ab: Fn<A, B>,
		bc: Fn<B, C>,
		cd: Fn<C, D>,
		de: Fn<D, E>,
	): E;
	<A, B, C, D, E, F>(
		a: A,
		ab: Fn<A, B>,
		bc: Fn<B, C>,
		cd: Fn<C, D>,
		de: Fn<D, E>,
		ef: Fn<E, F>,
	): F;
	<A, B, C, D, E, F, G>(
		a: A,
		ab: Fn<A, B>,
		bc: Fn<B, C>,
		cd: Fn<C, D>,
		de: Fn<D, E>,
		ef: Fn<E, F>,
		fg: Fn<F, G>,
	): G;
}

export const pipe: Pipe = (x: unknown, ...fns: Fn<unknown, unknown>[]) =>
	fns.reduce((prev, fn) => fn(prev), x);

export const map: <A, B>(fn: Fn<A, B>) => Fn<A[], B[]> = (fn) => (a) =>
	a.map(fn);

export const filter: <A>(fn: Fn<A, boolean>) => Opr<A[]> = (fn) => (a) =>
	a.filter(fn);

/**
 * @param fn a function to determine if two element is equal
 * @returns a list with only unique element
 */
export const unique: <A>(fn: (_: A, __: A) => boolean) => Opr<A[]> =
	(fn) => (lst) => {
		if (lst.length == 1) return lst;

		const x = lst[0];
		const xs = lst.slice(1);

		return xs.filter((y) => fn(y, x)).length == 0
			? [x, ...unique(fn)(xs)]
			: unique(fn)(xs);
	};

export const mergeOprs: <T>(...oprs: Opr<T>[]) => Opr<T> = (...oprs) => {
	if (oprs.length == 1) {
		return oprs[0];
	}

	const x = oprs[0];
	const xs = oprs.slice(1);

	return (item) => mergeOprs(...xs)(x(item));
};

export const take: <T>(n: number) => Opr<T[]> = (n) => (x) => x.slice(0, n);

export const id: <T>(_: T) => T = (x) => x;
