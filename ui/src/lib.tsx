import Urbit from "@urbit/http-api";
import ReactPlayer from "react-player";
import store from "./app/store";
import { isValidPatp } from 'urbit-ob';
import { formatTimestamp } from "./util";
import { setHasPublishedStation, setIsConnecting, setNavigationOpen, setOurTowerDescription, setPlayerInSync, setPlayerReady, setTunePatP } from "./features/ui/uiSlice";
import { resetStation } from "./features/station/stationSlice";
import { chatInputId } from "./components/ChatColumn";

const badDJMessage =
    "You do not have permission to use that command on this station. Try using your station";

export class Radio {
    our: string;
    api: Urbit;

    // window.speechSynthesizer
    synth: any;

    hub: string = "~dyl";

    constructor() {
        this.our = "~" + window.ship;
        this.api = new Urbit("", "", window.desk);
        this.api.ship = window.ship;
        this.synth = window.speechSynthesis;
        this.api.onOpen = () => {console.log('connection established')}
        this.api.onError= (e) => {
            console.log("api onError", e)
        }
        this.api.onReconnect = () => {
            console.log("api onReconnect??")
        }
        // this.synth.onvoiceschanged = (v: any) => {
        //     console.log('radio voices', v)
        //     // TODO check if voices is empty
        //     //  users have had empty voices in ubuntu + brave
        // }
    }

    public watchTenna(handleSub: any, dispatch: any) {
        this.api
            .subscribe({
                app: "tenna",
                path: "/frontend",
                event: handleSub,
                quit: () => alert("lost connection to your urbit. please refresh"),
                err: (e) => console.log("radio err", e),
            })
            .then((subscriptionId) => {
                //
                window.addEventListener("beforeunload", () => {
                    this.tune(null);
                    this.api.unsubscribe(subscriptionId);
                    this.api.delete();
                });
                // tune to hub by default
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const station = urlParams.get("station");
                if (!station) {
                    dispatch(setTunePatP(this.hub))
                    this.tune(this.hub);
                    return;
                }
                let locationPatP = this.hub;
                switch (station) {
                    case "hub":
                        locationPatP = this.hub;
                        break;
                    case "our":
                        locationPatP = this.our;
                        break;
                    default:
                        locationPatP = station!;
                        break;
                }
                dispatch(setTunePatP(locationPatP))
                this.tune(locationPatP);
            });
    }

    public seekToGlobal(player: ReactPlayer | null, startedTime: number) {
        // respond to !time command or seek from update
        // this sets the player to the appropriate time

        // no funny numbers
        // started time is a unix timestamp
        if (startedTime === 0) return;

        if (!player) return;

        var currentUnixTime = Date.now() / 1000;
        var duration = player.getDuration();

        if (!duration) return;

        let globalProgress = Math.ceil(currentUnixTime - startedTime) % duration;

        console.log("seeking to :", formatTimestamp(Math.round(globalProgress)));
        player.seekTo(globalProgress, "seconds");
    }

    public resyncAll(player: ReactPlayer | null, hostPatp: string, url: string) {
        if (!player) return;
        let time = player.getCurrentTime();
        if (!time) return;
        if (!url) return;

        if (hostPatp !== this.our) {
            return;
        }
        this.setTime(url, time);
    }

    public syncLive(player: ReactPlayer | null, hostPatp: string, url: string) {
        if (hostPatp !== this.our) return;
        if (!player) return;

        let duration = player.getDuration();

        if (!duration) return;
        if (!url) return;

        this.setTime(url, duration - 5);
    }

    public isAdmin() {
        const tunePatP = store.getState().ui.tunePatP;
        return tunePatP === this.our;
    }
    public canUseDJCommands() {
        const permissions = store.getState().station.permissions;
        if (permissions === 'open') {
            return true;
        }
        return this.isAdmin();
    }

    // api hits
    public chat(chat: string) {
        this.api.poke({
            app: "tenna",
            mark: "radio-action",
            json: {
                chat: {
                    from: this.our,
                    message: chat,
                    time: 0,
                },
            },
        });
    }

    public setPermissions(p: 'open' | 'closed') {
        this.api.poke({
            app: "tower",
            mark: "radio-action",
            json: { permissions: p },
        });
    }
    public public() {
        this.api.poke({
            app: "tower",
            mark: "radio-action",
            json: { public: true },
        });
    }

