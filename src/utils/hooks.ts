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
): [T, () => void] {
	const [data, setData] = useState<T>(initValue);

	const fetchData = () => {
		fetch(url)
			.then(handler)
			.then((value) => {
				setData(value);
			});
	};

	return [data, fetchData];
}
