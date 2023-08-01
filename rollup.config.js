import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

const config = [
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/cjs/passwordless-api.cjs',
            format: 'cjs',
            sourcemap: true
        },
        external: ['axios'],
        plugins: [typescript()]
    },
    {
        input: 'dist/cjs/index.d.ts',
        output: {
            file: 'dist/types/passwordless-api.d.ts'
        },
        external: ['axios'],
        plugins: [dts.default()]
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/esm/passwordless-api.mjs',
            format: 'es',
            sourcemap: true
        },
        external: ['axios'],
        plugins: [typescript()]
    }
];
export default config;