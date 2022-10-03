import Urbit from "@urbit/http-api";

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

const datboiURL = 'https://i.giphy.com/media/vc5L6VoTB6tnW/giphy.webp'
const pepeURL = 'https://i.imgur.com/IGaYzV6.gif'
const wojakURL = 'https://i.imgur.com/gsTARXr.gif'

export class Radio {

    public static chat(chat:string) {
        api.poke({
          app: 'tenna',
          mark: 'radio-action',
          json: {'chat': {
                         'from':'~'+api.ship,
                         'message':chat
                         } 
                }
         });
    }

    public static public() {
        api.poke({
            app: 'tower',
            mark: 'radio-action',
            json: {public : true}
            });
    }

    public static private() {
        api.poke({
            app: 'tower',
            mark: 'radio-action',
            json: {public : false}
            });
    }

    public static background(viewUrl:string) {
        api.poke({
            app: 'tenna',
            mark: 'radio-action',
            json: {view : viewUrl}
            });
    }

    public static spin(playUrl:string) {
        let currentUnixTime = Date.now()
        currentUnixTime = Math.ceil(currentUnixTime);
        api.poke({
            app: 'tenna',
            mark: 'radio-action',
            json: {spin :
                    {
                    url: playUrl,
                    time: currentUnixTime
                    }
                }
            });
    }

    public static setTime(playUrl:string, time:number) {
        let customStartTime = Date.now() - time;
        customStartTime = Math.ceil(customStartTime);
        api.poke({
            app: 'tenna',
            mark: 'radio-action',
            json: {spin :
                    {
                    url: playUrl,
                    time: customStartTime
                    }
                }
            });
    }

    public static talk(talkMsg:string) {
        api.poke({
            app: 'tenna',
            mark: 'radio-action',
            json: {talk : talkMsg}
            });
    }

    public static tune(tuneTo:string | null) {
        api.poke({
            app: 'tenna',
            mark: 'radio-action',
            json: {tune : tuneTo}
            });
    }

    public static datboi() {
        this.chat(datboiURL);
    }
    public static pepe() {
        this.chat(pepeURL);
    }
    public static wojak() {
        this.chat(wojakURL);
    }
    
}
