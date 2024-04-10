let _value: string = $state('UNKNOWN');


export function getUserId() {
    return _value;
}

export function setUserId(value: string) {
    _value = value;
}

