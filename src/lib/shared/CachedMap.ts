type CachedValue<T> = {
    _time: number,
    value: T;
}

export class CachedMap<K, T> {
    private _map: Map<K, CachedValue<T>> = new Map();
    private _expiry: number = -1;
    private _cleanUpFunction: Function | null = null;
    private _cleanLock = false;


    get cleanlock() {
        return this._cleanLock;
    }

    set cleanlock(value: boolean) {
        this._cleanLock = value;
    }

    put(key: K, value: T) {
        this._map.set(key, {_time: Date.now(), value});
        this.clean();
    }

    get(key: K): null | T {
        if (!this._map.has(key)) {
            return null;
        }
        let v = this._map.get(key) as CachedValue<T>;
        this.put(key, v.value);
        return v.value;
    }

    entries(): [K, T][] {
        return [...this._map.entries()].map(([k, v]) => [k, v.value]);
    }

    constructor(expiry: number = -1, cleanUpFunction: null | Function = null) {
        this._expiry = expiry;
        this._cleanUpFunction = cleanUpFunction;
    }

    async clean() {
        if (this._expiry <= 0 || this._cleanLock) return;
        this._cleanLock = true;
        for (let [key, cv] of this._map.entries()) {
            let elapsed = Date.now() - cv._time;
            if (elapsed > this._expiry) {
                if (this._cleanUpFunction) {
                    try {
                        await this._cleanUpFunction(key, cv.value);
                    } catch (ex) {
                    }
                }
                this._map.delete(key);
            }
        }
        setTimeout(() => this._cleanLock = false, 100);
    }
}