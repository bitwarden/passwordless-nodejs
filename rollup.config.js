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
        plugins: [typescript()]  // No need to pass outDir, it will use tsconfig.json
    },
    {
        input: 'src/index.ts',  // Use source files for declaration generation
        output: {
            file: 'dist/types/passwordless-api.d.ts',
            format: 'es'
        },
        external: ['axios'],
        plugins: [dts.default()]  // Generate declaration files
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/esm/passwordless-api.mjs',
            format: 'es',
            sourcemap: true
        },
        external: ['axios'],
        plugins: [typescript()]  // No need to pass outDir
    }
];

export default config;