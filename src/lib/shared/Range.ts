export function Range(start: number, end: number, interval: number = 1): number[] {
    if (isNaN(start)) {
        throw new Error('start is NaN');
    }
    if (isNaN(end)) {
        throw new Error('end is NaN');
    }
    if (isNaN(interval)) {
        throw new Error('interval is NaN');
    }
    interval = ~~interval;
    start = ~~start;
    end = ~~end;
    if (start > end && interval > 0) {
        throw new Error('interval must be negative');
    }
    if (end > start && interval < 0) {
        throw new Error('interval must be positive');
    }

    if (interval === 0) {
        throw new Error('interval must not be zero');
    }
    let x: number[] = [];
    for (let i = start; true; i += interval) {
        x.push(i);
        if (interval > 0 && i >= end) break;
        if (interval < 0 && i < end) break;
    }
    return x;
}