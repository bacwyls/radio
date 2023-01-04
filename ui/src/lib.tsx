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
    // react player npm
    player: any;
    //
    // window.speechSynthesizer
    synth: any;
    //
    tunedTo!: string | null;

    hub: string = '~nodmyn-dosrux';

    constructor(our: string, api: Urbit) {
        this.our = our;
        this.api = api
        this.tunedTo = null;
        this.synth = window.speechSynthesis;
        this.synth.onvoiceschanged = (v: any) => {
            console.log('radio voices', v)
            // TODO check if voices is empty
            //  users have had empty voices in ubuntu + brave
        }

    }

    public playerRef = (p: any) => {
        this.player = p;
    }

    public seekToDelta(startedTime: number) {
        // respond to !time command or seek from update
        // this sets the player to the appropriate time
        if (startedTime === 0) return;

        if (!this.player) {
            console.log('player is not defined :(')
            return;
        }

        var currentUnixTime = Date.now() / 1000;
        var delta = Math.ceil(currentUnixTime - startedTime);
        var duration = this.player.getDuration();

        if (duration) {
            this.player.seekTo((delta % duration), 'seconds');
        } else {
            this.player.seekTo(delta, 'seconds');
        }
    }

    public resyncAll(url: string) {
        let time = this.player.getCurrentTime();
        if (!time) return;
        if (!url) return;

        if (this.tunedTo !== this.our) {
            return;
        }
        this.setTime(url, time);
    }

    public isAdmin() {
        return this.tunedTo === this.our;
    }

    public stop() {
        this.api.poke({
            app: 'tower',
            mark: 'radio-action',
            json: {
                'online': false,
            }
        });
    }

    public start() {
        this.api.poke({
            app: 'tower',
            mark: 'radio-action',
            json: {
                'online': true,
            }
        });
    }


    // api hits
    public chat(chat: string) {
        this.api.poke({
            app: 'tenna',
            mark: 'radio-action',
            json: {
                'chat': {
                    'from': this.our,
                    'message': chat,
                    'time': 0,
                }
            }
        });
    }

    public public() {
        this.api.poke({
            app: 'tower',
            mark: 'radio-action',
            json: { public: true }
        });
    }

    public private() {
        this.api.poke({
            app: 'tower',
            mark: 'radio-action',
            json: { public: false }
        });
    }

    public spin(playUrl: string) {
        if (!this.isValidHttpUrl(playUrl)) return;
        let currentUnixTime = Date.now()
        currentUnixTime = Math.ceil(currentUnixTime);
        this.api.poke({
            app: 'tenna',
            mark: 'radio-action',
            json: {
                spin:
                {
                    url: playUrl,
                    time: currentUnixTime
                }
            }
        });
    }

    public setTime(playUrl: string, time: number) {
        time = time * 1000;
        let customStartTime = Date.now() - time;
        customStartTime = Math.ceil(customStartTime);
        this.api.poke({
            app: 'tenna',
            mark: 'radio-action',
            json: {
                spin:
                {
                    url: playUrl,
                    time: customStartTime
                }
            }
        });
    }

    public talk(talkMsg: string) {
        this.api.poke({
            app: 'tenna',
            mark: 'radio-action',
            json: { talk: talkMsg }
        });
    }

    public tune(tuneTo: string | null) {
        this.api.poke({
            app: 'tenna',
            mark: 'radio-action',
            json: { tune: tuneTo }
        });
    }

    public ping() {
        console.log('ping');
        this.api.poke({
            app: 'tenna',
            mark: 'radio-action',
            json: { presence: null }
        });
    }

    public ban(her: string) {
        this.api.poke({
            app: 'tower',
            mark: 'radio-admin',
            json: { ban: her }
        });
    }

    public unban(her: string) {
        this.api.poke({
            app: 'tower',
            mark: 'radio-admin',
            json: { unban: her }
        });
    }

    public gregRequest() {
        this.api.poke({
            app: 'tower',
            mark: 'greg-event',
            json: { request: null }
        });
    }

    public gregPut(description: string, isPublic: boolean) {
        console.log(description)

        this.api.poke({
            app: 'tower',
            mark: 'greg-event',
            json: {
                put: {
                    description: description,
                    location: this.our,
                    time: 0,
                    viewers: 0,
                    public: isPublic,
                }
            }
        });
    }

    public chatImage(command: string) {
        // @ts-ignore
        let img = this.imgUrls[command];
        if (!img) return;
        this.chat(img);
    }

    public imgUrls = {
        'datboi': 'https://i.giphy.com/media/vc5L6VoTB6tnW/giphy.webp',
        'pepe': 'https://i.imgur.com/IGaYzV6.gif',
        'wojak': 'https://i.imgur.com/gsTARXr.gif',
        'poo': 'https://media3.giphy.com/media/Uowdj8xg3XZ7bKlA1N/giphy.gif',
        'sadpepe': 'https://media.tenor.com/5aF7np_zPEgAAAAd/pepe-why-pepe-the-frog.gif',
        'terry': 'https://media.tenor.com/WIqvnT_7Vj8AAAAi/terry-a-davis-terry-davis.gif',
        'fortnite': 'https://0x0.st/otwj.gif',
        'bong': 'https://0x0.st/otw2.gif',
        'hoon': 'https://media.tenor.com/qCy4QpqawcIAAAAi/twitch-chatting.gif',
        'band': 'https://0x0.st/otwe.gif',
        'cozy': 'https://media.tenor.com/L8uQHgpI1aYAAAAC/reikouwu2.gif',
        'war': 'https://media.tenor.com/Vc3qJRBT_AUAAAAM/alex-jones.gif',
        'retard': 'https://c.tenor.com/MfhZ1AT2th0AAAAC/peepo-dance-happy.gif%20https://c.tenor.com/MfhZ1AT2th0AAAAC/peepo-dance-happy.gif%20https://c.tenor.com/MfhZ1AT2th0AAAAC/peepo-dance-happy.gif',
        'cheese': 'https://image.noelshack.com/fichiers/2020/12/7/1584917989-ezgif-3-c96706d84527.gif',
        'diddy': 'https://www.latercera.com/resizer/ieO4j6CeHEOxbQ3zAA4F9guWt7E=/800x0/smart/arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/QMTMIODRIFC43OBIND2WMDJMNY.gif',
        'batman': 'https://i.warosu.org/data/lit/img/0122/86/1545778952553.gif',
        'jizz': 'https://cdn.discordapp.com/emojis/693519541279391897.gif',
        'butterfly': 'https://media3.giphy.com/media/LbN93tzk3P4gL03LXi/giphy.gif',
        'penguin': 'https://media.tenor.com/hyRFiIX7e1sAAAAC/gif-club-penguin-dance.gif',
        'spongebob': 'https://media.tenor.com/0pO-d7FH3QgAAAAi/spongebob-meme-spongebob.gif',
        'strawberry': 'https://media.tenor.com/MsnbSzWd_yMAAAAj/crazy-fruit.gif',
        'mario': 'https://media.tenor.com/c1ljnEruxwYAAAAi/smg4-smg4dancing.gif',
        'baldi': 'https://media.tenor.com/Ru81f5Z4K-YAAAAi/baldi-rickroll.gif',
        'snake': 'https://media.tenor.com/OGH7rOXh5YIAAAAi/solid-snake-mgs.gif',
        'yoshi': 'https://media.tenor.com/K2cU8bfy97gAAAAi/yoshi-tiptoe.gif',
        'cringe': 'https://media.tenor.com/pbderXHkWfUAAAAi/cringe-0000000.gif',
    }

    // util
    public isValidHttpUrl(string: string) {
        let url;

        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }

        return url.protocol === "http:" || url.protocol === "https:";
    }
}
