import { Radio } from "./lib";

declare global {
  interface Window {
    ship: string;
    desk: string;
    radio: Radio;
  }
}

export {};

