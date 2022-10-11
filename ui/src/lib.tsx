import Urbit from "@urbit/http-api";


// const imgUrls = {
//     'datboi' : 'https://i.giphy.com/media/vc5L6VoTB6tnW/giphy.webp',
//     'pepe': 'https://i.imgur.com/IGaYzV6.gif',
//     'wojak': 'https://i.imgur.com/gsTARXr.gif',
//     'poo' : 'https://media3.giphy.com/media/Uowdj8xg3XZ7bKlA1N/giphy.gif',
//     'sadpepe': 'https://media.tenor.com/5aF7np_zPEgAAAAd/pepe-why-pepe-the-frog.gif',

// }

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
    //
    tunedTo!: string | null;

    constructor(our: string, api:Urbit) {
        this.our = our;
        this.api = api
        this.tunedTo = null;
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

    public resyncAll(url: string) {
        let time = this.player.getCurrentTime();
        if(!time) return;
        if(!url) return;
    
        if(this.tunedTo !== this.our) {
          return;
        }
        this.setTime(url, time);
    }
   
    
    // api hits
    public chat(chat:string) {
        this.api.poke({
          app: 'tenna',
          mark: 'radio-action',
          json: {'chat': {
                         'from':this.our,
                         'message':chat,
                         'time':0,
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
        if(!this.isValidHttpUrl(playUrl)) return;
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

    public ping() {
        console.log('ping');
        this.api.poke({
            app: 'tenna',
            mark: 'radio-action',
            json: {presence : null}
            });
    }

    public chatImage(command:string) {
        // @ts-ignore
        let img = this.imgUrls[command];
        if(!img) return;
        this.chat(img);
    }
    
    public imgUrls = {
        'datboi' : 'https://i.giphy.com/media/vc5L6VoTB6tnW/giphy.webp',
        'pepe': 'https://i.imgur.com/IGaYzV6.gif',
        'wojak': 'https://i.imgur.com/gsTARXr.gif',
        'poo' : 'https://media3.giphy.com/media/Uowdj8xg3XZ7bKlA1N/giphy.gif',
        'sadpepe': 'https://media.tenor.com/5aF7np_zPEgAAAAd/pepe-why-pepe-the-frog.gif',
        'terry' : 'https://media.tenor.com/WIqvnT_7Vj8AAAAi/terry-a-davis-terry-davis.gif',
        'fortnite': 'https://0x0.st/otwj.gif',
        'bong': 'https://0x0.st/otw2.gif',
        'hoon': 'https://media.tenor.com/qCy4QpqawcIAAAAi/twitch-chatting.gif',
        'band': 'https://0x0.st/otwe.gif', 
    }

    // util
    public isValidHttpUrl(string : string) {
        let url;
        
        try {
          url = new URL(string);
        } catch (_) {
          return false;  
        }
      
        return url.protocol === "http:" || url.protocol === "https:";
      }
}
