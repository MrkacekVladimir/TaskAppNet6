export function sleepPromise<T>(ms: number) {
    return (data: T) => {
        return new Promise<T>(resolve => setTimeout(() => { resolve(data) }, ms));
    }
};