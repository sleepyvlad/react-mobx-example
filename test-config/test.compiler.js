const tsc = require('typescript');

module.exports = {
    process(src, path) {
        if (path.endsWith('.ts') || path.endsWith('.tsx') || path.endsWith('.js')) {
            return tsc.transpile(src,require('../tsconfig.json').compilerOptions, path, []);
        }
        return src;
    },
};
