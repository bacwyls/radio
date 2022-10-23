import Urbit from "@urbit/http-api";
import { Radio } from "./lib";

const api = new Urbit('', '', window.desk);

api.ship = window.ship;

const our = '~' + window.ship;

export const radio: Radio = new Radio(our, api);
