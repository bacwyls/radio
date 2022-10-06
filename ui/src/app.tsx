import React, { useEffect, useRef, useState } from 'react';
import Urbit from '@urbit/http-api';
import ReactPlayer from "react-player";
import { HelpMenu } from './components/HelpMenu';
import { InitialSplash } from './components/InitialSplash';
import { ChatBox } from './components/ChatBox';
import { Radio } from './lib';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

const our = '~'+window.ship;
const tuneInitial = our;

let radio : Radio;
radio = new Radio(our, api);


export function App() {

  // should probably move this state into a radio object
  //  and split the usestate stuff into components
  //
  const [talkMsg, setTalkMsg]   = useState("");
  const [spinUrl, setSpinUrl]   = useState("");
  const [spinTime, setSpinTime] = useState(0);
  const [tunePatP, setTunePatP] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const [radioSub, setRadioSub] = useState(0);

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

  useEffect(()=>{
    radio.seekToDelta(spinTime)
  }, [playerReady])

  useEffect(() => {
    if(!radio.player) return;
      radio.player.url = spinUrl;
  }, [spinUrl]);

  useEffect(() => {
    if(!radio.player) return;
    if(!playerReady) return;
    radio.seekToDelta(spinTime)
  }, [spinTime]);



  // initialize subscription
  useEffect(() => {
    if (!api || radioSub) return;
      api
        .subscribe({
            app: "tenna",
            path: "/frontend",
            event: handleSub,
            quit: ()=> console.log('radio quit'),
            err: (e)=> console.log('radio err',e ),
        })
        .then((subscriptionId) => {
          setRadioSub(subscriptionId);
          radio.tune(tuneInitial);
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
    radio.tune(null);
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
        case "public":
          setIsPublic(update['public'])
          break;
      }
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
      radio.chat(chat);
      return;
    }

    // interpreting message as a command
    let command = got.command;
    let arg = got.arg;
    switch(command) {
      case 'talk':
        radio.chat(chat);
        radio.talk(arg);
        break;
      case 'play':
        radio.spin(arg);
        radio.chat(chat);
        break;
      case 'tune':
        if(arg===tunePatP) return;
        if(arg==='') arg=our;
        tuneTo(arg)
        break;
      case 'background':
        radio.background(arg);
        radio.chat(chat);
        break;
      case 'time':
        radio.seekToDelta(spinTime);
        radio.chat(chat);
        break;
      case 'set-time':
        let time = radio.player.getCurrentTime();
        if(!time) return;
        if(!spinUrl) return;
        radio.setTime(spinUrl, time);
        radio.chat(chat);
        break;
      case 'public':
        if(tunePatP !== our) {
          return;
        }
        radio.public();
        radio.chat(chat);
        break;
      case 'private':
        if(tunePatP !== our) {
          return;
        }
        radio.private();
        radio.chat(chat);
        break;
      //
      // image commands
      case 'datboi':
        radio.datboi();
        break;
      case 'pepe':
        radio.pepe();
        break;
      case 'wojak':
        radio.wojak();
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
    var duration = radio.player.getDuration();
    let diff = Math.abs((delta % duration) - progress.playedSeconds)

    if(diff > 2) {

      if(!(our===tunePatP)) {
        // client scrub to host
        console.log('client scrubbing to host')
        radio.seekToDelta(spinTime);
        return;
      }

      // host assert new time
      console.log('host broadcasting new time')
      radio.setTime(spinUrl, progress.playedSeconds);
    }
  }


  if(!userInteracted) {
    return <InitialSplash onClick={ ()=>{
                  setUserInteracted(true);
                } } />
  }
  
function tuneTo(patp:string) {
  radio.tune(patp)
  // setTunePatP(patp+' (LOADING)');
  setTunePatP(patp);
  resetPage();
}

const watchParty = '~nodmyn-dosrux'

  return (
    <div className="mx-2 md:mx-20 text-xs font-mono">
      
      {/* <img src={bgImage} 
        className="w-full h-20"
        style={{
          objectFit:'cover',
        }}
      />
      
      <marquee className="absolute top-9 text-white text-lg"
      >
        {talkMsg}
      </marquee>
      
      */}

      <div className="flex flex-row">

        <div className="inline-block mr-4 w-2/3"
          // player column
        >
          
          <div
            className="flex my-2 align-middle table"
            // header above player
          >
          
          {/* help button */}
            <button
            className="hover:pointer px-4 py-2 \
                      flex-2 mr-2 outline-none \
                      font-bold underline "
              style={{
                backgroundColor: helpMenuOpen ? 'lightblue' : ''
              }}
              onClick={() => {
                setHelpMenuOpen(!helpMenuOpen)
              }}
            >
              help
            </button>
            {/* tuned to */}
            <span 
            className="flex-inital"
            >
              {tunePatP}{' '} {isPublic ? '(public)' : '(private)'}
            </span>


            {tunePatP!==watchParty && 
              <button
                className="hover:pointer button border-black \
                          border rounded p-1 text-center m-2
                          flex-initial ml-4"
                style={{
                  whiteSpace:'nowrap'
                }}

                onClick={()=>
                {
                  tuneTo(watchParty)
                }}
              >
                🎉 watch party 🎉
              </button> 
            }
            {tunePatP!==our && 
              <button
                className="hover:pointer button border-black \
                          border rounded p-1 text-center m-2
                          flex-initial ml-4"
                style={{
                  whiteSpace:'nowrap'
                }}

                onClick={()=>
                {
                  tuneTo(our)
                }}
              >
                home
              </button> 
            }


              {/* number of viewers */}
            {/* <span 
            className="flex-end text-right w-full py-2 relative align-right"
            >
             {viewers.length}{' viewers'}
            </span> */}

              
          </div>

          {helpMenuOpen &&
            <div>
            <hr className="mt-2 "
            />
            <HelpMenu />
            </div>
          }
    
          <div
            // className="content-center align-middle justify-center"
            // style={{
            //   // pointerEvents: our===tunePatP ? 'auto' : 'none',
            // }}
          >
            {!playerReady &&
              <p className="text-center" >
                loading media player ...
              </p>
            }
            <ReactPlayer
              ref={radio.playerRef}
              url={spinUrl}
              playing={true}
              width='100%'
              height='80vh'
              controls={true}
              loop={true}
          
              onReady={() => {
                // useEffect :
                setPlayerReady(true);
              }}
              // onSeek={e => console.log('onSeek', e)}
              onProgress={e => handleProgress(e)}
              
              style={{
                backgroundColor:'lightgray'
              }}

              config={{
                file: {
                  // makes the audio player look nice
                  attributes: { style: {height:'50%', width:'100%',}}
                },
              }}

            />
            <div
            className={'flex-row'}
              // player footer
            >
            
            <div>
              <p className={'mt-2'}>{viewers.length}{' viewers:'}</p>
              {viewers.map((x, i) => 
                    <span className={'mr-3'}
                      key={i}
                    >
                      {x}{', '}
                    </span>
                )}
            </div>
            </div>
          </div>
            

        </div>

        <div
          className="flex-1 flex-col flex"
          style={{
            maxWidth:'33%'
          }}
          // chatbox column
        >

          <ChatBox chats={chats} />
          <div
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
    </div>
  );
}

