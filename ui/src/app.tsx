import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import ReactPlayer from "react-player";

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export function App() {

  const [talkMsg, setTalkMsg] = useState("");
  const [spinUrl, setSpinUrl] = useState("");
  const [tunePatP, setTunePatP] = useState("");
  const [radioSub, setRadioSub] = useState(0);

  useEffect(() => {
    if (!api || radioSub) return;
      api
        .subscribe({
            app: "tenna",
            path: "/radio-listen/client",
            event: handleSub,
            quit: subFail,
            err: subFail
        })
        .then((subscriptionId) => {
          setRadioSub(subscriptionId);
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
      console.log("update", update);
      let mark = Object.keys(update)[0]
      switch(mark) {
        case "spin":
          var updateSpin = update["spin"];
          setSpinUrl(updateSpin);
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
          synth.speak(utterThis);
          setTalkMsg(updateTalk);
          break;
        case "tune":
          console.log("tune");
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
      case 'spin':
        let spinUrl = arg;
        sendChat(chat)
        api.poke({
          app: 'tenna',
          mark: 'radio-action',
          json: {spin : spinUrl}
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
        break;
      case 'view':
        let viewUrl = arg

        api.poke({
          app: 'tenna',
          mark: 'radio-action',
          json: {view : viewUrl}
          });
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
    console.log('command', command)
    console.log('arg', arg)
    return {'command': command, 'arg':arg}
  }

  const our = '~'+window.ship
  const tuneInitial = '~bep';
  useEffect(() => {
    async function init() {
      console.log("init");
      // setTunePatP(tuneTarget);
      api.poke({
          app: 'tenna',
          mark: 'radio-action',
        json: {'tune': tuneInitial}  // TODO tune based on whats in state
        });
    }
    init();
  }, []);


  const initChats = [ 'image links will render in the chatbox. there are some presets for this: !datboi !pepe !wojak',
                      'or just send any message to chat',
                      '---------------------------',
                      '.... (!spin supports youtube, soundcloud, twitch, vimeo, or arbitrary audio/video files)',
                      '!spin https://www.youtube.com/watch?v=KGAAhzreGWw',
                      '!view https://images.hdqwalls.com/download/2017-blade-runner-2049-movie-4k-de-2560x1080.jpg',
                      '!talk hello world',
                      '!tune ~sampel-palnet',
                      'URBIT RADIO:',
                      '================================'];

  const [chats, setChats] = useState<Array<string>>(initChats)
  const maxChats = 12;
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

      console.log(`processing chat from ${from} with message ${message}`)

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
      {/* <h1 className="text-3xl font-bold text-center py-5"
          style={{

          textShadow: "1px 1px 2px gray",

        }}>
        your bit radio
      </h1> */}
      <div
        className="bg-white mt-2 rounded w-full flex-none relative overflow-wrap bg-opacity-70 p-1"
        style={{
        //     boxShadow: "inset 0.2em 0.2em 0.2em 0 rgba(0,0,0,0.1), inset -0.2em -0.2em 0.2em 0 rgba(0,0,0,0.5)",
            backdropFilter: 'blur(32px)'
        }}
        >
          <p className="font-mono ml-2" >{'radio://'}{our}{'/station/'}{tunePatP}</p>
          {/* <p className="font-mono" >{'tenna: '}{our}</p> */}
        </div>
          
        <div
        className="bg-black mt-2 rounded w-full flex-none relative p-3 mr-3 overflow-wrap font-bold"
        style={{
            // boxShadow: "inset 0.2em 0.2em 0.2em 0 rgba(0,0,0,0.1), inset -0.2em -0.2em 0.2em 0 rgba(0,0,0,0.5)",
            backdropFilter: 'blur(32px)'
        }}>
          <p className="text-center pt-2 pb-5 text-white" >{talkMsg}</p>
          <ReactPlayer
            url={spinUrl}
            playing={true} // TODO autoplay is inconsistent
            width='100%'
          />

        </div>

        <div className="my-2 bg-white rounded w-full bg-opacity-0"
            // style={{
            //     // boxShadow: "inset 0.2em 0.2em 0.2em 0 rgba(0,0,0,0.1), inset -0.2em -0.2em 0.2em 0 rgba(0,0,0,0.5)",
            //     backdropFilter: 'blur(32px)'

            // }}
          >

          <div className="flex">
            <input type="text"
              className="hover:pointer px-4 py-2 inline-block bg-white rounded flex-1 outline-none border-none placeholder-gray-800 bg-opacity-70 focus:bg-opacity-90"
              placeholder="!talk you smell like cheese"
              style={{
                // boxShadow: "inset 0.2em 0.2em 0.2em 0 rgba(0,0,0,0.1), inset -0.2em -0.2em 0.2em 0 rgba(0,0,0,0.5)",
                backdropFilter: 'blur(32px)'
               }}
              id={chatInputId}
              onKeyDown={(e:any)=> {
                if( e.key == 'Enter' ){
                  handleChat();
                }
              }}
            />
              <button className="hover:pointer px-4 py-2 inline-block bg-white rounded flex-initial ml-2 outline-none border-none placeholder-gray-800 bg-opacity-70 hover:bg-opacity-90"
                      style={{
                        backdropFilter: 'blur(32px)'
                      }}
                      onClick={handleChat}
              >
              send
            </button>
            </div>
          </div>

          <div
        className="bg-white mt-2 rounded w-full flex-none relative p-3 mr-3 overflow-wrap font-bold bg-opacity-70 mb-2"
        style={{
        //     boxShadow: "inset 0.2em 0.2em 0.2em 0 rgba(0,0,0,0.1), inset -0.2em -0.2em 0.2em 0 rgba(0,0,0,0.5)",
            backdropFilter: 'blur(32px)'
        }}
        >
      {chats.map((x, i) => 
                          chatToHTML(i, chats[chats.length-1-i])
                      )}
        </div>

      </div>

      
    </main>
  );
}

