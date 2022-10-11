import React, { useEffect, useRef, useState } from 'react';
import Urbit from '@urbit/http-api';
import ReactPlayer from "react-player";
import { HelpMenu } from './components/HelpMenu';
import { InitialSplash } from './components/InitialSplash';
import { ChatBox } from './components/ChatBox';
import { Radio } from './lib';
import { NavItem } from './components/NavItem';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

const our = '~'+window.ship;
const watchParty = '~nodmyn-dosrux'
const tuneInitial = watchParty;

let radio : Radio;
radio = new Radio(our, api);


export function App() {

  // should really move this state into a real abstraction
  //  and split the usestate stuff into components
  //
  //  TODO useReducer
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
  const [helpMenuTop, setHelpMenuTop] = useState(0);
  const [helpMenuLeft, setHelpMenuLeft] = useState(0);

  const [navigationOpen, setNavigationOpen] = useState(false);

  const [playerReady, setPlayerReady] = useState(false);
  const [playerInSync, setPlayerInSync] = useState(true);



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

  useEffect(()=>{
    setInterval(()=>{
      // heartbeat to detect presence
      radio.ping();
    }, 1000*60*3)
  }, [])


  const initChats = [{'message':'','from':'','time':0}];
  const [chats, setChats] = useState(initChats)
  const maxChats = 100;
  useEffect(() => {
    // maximum chats
    if(chats.length > maxChats) {
      setChats(chats.slice(1));
    }
  }, [chats])

  useEffect(()=>{
    setPlayerInSync(true);
    radio.seekToDelta(spinTime)
  }, [playerReady])

  useEffect(() => {
    if(!radio.player) return;
      radio.player.url = spinUrl;
  }, [spinUrl]);

  useEffect(() => {
    if(!radio.player) return;
    if(!playerReady) return;
    setPlayerInSync(true);
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
          // let synth = window.speechSynthesis;
          var updateTalk = update["talk"];
          var utterThis = new SpeechSynthesisUtterance(updateTalk);
          
          setTalkMsg(updateTalk);
          
          if(!userInteracted) return;
          radio.synth.speak(utterThis);
          break;
        case "tune":
          let tune = update['tune'];
          setTunePatP(tune);
          radio.tunedTo = tune;
          if(tune===null) {
            resetPage();
            setUserInteracted(false); 
            // radio.tune(our)
            // alert('whoops, you left the radio station')
          } else {
            radio.ping();
          }
          break;
        case "chat":
          let chat = update['chat'];
          setChat(chat);
          // setChats(prevChats => [...prevChats, `${chat.from}: ${chat.message}`])  ;
          break;
        case 'viewers':
          setViewers(update['viewers'])
          break;
        case "public":
          setIsPublic(update['public'])
          break;
        case "chatlog":
          setChats(initChats)
          let chatlog = update['chatlog']
          for(let i = 0; i < chatlog.length; i++) {
            setChat(chatlog[i])
          }
          break;
      }
  };

  function setChat(chat:any) {
    setChats(prevChats => [...prevChats, chat]);
  }

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
        if(arg==='') arg=our;
        radio.chat(chat);
        tuneTo(arg)
        break;
      case 'background':
        radio.background(arg);
        radio.chat(chat);
        break;
      case 'time':
        setPlayerInSync(true);
        radio.seekToDelta(spinTime);
        radio.chat(chat);
        break;
      case 'set-time':
        radio.resyncAll(spinUrl);
        radio.chat(chat);
        break;
      case 'public':
        if(radio.tunedTo !== our) {
          return;
        }
        radio.public();
        radio.chat(chat);
        break;
      case 'private':
        if(radio.tunedTo !== our) {
          return;
        }
        radio.private();
        radio.chat(chat);
        break;
      case 'ping':
        radio.ping();
        // radio.chat(chat);
        break;
      case 'logout':
        radio.tune(null);
        break;
      //
      // image commands
      default:
        radio.chatImage(command);
        break;
      //
    }
  }

  function resetPage() {
    setPlayerReady(false);
    setChats(initChats);
    setTalkMsg('');
    setViewers([])
    setSpinUrl('');
    setNavigationOpen(false);
    setHelpMenuOpen(false);  
  }


  // parse from user input
  // e.g. `!command argument`
  function getCommandArg(chat:string) {
    // if(!(chat[0] === '!' || chat[0] === '|' || chat[0] === '+' || chat[0] === ':')) return;
    if(!(chat[0] === '!' )) return;

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

    if(our===radio.tunedTo) {
      // if(diff > 60) {
      //   console.log('host broadcasting new time')
      //   radio.setTime(spinUrl, progress.playedSeconds);
      // }
      if(diff > 3) {
        setPlayerInSync(false);
      }
      return;
    }
    // we arent the host
    if(diff > 2) {
        // client scrub to host
        console.log('client scrubbing to host')
        radio.seekToDelta(spinTime);
        return;
    }
  }


  if(!userInteracted) {
    return <InitialSplash onClick={ ()=>{
                  setUserInteracted(true);
                } } />
  }
  
