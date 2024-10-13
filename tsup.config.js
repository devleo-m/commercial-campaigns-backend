import { defineConfig } from 'tsup'

module.exports = defineConfig({
    entry: ['src/app.ts'],
    splitting: false,
    sourcemap: true,
    clean: true,
    minify: true,
    outDir: 'out',
    external: ['sequelize']
})
