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
    if(/[0-9]/.test(password)) complexity++;
    if(/[^a-zA-Z0-9]/.test(password)) complexity++;
    if(complexity < 3) {
        return {status: 'error', error: 'website.register.password-too-simple'};

    }
    if(password !== passwordRepeat) {
      return {status: 'error', error: 'website.register.password-mismatch'};
    }

    return true;
}