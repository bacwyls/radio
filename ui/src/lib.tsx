import Urbit from "@urbit/http-api";

const datboiURL = 'https://i.giphy.com/media/vc5L6VoTB6tnW/giphy.webp'
const pepeURL = 'https://i.imgur.com/IGaYzV6.gif'
const wojakURL = 'https://i.imgur.com/gsTARXr.gif'


  // const whitebg = 'https://0x0.st/oJ62.png'
  // const blackbg = 'https://0x0.st/oJEy.png'
  // const funnygif = 'https://i.imgur.com/vzkOwHY.gif'
  // const vaporwave = 'https://0x0.st/oJ6_.png'


export class Radio {

    our: string;
    api: Urbit;
    //
    //
    player: any;

    constructor(our: string, api:Urbit) {
        this.our = our;
        this.api = api
    }


    public playerRef = (p:any) => {
        this.player = p;
      }

    public seekToDelta(startedTime:number) {
        // respond to !time command or seek from update
        // this sets the player to the appropriate time
        if(startedTime === 0) return;
    
        if(!this.player) {
            console.log('player is not defined :(')
            return;
        }
    
        var currentUnixTime = Date.now() / 1000;
        var delta = Math.ceil(currentUnixTime - startedTime);
        var duration = this.player.getDuration();
    
        // console.log(`delta: ${delta}, duration: ${player.getDuration()}`)
    
        if(duration) {
            this.player.seekTo((delta % duration));
        } else {
            this.player.seekTo(delta, 'seconds');
        }
    }
    
    // api hits
    public chat(chat:string) {
        this.api.poke({
          app: 'tenna',
          mark: 'radio-action',
          json: {'chat': {
                         'from':this.our,
                         'message':chat
                         } 
                }
         });
    }

    public public() {
        this.api.poke({
            app: 'tower',
            mark: 'radio-action',
            json: {public : true}
            });
    }

    public private() {
        this.api.poke({
            app: 'tower',
            mark: 'radio-action',
            json: {public : false}
            });
    }

    public background(viewUrl:string) {
        this.api.poke({
            app: 'tenna',
            mark: 'radio-action',
            json: {view : viewUrl}
            });
    }

    public spin(playUrl:string) {
        let currentUnixTime = Date.now()
        currentUnixTime = Math.ceil(currentUnixTime);
        this.api.poke({
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

    public setTime(playUrl:string, time:number) {
        time = time * 1000;
        let customStartTime = Date.now() - time;
        customStartTime = Math.ceil(customStartTime);
        this.api.poke({
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

    public talk(talkMsg:string) {
        this.api.poke({
            app: 'tenna',
            mark: 'radio-action',
            json: {talk : talkMsg}
            });
    }

    public tune(tuneTo:string | null) {
        this.api.poke({
            app: 'tenna',
            mark: 'radio-action',
            json: {tune : tuneTo}
            });
    }

    public datboi() {
        this.chat(datboiURL);
    }
    public pepe() {
        this.chat(pepeURL);
    }
    public wojak() {
        this.chat(wojakURL);
    }
    
}
