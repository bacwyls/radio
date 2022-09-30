import React, { useEffect, useRef, useState } from 'react';
import Urbit from '@urbit/http-api';
import ReactPlayer from "react-player";
import { HelpMenu } from './components/HelpMenu';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export function App() {

  const [talkMsg, setTalkMsg]   = useState("");
  const [spinUrl, setSpinUrl]   = useState("");
  const [spinTime, setSpinTime] = useState(0);
  const [tunePatP, setTunePatP] = useState("");
  const [radioSub, setRadioSub] = useState(0);

  const [update, setUpdate] = useState();

  const [userInteracted, setUserInteracted] = useState(false);

  const [helpMenuOpen, setHelpMenuOpen] = useState(false);



  let player : any;
  let playerRef = (p:any) => {
    player = p;
  }

  // useEffect(() => {
  //     seekToDelta(spinTime);
  // }, [spinTime, spinUrl]);

  function seekToDelta(startedTime:number) {
    if(startedTime === 0) return;


    if(!player) {
      // console.log('reactplayer ref is undefined')
      return;
    }
    // } else {
    //   console.log('reactplayer is defined')
    // }

    var currentUnixTime = Date.now() / 1000;

    // console.log('1')

    var delta = currentUnixTime - startedTime;



    var duration = player.getDuration();
    // console.log(`delta: ${delta}, duration: ${player.getDuration()}`)

    if(delta < 1) delta = 1;
    let res;
    if(!duration) {

      res = player.seekTo(delta, 'seconds');
    } else {

      res = player.seekTo((delta % duration))
    }


   
  }

  useEffect(() => {
    if(!player) return
      player.url = spinUrl
  }, [spinUrl]);

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
          api.poke({
            app: 'tenna',
            mark: 'radio-action',
          json: {'tune': tuneInitial}  // TODO tune based on whats in state
          });
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
    api.unsubscribe(radioSub);
    // TODO unsub tower
    api.delete();
  };


  function handleSub(update:any) {
    setUpdate(update);
  }
  useEffect(() => {
    if(!update) return;
    handleUpdate(update);
  }, [update]);

  function handleUpdate(update:any) {
      console.log("update", update);
      let mark = Object.keys(update)[0]
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
          //
          // random voice lol
          // some of them sound funny, others are incomprehensible, and they differ by device/browser
          // const voices  = speechSynthesis.getVoices();
          // var voice = voices[Math.floor(Math.random() * voices.length)];
          // utterThis.voice = voice;
          setTalkMsg('🗣️ '+updateTalk);
          if(!userInteracted) return;
          synth.speak(utterThis);
          break;
        case "tune":
          setTunePatP(update['tune'])
          break;
        case "chat":
          let chat = update['chat']
          setChats(prevChats => [...prevChats, `${chat.from}: ${chat.message}`])  
          break;
        case 'view':
          setBgImage(update['view'])
          break;
      }
  };
  function subFail() {
      console.log("fail!")
  };



  function handleChat() {
    let input = document.getElementById(chatInputId) as HTMLInputElement;

    let chat = input.value;
    input.value = ''

    if (chat ==='') return;


    // check for commands
    let got = getCommandArg(chat);

    if(!got) {
      sendChat(chat)
      return;
    }
    let command = got.command;
    let arg = got.arg;
  
     

    switch(command) {
      case 'talk':
        let talkMsg = arg;
        sendChat(chat)
        api.poke({
          app: 'tenna',
          mark: 'radio-action',
          json: {talk : talkMsg}
          });
        break;
      case 'play':
        let spinUrl = arg;
        sendChat(chat)
        api.poke({
          app: 'tenna',
          mark: 'radio-action',
          json: {spin :
                  {
                    url: spinUrl,
                    time: 0
                  }
                }
          });
        break;
      case 'tune':
        let tuneTo = arg

        api.poke({
          app: 'tenna',
          mark: 'radio-action',
          json: {tune : tuneTo}
          });
        setChats(initChats);
        setTunePatP('')
        setTalkMsg('')
        setBgImage('')
        setSpinUrl('')
        break;
      case 'background':
        let viewUrl = arg

        api.poke({
          app: 'tenna',
          mark: 'radio-action',
          json: {view : viewUrl}
          });
        sendChat(chat)
        break;
      case 'datboi':
        sendChat(datboiURL)
        break;
      case 'pepe':
        sendChat(pepeURL)
        break;
      case 'wojak':
        sendChat(wojakURL)
        break;
      case 'time':
        seekToDelta(spinTime)
        sendChat(chat)

        break;
      case 'public':
        if(tunePatP !== our) {
          return;
        }
        api.poke({
          app: 'tower',
          mark: 'radio-action',
          json: {public : true}
          });
        sendChat(chat)
        break;
      case 'private':
        if(tunePatP !== our) {
          return;
        }
        api.poke({
          app: 'tower',
          mark: 'radio-action',
          json: {public : false}
          });
        sendChat(chat)
        break;
    }
    

    // if((command === 'bg')) {
    //   setBgImage(arg)
    // }
    
  }
  const datboiURL = 'https://i.giphy.com/media/vc5L6VoTB6tnW/giphy.webp'
  const pepeURL = 'https://i.imgur.com/IGaYzV6.gif'
  const wojakURL = 'https://i.imgur.com/gsTARXr.gif'

  function sendChat(chat:string) {
    api.poke({
      app: 'tenna',
      mark: 'radio-action',
      json: {'chat': {
                     'from':our,
                     'message':chat
                     } 
            }
     });
  }

  function getCommandArg(chat:string) {
    if(chat[0] !== '!') return;

    let splitIdx = chat.indexOf(' ');
    if(splitIdx === -1) return {'command':chat.slice(1), 'arg':''};
    let command = chat.slice(1,splitIdx);
    let arg = chat.slice(splitIdx+1);
    // console.log('command', command)
    // console.log('arg', arg)
    return {'command': command, 'arg':arg}
  }

  const our = '~'+window.ship
  // const tuneInitial = '~nodmyn-dosrux';
  const tuneInitial = our;

  useEffect(() => {
    // TODO ugly duplication
    let our = '~'+window.ship
    let tuneInitial = our;

    async function init() {
      console.log("init");
      // setTunePatP(tuneTarget);

    }
    init();
  }, []);


  // const initChats = [ 'set player to current time: `!time`',
  //                     'OTHER:',
  //                     '-----------',
  //                     '.... (!spin supports youtube, soundcloud, twitch, vimeo, or arbitrary audio/video files)',
  //                     '!spin https://www.youtube.com/watch?v=3vLHelBuTRM',
  //                     '!view https://wallpapercave.com/wp/5w05B2R.jpg',
  //                     '!talk hello world',
  //                     'DJ COMMANDS:',
  //                     '-----------',
  //                     '!tune ~nodmyn-dosrux',
  //                     'NAVIGATION:',
  //                     '================================'];

  const initChats = ['']

  const [chats, setChats] = useState<Array<string>>(initChats)
  const maxChats = 16;
  useEffect(() => {
    // maximum chats
    if(chats.length > maxChats) {
      setChats(chats.slice(1))
    }
  }, [chats])

  // const [bgImage, setBgImage] = useState('https://0x0.st/oS_V.png')
  const [bgImage, setBgImage] = useState('')

  
  const chatInputId ='radio-chat-input'

  function checkURL(url : string) {
    return(url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp|webp)(\?(.*))?$/gmi) != null);

  }

 

  const chatToHTML = (key:number, chat: string) => {

      if(chat[0] !== '~') return chatToHTML_default(key, chat);

      let split = chat.indexOf(': ');
      if(split === -1) return chatToHTML_default(key, chat);
      
      let from = chat.slice(0, split+2)
      let message = chat.slice(split+2)

      // console.log(`processing chat from ${from} with message ${message}`)

      if(checkURL(message)) {
        return chatToHTML_image(key, from, message);
      }
      return chatToHTML_default(key, chat);
      

    }

  const chatToHTML_default = (key:number, chat: string) => {
    return (
      <p
        key={key}
        style={{
          // TODO display images
          fontFamily:'monospace',
          marginTop:8
        }}
        >
        {chat}
          </p>
          )
  }

  const chatToHTML_image = (key:number, from: string, imageUrl: string) => {
    return (
      <p
        key={key}
        style={{
          // TODO display images
          fontFamily:'monospace',
          marginTop:8
        }}
        >
          <span>
        {from}
        </span>
        <img src={imageUrl} className={'ml-2'} />
          
          </p>
          )
  }

  if(!userInteracted) {
    return (
      <main className="flex justify-center overflow-scroll bg-black items-center">

        <div
        className="bg-white mt-2 rounded p-2 lg:w-1/2 mx-6 content-center"
        >
          <h1 className="text-lg font-bold m-2">urbit radio</h1>
          <p className="m-2">first, interact with the webpage so we can autoplay videos</p>
          <button
              className="button border-black border rounded p-1 text-center m-2"

            onClick={()=>
            {
              setUserInteracted(true);
            }}
          >
            continue
          </button> 
        </div>
      </main>
    )
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
      <div className="inline-block lg:w-1/2">

      <div
        className="flex mt-2"
        >
          {/* header */}
      
        <button
        className="hover:pointer px-4 py-2 inline-block bg-white rounded flex-initial mr-2 outline-none border-none placeholder-gray-800 bg-opacity-70 hover:bg-opacity-90 font-mono font-bold text-sm "
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
            className="bg-white rounded w-full flex-full pl-4 font-mono relative overflow-wrap bg-opacity-70 p-1 py-2 text-sm"
            // style={{
            //   userSelect:'none'
            // }}

            
            >{'current station: '}{tunePatP}</span>

        </div>

        {helpMenuOpen && 
         <HelpMenu />
        }
          
        <div
        className="bg-black mt-2 rounded w-full flex-none relative py-3 mr-3 overflow-wrap font-bold font-mono text-sm"
        style={{
            backdropFilter: 'blur(32px)'
        }}>
          {/* player */}
          <p className="text-center pt-2 pb-5 text-white" >{talkMsg}</p>
          <ReactPlayer
            ref={playerRef}
            url={spinUrl}
            playing={true} // TODO autoplay is inconsistent
            width='100%'
            controls={true}
            loop={true}
            onReady={() => {
              // console.log('onReady')
              seekToDelta(spinTime);
            }}

          />

        </div>

        <div className="my-2 bg-white rounded w-full bg-opacity-0"
            // }}
          >
            {/* user input */}

          <div className="flex">
            <input type="text"
              className="hover:pointer px-4 py-2 inline-block bg-white rounded flex-1 outline-none border-none placeholder-gray-800 bg-opacity-70 focus:bg-opacity-90 font-mono text-sm"
              placeholder="sup guys"
              style={{
                backdropFilter: 'blur(32px)'
               }}
              id={chatInputId}
              onKeyDown={(e:any)=> {
                if( e.key == 'Enter' ){
                  handleChat();
                }
              }}
            />
              <button className="hover:pointer px-4 py-2 inline-block bg-white rounded flex-initial ml-2 outline-none border-none placeholder-gray-800 bg-opacity-70 hover:bg-opacity-90 font-mono text-sm"
                      style={{
                        backdropFilter: 'blur(32px)'
                      }}
                      onClick={() => {
                        handleChat();
                      }}
              >
              send
            </button>
            </div>
          </div>

      <div
        className="bg-white mt-2 rounded w-full flex-none relative p-3 mr-3 overflow-wrap font-bold bg-opacity-70 mb-2"
        style={{
            backdropFilter: 'blur(32px)'
        }}
        >
      {/* chatbox */}
      {chats.map((x, i) => 
                          chatToHTML(i, chats[chats.length-1-i])
                      )}
     </div>


    </div>
    </main>
  );
}