function tuneTo(patp:string | null) {
  radio.tune(patp)
  radio.tunedTo = null;
  setTunePatP(patp+' (LOADING)');
  // setTunePatP(patp);i
  resetPage();
}


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
            className="flex mt-2 align-middle table w-full"
            // header above player
          >

            <span className="text-2xl align-middle">
              📻
            </span> 
            {/* tuned to */}
            <span 
            className="flex-full ml-4 px-2 align-middle"
            >
              {tunePatP}{' '}{isPublic ? '(public)' : '(private)'}
            </span>
            </div>

            <div
              // className="flex-initial"
              // style={{
              //   position:'fixed',
              //   top:0,
              //   right:0
              // }}
              className="mb-2 flex flex-row"
            >
             {/* <span className="">navigation:</span> */}

             <button
                  className={`hover:pointer button border-black \
                            border p-1 text-center mt-2 mr-2 \
                            flex-initial ${navigationOpen ? 'font-bold' : ''}`}
                  style={{
                    whiteSpace:'nowrap'
                  }}

                  onClick={()=>
                  {
                    setNavigationOpen(!navigationOpen)
                  }}
                >
                  navigation
                </button> 
            {navigationOpen && 
              <div
              className='w-full flex flex-row border border-black \
              border-t-0 border-b-0 px-2 mt-2 overflow-scroll'
              >
                  <NavItem tuneTo={tuneTo} patp={our} title='my station' />
                  <NavItem tuneTo={tuneTo} patp={'~nodmyn-dosrux'} flare={'🎉'}/>
                  {/* <NavItem tuneTo={tuneTo} patp={'~littel-wolfur'} />
                  <NavItem tuneTo={tuneTo} patp={'~sorwet'} /> */}
                  <NavItem tuneTo={tuneTo} patp={'~poldec-tonteg'} flare={'🎷'} />
                  <NavItem tuneTo={tuneTo} patp={null} logout />

              </div>
              }
           </div>   

          <div>

              {/* number of viewers */}
            {/* <span 
            className="flex-end text-right w-full py-2 relative align-right"
            >
             {viewers.length}{' viewers'}
            </span> */}
           
              
          </div>

       
    
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
            className={'flex flex-row'}
              // player footer
            >
            
            <div
            className={'flex-1' }
            >
              <p className={'mt-2 '}>{viewers.length}{' viewers:'}</p>
              {viewers.map((x, i) => 
                    <span className={'mr-3'}
                      key={i}
                    >
                      {x}{', '}
                    </span>
                )}
                
            </div>
              {!playerInSync && 
                          <div> 

                <button
                className={`hover:pointer px-4 py-2 \
                          flex-initial outline-none \
                          font-bold underline border-black border-t-0 \
                          text-yellow-500 `}
                onClick={(e) => {
                  radio.seekToDelta(spinTime);
                  setPlayerInSync(true);
                }}
              >
                resync self
              </button>
              {tunePatP===our && 
              <button
                className={`hover:pointer px-4 py-2 \
                          flex-initial outline-none \
                          font-bold underline border-black border-t-0 \
                          text-blue-500 `}
                style={{
                  whiteSpace:'nowrap'
                }}
                onClick={(e) => {
                  radio.resyncAll(spinUrl)
                }}
              >
                resync all
              </button>
              }
              </div>
              }

          {/* help button */}
          <div>
            <button
              className={`hover:pointer px-4 py-2 \
                        flex-initial outline-none \
                        font-bold underline border-black border-t-0 \
                        ${helpMenuOpen ? 'border' : ''}`}
              onClick={(e) => {
                setHelpMenuLeft(e.clientX);
                setHelpMenuTop(e.clientY);
                setHelpMenuOpen(!helpMenuOpen);
              }}
            >
              help
            </button>
            {helpMenuOpen &&
              <HelpMenu left={helpMenuLeft} top={helpMenuTop} />
            }
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

