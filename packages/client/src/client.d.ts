export {};

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __SERVER_PORT__: number;

declare global {
  interface Window {
    __PRELOADED_STATE__?: any;
  }
}
