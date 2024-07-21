import { useEffect, useState } from 'react';

export function onMount(action: () => void) {
	const [flag, setFlag] = useState(false);

	useEffect(() => {
		if (!flag) {
			action();
			setFlag(false);
		}
	}, [flag]);
}

export function useFetchData<T>(
	initValue: T,
	url: string,
	handler: (res: Response) => Promise<T> = (res) => res.json(),
): [T, boolean, () => void] {
	const [data, setData] = useState<T>(initValue);
	const [isFetching, setIsFetching] = useState(false);

	const fetchData = () => {
		setIsFetching(true);

		fetch(url)
			.then(handler)
			.then((value) => {
				setData(value);
				setIsFetching(false);
			});
	};

	return [data, isFetching, fetchData];
}
