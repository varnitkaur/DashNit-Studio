/**
 * Root entry forwarder - The server implementation is located in ./backend/src/index.ts
 */
import app from './backend/src/index';

export * from './backend/src/index';
export default app;