    public private() {
        this.api.poke({
            app: "tower",
            mark: "radio-action",
            json: { public: false },
        });
    }

    public spin(playUrl: string) {
        if (!this.canUseDJCommands()) {
            alert(badDJMessage);
            return;
        }
        if (!this.isValidHttpUrl(playUrl)) return;
        let currentUnixTime = Date.now();
        currentUnixTime = Math.ceil(currentUnixTime);
        this.api.poke({
            app: "tenna",
            mark: "radio-action",
            json: {
                spin: {
                    url: playUrl,
                    time: currentUnixTime,
                },
            },
        });
    }

    public setTime(playUrl: string, time: number) {
        time = time * 1000;
        let customStartTime = Date.now() - time;
        customStartTime = Math.ceil(customStartTime);
        this.api.poke({
            app: "tenna",
            mark: "radio-action",
            json: {
                spin: {
                    url: playUrl,
                    time: customStartTime,
                },
            },
        });
    }

    public talk(talkMsg: string) {
        if (!this.canUseDJCommands()) {
            alert(badDJMessage);
            return;
        }
        this.api.poke({
            app: "tenna",
            mark: "radio-action",
            json: { talk: talkMsg },
        });
    }

    public tune(tuneTo: string | null) {
        this.api.poke({
            app: "tenna",
            mark: "radio-action",
            json: { tune: tuneTo },
        });
    }

    public ping() {
        console.log("sending presence heartbeat");
        this.api.poke({
            app: "tenna",
            mark: "radio-action",
            json: { presence: null },
        });
    }

    public ban(her: string) {
        this.api.poke({
            app: "tower",
            mark: "radio-admin",
            json: { ban: her },
        });
    }

    public unban(her: string) {
        this.api.poke({
            app: "tower",
            mark: "radio-admin",
            json: { unban: her },
        });
    }

    public deleteChat(from: string, time:number) {
        this.api.poke({
            app: "tenna",
            mark: "radio-action",
            json: { 'delete-chat': {
                from: from,
                time: time
            } },
        });
    }

    public gregRequest() {
        this.api.poke({
            app: "tower",
            mark: "greg-event",
            json: { request: null },
        });
    }

    public gregRemove(patp: string) {
        this.api.poke({
            app: "tower",
            mark: "greg-event",
            json: { remove: patp },
        });
    }

    public gregPut(description: string) {
        this.api.poke({
            app: "tower",
            mark: "greg-event",
            json: {
                put: {
                    description: description,
                    location: this.our,
                    time: 0,
                    viewers: 0,
                },
            },
        });
    }

    public chatImage(command: string) {
        // @ts-ignore
        let img = this.imgUrls[command];
        if (!img) return;
        this.chat(img);
    }

    public soundUrls = {
        fart: "https://www.myinstants.com/media/sounds/fart-with-reverb.mp3",
        click: "https://www.myinstants.com/media/sounds/minecraft_click.mp3",
        orb: "https://www.myinstants.com/media/sounds/orb.mp3",
    };

    public imgUrls = {
        athens: "https://bwyl.nyc3.digitaloceanspaces.com/radio/chat_images/athens.gif",
        urbit: "https://bwyl.nyc3.digitaloceanspaces.com/radio/chat_images/urbit.png",
        groove: "https://bwyl.nyc3.digitaloceanspaces.com/radio/chat_images/groove.gif",
        cabbit: "https://bwyl.nyc3.digitaloceanspaces.com/radio/chat_images/cabbit.gif",
    };

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

    public tuneAndReset(dispatch: any, patp: string) {
        this.tune(patp);
        // this.tunedTo = null;
        dispatch(setTunePatP(patp));
        dispatch(setIsConnecting(true));
        dispatch(resetStation());
        dispatch(setPlayerReady(false));
        dispatch(setNavigationOpen(false));
    }

