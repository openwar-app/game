import type {MultiPolygon, Pair, Ring} from "polygon-clipping";

export function validatePassword(password: string, passwordRepeat: string) : false|true| { status: 'error', error: string } {
    password = password.trim();
    passwordRepeat = passwordRepeat.trim();
    if(password === '') { return {status: 'error', error: 'website.register.no-password'}; }

    if(password.length < 8) {
        return {status: 'error', error: 'website.register.password-too-short'};
    }
    let complexity = 0;
    if(/[a-z]/.test(password)) complexity++;
    if(/[A-Z]/.test(password)) complexity++;
    if(/\d/.test(password)) complexity++;
    if(/[^a-zA-Z0-9]/.test(password)) complexity++;
    if(complexity < 3) {
        return {status: 'error', error: 'website.register.password-too-simple'};

    }
    if(password !== passwordRepeat) {
      return {status: 'error', error: 'website.register.password-mismatch'};
    }

    return true;
}

export function isPointInPolygon(point: Pair, polygon: Ring, inside: boolean = false) {
    const [x, y] = point;


    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i][0],
            yi = polygon[i][1]
        const xj = polygon[j][0],
            yj = polygon[j][1]

        const intersect = yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
        if (intersect) inside = !inside
    }

    return inside
}

export function isPointInMultiPolygon(point: Pair, mpolygon: MultiPolygon) {
    let inside = false;
    for (let polygon of mpolygon[0]) {
        inside = isPointInPolygon(point, polygon, inside);
    }


    return inside;
}