export function getNextId(arr) {
	return arr.length ? arr[arr.length - 1].id + 1 : 0;
}

export function throttle(fnToThrottle, msDelay, faceControlFn = false) {
	let isThrottled = false,
		isPending = false;

	return () => {
		const isBlocked = faceControlFn ? faceControlFn() : false;

		if (isBlocked) return;

		if (isThrottled) {
			isPending = true;
			return;
		}

		fnToThrottle();
		isThrottled = true;

		setTimeout(() => {
			isThrottled = false;

			if (isPending) {
				fnToThrottle();
				isPending = false;
			}
		}, msDelay);
	};
}

export function compareStates(previousState, currentState) {
	for (let key in previousState) {
		if (previousState[key] !== currentState[key]) return false;
	}
	return true;
}

export function copyStates(from, where) {
	for (let key in where) {
		where[key] = from[key];
	}
}

export function getRandomLag(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}
