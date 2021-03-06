import { useCallback, useMemo, useRef } from 'react';

export function useDebouncedCallback<TArgs extends any[]>(
	callback: (...args: TArgs) => any,
	wait: number
): (...args: TArgs) => void {
	const isCanceledRef = useRef(false);

	const debounce = useCallback(
		(func: (...args: TArgs) => any, wait: number) => {
			let timeout: NodeJS.Timeout | undefined;
			return function (...args: TArgs) {
				const later = function () {
					timeout = undefined;

					if (isCanceledRef.current) {
						return;
					}

					func(...args);
				};

				if (timeout) {
					clearTimeout(timeout);
				}
				timeout = setTimeout(later, wait);
			};
		},
		[]
	);

	return useMemo(() => debounce(callback, wait), [callback, wait, debounce]);
}
