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
  const [bgImage, setBgImage] = useState('https://i.imgur.com/vzkOwHY.gif')

  const [viewers, setViewers] = useState([])

  const [update, setUpdate] = useState();

  const [userInteracted, setUserInteracted] = useState(false);
  const [helpMenuOpen, setHelpMenuOpen] = useState(false);

  const [playerReady, setPlayerReady] = useState(false);

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

  useEffect(()=>{
    seekToDelta(spinTime)
  }, [playerReady])

  useEffect(() => {
    if(!player) return;
      player.url = spinUrl;
  }, [spinUrl]);

  useEffect(() => {
    // display voice in chat
    if(talkMsg === '') return;
    if(!userInteracted) return;
    // setChats(prevChats => [...prevChats, `🗣️  ${talkMsg}`])  ;
  }, [talkMsg])

  useEffect(() => {
    if(!player) return;
    if(!playerReady) return;
    seekToDelta(spinTime)
  }, [spinTime]);

  function seekToDelta(startedTime:number) {
    // respond to !time command or seek from update
    // this sets the player to the appropriate time
    if(startedTime === 0) return;

    if(!player) {
      console.log('player is not defined :(')
      return;
    }

    var currentUnixTime = Date.now() / 1000;
    var delta = Math.ceil(currentUnixTime - startedTime);
    var duration = player.getDuration();

    // console.log(`delta: ${delta}, duration: ${player.getDuration()}`)

    if(duration) {
      player.seekTo((delta % duration));
    } else {
      player.seekTo(delta, 'seconds');
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
          
          setTalkMsg(updateTalk);
          
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
        case 'viewers':
          setViewers(update['viewers'])
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
        Radio.chat(chat);
        Radio.talk(arg);
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
        let time = player.getCurrentTime();
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
    setPlayerReady(false);
    setChats(['']);
    setTalkMsg('');
    setViewers([])
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

  function handleProgress(progress:any) {
    // autoscrubbing

    var currentUnixTime = Date.now() / 1000;
    var delta = Math.ceil(currentUnixTime - spinTime);
    var duration = player.getDuration();
    let diff = Math.abs((delta % duration) - progress.playedSeconds)

    if(diff > 2) {

      if(!(our===tunePatP)) {
        // client scrub to host
        seekToDelta(spinTime);
        return;
      }

      // host assert new time
      Radio.setTime(spinUrl, progress.playedSeconds);
    }
  }


  if(!userInteracted) {
    return <InitialSplash onClick={ ()=>{
                  setUserInteracted(true);
                } } />
  }
  
  return (
    <div className="mx-2 md:mx-20 mt-2 text-xs font-mono">
      {/* <img src={bgImage} 
        className="w-full h-20"
        style={{
          objectFit:'cover',
        }}
      />
      <marquee class Name="absolute top-10 text-white"
      >{talkMsg}</marquee>  */}
      <div className="flex flex-row">
        <div className="inline-block mr-4 flex-1">
          <div
            className="flex my-2"
            >
              {/* header */}
          
            <button
            className="hover:pointer px-4 py-2 \
                      flex-initial mr-2 outline-none \
                      font-bold underline "
              style={{
                backdropFilter: 'blur(32px)',
                backgroundColor: helpMenuOpen ? 'lightblue' : ''
              }}
              onClick={() => {
                setHelpMenuOpen(!helpMenuOpen)
              }}
            >
              help
            </button>
            <span 
            className="bg-white rounded w-full flex-inital pl-4 \
                      relative overflow-wrap bg-opacity-70 p-1 py-2 "
            >
            {tunePatP}
            </span>

            <span 
            className="flex-end text-right w-full py-2 relative"
            >
            {viewers.length}{' viewers'}
            </span>

              
          </div>
    

          <div
            className=""
            style={{
              pointerEvents: our===tunePatP ? 'auto' : 'none'
            }}
          >
            {!playerReady &&
              <p className="text-center" >
                loading media player ...
              </p>
            }
            <ReactPlayer
              ref={playerRef}
              url={spinUrl}
              playing={true}
              width='100%'
              
              controls={true}
              loop={true}
          
              onReady={() => {
                // useEffect :
                // seektodelta()
                setPlayerReady(true);
              }}
              onSeek={e => console.log('onSeek', e)}
              onProgress={e => handleProgress(e)}


            />
            <div>
              <p className={'mt-2'}>viewers:</p>
              {viewers.map((x, i) => 
                    <span className={'mr-3'}
                      key={i}
                    >
                      {x}{', '}
                    </span>
                )}
            </div>
            {helpMenuOpen &&
              <div>
              <hr className="mt-2 "
              />
              <HelpMenu />
              </div>
              }
          </div>
            

        </div>

        <div
          className="flex-1 flex-col flex"
        >

          <div
            // className="flex-full h-full "
          >
            <ChatBox chats={chats} />
          </div>
          <div
          // className="flex-1"
            >
              {/* user input */}

            <hr/>
            <div className="flex">
              <input type="text"
                ref={inputReference}
                className="hover:pointer px-4 py-2 inline-block \
                          flex-1 outline-none border-none placeholder-gray-800 "
                autoCorrect={'off'}
                autoCapitalize={'off'}
                autoComplete={'off'}
                // autoFocus={false}
                placeholder="write your message..."
                id={chatInputId}
                onKeyDown={(e:any)=> {
                  if( e.key == 'Enter' ){
                    handleUserInput();
                  }
                }}
              />
                <button className="hover:pointer px-4 py-2\
                                  flex-initial ml-2 outline-none border-none"
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
        </div>

      </div>

      {/* <div 
        className="w-full \
                   mr-3 overflow-wrap mb-2"
        >
     </div> */}

    </div>
  );
}

