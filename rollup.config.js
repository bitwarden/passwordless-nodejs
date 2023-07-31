import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

const config = [
    {
        input: 'lib/index.js',
        output: {
            file: 'passwordless-api.js',
            format: 'cjs',
            sourcemap: true,
        },
        external: ['axios'],
        plugins: [typescript()]
    }, {
        input: 'lib/index.d.ts',
        output: {
            file: 'passwordless-api.d.ts',
            format: 'es'
        },
        plugins: [dts.default()]
    }
];
export default config;