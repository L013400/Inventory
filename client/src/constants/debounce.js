let tout = null;
export function debounce(fn, duration) {
    tout && clearTimeout(tout)
    tout = setTimeout(() => {
        fn();
    }, duration)
}