    public handleUserInput(dispatch: any) {
        let input = document.getElementById(chatInputId) as HTMLInputElement;
        const tunePatP = store.getState().ui.tunePatP;
        const spinTime = store.getState().station.spinTime;
        const spinUrl = store.getState().station.spinUrl;
        // @ts-ignore
        let player: any = !window.playerRef ? null : window.playerRef.current

        let chat = input.value;
        input.value = '';

        if (chat === '') return;

        // check for commands
        let got = this.getCommandArg(chat);
        if (!got) {
            // just a regular chat message
            this.chat(chat);
            return;
        }

        // interpreting message as a command
        let command = got.command;
        let arg = got.arg;
        switch (command) {
            case 'talk':
                this.chat(chat);
                this.talk(arg);
                break;
            case 'qtalk':
                if (!this.isAdmin()) return;
                this.talk(arg);
                break;
            case 'play':
                this.spin(arg);
                this.chat(chat);
                break;
            case 'qplay':
                if (!this.isAdmin()) return;
                this.spin(arg);
                break;
            case 'tune':
                if (arg === '') arg = this.our;
                this.chat(chat);
                if (isValidPatp(arg)) {
                    this.tuneAndReset(dispatch, arg);
                }
                else if (isValidPatp('~' + arg)) {
                    this.tuneAndReset(dispatch, '~' + arg);
                }
                break;
            case 'time':
                dispatch(setPlayerInSync(true));
                this.seekToGlobal(player, spinTime);
                this.chat(chat);
                break;
            case 'set-time':
                // if(!this.isAdmin())) {
                //   return;
                // }
                this.resyncAll(player, tunePatP, spinUrl);
                this.chat(chat);
                break;
            case 'public':
                if (!this.isAdmin()) {
                    return;
                }
                // this.public();
                this.setPermissions('open');
                this.chat(chat);
                break;
            case 'party':
                if (!this.isAdmin()) {
                    return;
                }
                const permissions = store.getState().station.permissions;
                if (permissions === 'open') {
                    this.setPermissions('closed');
                } else {
                    this.setPermissions('open');
                }

                this.chat(chat);
                break;
            case 'private':
                if (!this.isAdmin()) {
                    return;
                }
                // this.private();
                this.setPermissions('closed')
                this.chat(chat);
                break;
            case 'ban':
                if (!this.isAdmin()) {
                    return;
                }
                this.ban(arg);
                this.chat(chat);
                break;
            case 'unban':
                if (!this.isAdmin()) {
                    return;
                }
                this.unban(arg);
                this.chat(chat);
                break;
            case 'ping':
                this.ping();
                // this.chat(chat);
                break;
            // case 'wave':
            //   this.chat(chat);
            //   break;
            // case 'scroll':
            //   this.chat(chat);
            //   break;
            // case 'typing':
            //   this.chat(chat);
            //   break;
            case 'logout':
                this.tune(null);
                break;
            case 'live':
                this.syncLive(player, tunePatP, spinUrl);
                this.chat(chat);
                break;
            case 'publish':
                if (!this.isAdmin()) {
                    return;
                }
                this.gregPut(arg);
                this.chat(chat);
                dispatch(setHasPublishedStation(true));
                // ourtowerdescription is a local copy in uislice
                // representing ourtower. description in stationslice is the currently connected towers description
                dispatch(setOurTowerDescription(arg))
                // refresh towers
                this.gregRequest();
                break;
            case 'qpublish':
                // quiet publish
                // publish without chatting about it
                if (!this.isAdmin()) {
                    return;
                }
                this.gregPut(arg);
                dispatch(setHasPublishedStation(true));
                dispatch(setOurTowerDescription(arg))
                // refresh towers
                this.gregRequest();
                break;
            case 'unpublish':
                if (!this.isAdmin()) return;
                this.gregRemove(this.our);
                this.chat(chat);
                dispatch(setHasPublishedStation(false));
                this.gregRequest();
                break;
            // image commands
            default:
                this.chatImage(command);
                break;
            //
        }
    }
    // parse from user input
    private getCommandArg(chat: string) {
        // if(!(chat[0] === '!' || chat[0] === '|' || chat[0] === '+' || chat[0] === ':')) return;
        if (!(chat[0] === '!')) return;

        let splitIdx = chat.indexOf(' ');
        if (splitIdx === -1) return { 'command': chat.slice(1), 'arg': '' };
        let command = chat.slice(1, splitIdx);
        let arg = chat.slice(splitIdx + 1);
        return { 'command': command, 'arg': arg };
    }
    public async getBasketImages() {
        let gotImages = await this.api.scry({
            app: 'basket',
            path: '/images'
        });
        return gotImages
    }



}
