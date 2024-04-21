module.exports = {
    target: (name, semver) => {
        if (semver[0].release) {
            return '@' + semver[0].release.split('.')[0];
        }
        return 'semver';
    }
}