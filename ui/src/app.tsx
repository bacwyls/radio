import React, { useEffect, useRef, useState } from 'react';
import Urbit from '@urbit/http-api';
import ReactPlayer from "react-player";
import { HelpMenu } from './components/HelpMenu';
import { InitialSplash } from './components/InitialSplash';
import { ChatBox } from './components/ChatBox';
import { Radio } from './lib';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export function App() {

  const [talkMsg, setTalkMsg]   = useState("");
  const [spinUrl, setSpinUrl]   = useState("");
  const [spinTime, setSpinTime] = useState(0);
  const [tunePatP, setTunePatP] = useState("");
  const [radioSub, setRadioSub] = useState(0);
  const [bgImage, setBgImage] = useState('')

  const [update, setUpdate] = useState();

  const [userInteracted, setUserInteracted] = useState(false);
  const [helpMenuOpen, setHelpMenuOpen] = useState(false);

  const inputReference = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // autofocus input
    if(!inputReference) return;
    if(!inputReference.current) return;
    window.setTimeout(()=>{
      // use a slight delay for better UX
      // if(!inputReference) return;
      // if(!inputReference.current) return;
      // @ts-ignore
      inputReference.current.focus();
    }, 250);

  }, [userInteracted]);


  const [chats, setChats] = useState<Array<string>>([''])
  const maxChats = 16;
  useEffect(() => {
    // maximum chats
    if(chats.length > maxChats) {
      setChats(chats.slice(1));
    }
  }, [chats])


  const our = '~'+window.ship;
  const tuneInitial = our;


  // ReactPlayer npm react-player
  let player : any;
  let playerRef = (p:any) => {
    player = p;
  }

  useEffect(() => {
    if(!player) return;
      player.url = spinUrl;
  }, [spinUrl]);

  useEffect(() => {
    if(!player) return;
    seekToDelta(spinTime)
  }, [spinTime]);

  function seekToDelta(startedTime:number) {
    // respond to !time command or seek from update
    // this sets the player to the appropriate time
    if(startedTime === 0) return;

    if(!player) {
      return;
    }
    var currentUnixTime = Date.now() / 1000;
    var delta = currentUnixTime - startedTime;
    var duration = player.getDuration();
    // console.log(`delta: ${delta}, duration: ${player.getDuration()}`)

    if(delta < 1) delta = 1;
    let res;
    if(!duration) {
      res = player.seekTo(delta, 'seconds');
    } else {
      res = player.seekTo((delta % duration));
    }
  }


  // initialize subscription
  useEffect(() => {
    if (!api || radioSub) return;
      api
        .subscribe({
            app: "tenna",
            path: "/frontend",
            event: handleSub,
            quit: subFail,
            err: subFail
        })
        .then((subscriptionId) => {
          setRadioSub(subscriptionId);
          Radio.tune(tuneInitial);
          });
  }, [api]);

  // unsub on window close or refresh
  useEffect(() => {
    window.addEventListener("beforeunload", unsubFunc);
    return () => {
      window.removeEventListener("beforeunload", unsubFunc);
    };
  }, [radioSub]);
  //
  const unsubFunc = () => {
    Radio.tune(null);
    api.unsubscribe(radioSub);
    api.delete();
  };

  // manage SSE events
  function handleSub(update:any) {
    setUpdate(update);
  }
  useEffect(() => {
    if(!update) return;
    // wrap updates in this effect to get accurate usestate
    handleUpdate(update);
    }, [update]);
  function handleUpdate(update:any) {
      console.log("radio update", update);
      let mark = Object.keys(update)[0];
      //
      // handle updates from tower / radio station
      switch(mark) {
        case "spin":
          var updateSpin = update["spin"];

          setSpinUrl(updateSpin.url);
          setSpinTime(updateSpin.time);
          break;
        case "talk":
          let synth = window.speechSynthesis;
          var updateTalk = update["talk"];
          var utterThis = new SpeechSynthesisUtterance(updateTalk);
          
          setTalkMsg('🗣️ '+updateTalk);
          
          if(!userInteracted) return;
          synth.speak(utterThis);
          break;
        case "tune":
          setTunePatP(update['tune'])
          break;
        case "chat":
          let chat = update['chat'];
          setChats(prevChats => [...prevChats, `${chat.from}: ${chat.message}`])  ;
          break;
        case 'view':
          setBgImage(update['view']);
          break;
      }
  };
  function subFail() {
      console.log("fail!");
  };


  const chatInputId ='radio-chat-input';
  function handleUserInput() {
    let input = document.getElementById(chatInputId) as HTMLInputElement;

    let chat = input.value;
    input.value = '';

    if (chat ==='') return;

    // check for commands
    let got = getCommandArg(chat);
    if(!got) {
      // just a regular chat message
      Radio.chat(chat);
      return;
    }

    // interpreting message as a command
    let command = got.command;
    let arg = got.arg;
    switch(command) {
      case 'talk':
        Radio.talk(arg);
        Radio.chat(chat);
        break;
      case 'play':
        Radio.spin(arg);
        Radio.chat(chat);
        break;
      case 'tune':
        if(arg===tunePatP) return;
        if(arg==='') arg=our;
        Radio.tune(arg);
        setTunePatP(arg+' (LOADING)');
        resetPage();
        break;
      case 'background':
        Radio.background(arg);
        Radio.chat(chat);
        break;
      case 'time':
        seekToDelta(spinTime);
        Radio.chat(chat);
        break;
      case 'set-time':
        let time = player.getCurrentTime() * 1000;
        if(!time) return;
        if(!spinUrl) return;
        Radio.setTime(spinUrl, time);
        Radio.chat(chat);
        break;
      case 'public':
        if(tunePatP !== our) {
          return;
        }
        Radio.public();
        Radio.chat(chat);
        break;
      case 'private':
        if(tunePatP !== our) {
          return;
        }
        Radio.private();
        Radio.chat(chat);
        break;
      //
      // image commands
      case 'datboi':
        Radio.datboi();
        break;
      case 'pepe':
        Radio.pepe();
        break;
      case 'wojak':
        Radio.wojak();
        break;
    }
  }

  function resetPage() {
    setChats(['']);
    setTalkMsg('');
    setBgImage('');
    setSpinUrl('');
  }


  // parse from user input
  // e.g. `!command argument`
  function getCommandArg(chat:string) {
    if(chat[0] !== '!') return;

    let splitIdx = chat.indexOf(' ');
    if(splitIdx === -1) return {'command':chat.slice(1), 'arg':''};
    let command = chat.slice(1,splitIdx);
    let arg = chat.slice(splitIdx+1);
    return {'command': command, 'arg':arg};
  }


  if(!userInteracted) {
    return <InitialSplash onClick={ ()=>{
                  setUserInteracted(true);
                } } />
   }
  return (
    <main className="flex justify-center h-screen overflow-scroll"
           style={{
                  backgroundImage: `url(${bgImage})`,
                  backgroundPosition: 'center center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor:'black'
                 }}>
      <div className="inline-block lg:w-1/2 md:w-3/4 w-full mx-2">

        <div
          className="flex mt-2"
          >
            {/* header */}
        
          <button
          className="hover:pointer px-4 py-2 inline-block bg-white rounded \
                    flex-initial mr-2 outline-none border-none \
                    placeholder-gray-800 bg-opacity-70 \
                    hover:bg-opacity-90 font-mono font-bold text-sm "
            style={{
              backdropFilter: 'blur(32px)',
              backgroundColor: helpMenuOpen ? 'lightblue' : ''
            }}
            onClick={() => {
              setHelpMenuOpen(!helpMenuOpen)
            }}
                >
                ?
              </button>
              <span 
              className="bg-white rounded w-full flex-full pl-4 font-mono \
                        relative overflow-wrap bg-opacity-70 p-1 py-2 text-sm"
              >{'current station: '}{tunePatP}{tunePatP===our?' (YOU)':''}
              </span>

        </div>

        {helpMenuOpen && 
        <HelpMenu />
        }
            
        <div
          className="bg-black mt-2 rounded w-full flex-none relative pb-3 pt-1 \
                    mr-3 overflow-wrap font-bold font-mono text-sm"
          style={{
              backdropFilter: 'blur(32px)'
          }}>
          {/* player */}
          <p className="text-center pt-2 pb-5 text-white mr-5" >{talkMsg}</p>
          <ReactPlayer
            ref={playerRef}
            url={spinUrl}
            playing={true}
            width='100%'
            controls={true}
            loop={true}
            onReady={() => {
              seekToDelta(spinTime);
            }}

          />

        </div>

        <div className="my-2 bg-white rounded w-full bg-opacity-0"
          >
            {/* user input */}

          <div className="flex">
            <input type="text"
              ref={inputReference}
              className="hover:pointer px-4 py-2 inline-block bg-white rounded \
                        flex-1 outline-none border-none placeholder-gray-800 \
                        bg-opacity-70 focus:bg-opacity-90 font-mono text-sm"
              autoCorrect={'off'}
              autoCapitalize={'off'}
              autoComplete={'off'}
              // autoFocus={false}
              placeholder="sup guys"
              style={{
                backdropFilter: 'blur(32px)'
              }}
              id={chatInputId}
              onKeyDown={(e:any)=> {
                if( e.key == 'Enter' ){
                  handleUserInput();
                }
              }}
            />
              <button className="hover:pointer px-4 py-2 inline-block bg-white rounded \
                                flex-initial ml-2 outline-none border-none \
                                placeholder-gray-800 bg-opacity-70 hover:bg-opacity-90 \
                                font-mono text-sm"
                      style={{
                        backdropFilter: 'blur(32px)'
                      }}
                      onClick={() => {
                        handleUserInput();
                      }}
              >
              send
            </button>
          </div>
        </div>

        <ChatBox chats={chats} />

      </div>
    </main>
  );
}

