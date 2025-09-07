import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      bundler: 'vite',
      webServerCommands: {
        default: 'npx nx run sathish-react:dev',
        production: 'npx nx run sathish-react:preview',
      },
      ciWebServerCommand: 'npx nx run sathish-react:preview',
      ciBaseUrl: 'http://localhost:4202',
    }),
    baseUrl: 'http://localhost:4202',
  },
});
