import { registerPlugin } from '@capacitor/core';
import type { GoogleAuthPlugin } from './definitions';

const GoogleAuth = registerPlugin<GoogleAuthPlugin>('GoogleAuth', {
  web: () => import('./web.js').then((m) => new m.GoogleAuthWeb()),
});

export * from './definitions.js';
export { GoogleAuth };
