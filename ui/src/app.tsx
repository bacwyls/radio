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
          break;
      }
  };
  function subFail() {
      console.log("fail!")
  };

  function handleTune() {
  }

  useEffect(() => {
    async function init() {
      console.log("init");
      setTunePatP("~"+window.ship);
      api.poke({
          app: 'tenna',
          mark: 'radio-action',
        json: {'tune': "~"+window.ship}  // TODO tune based on whats in state
        });
    }
    init();
  }, []);

  return (
    <main className="flex justify-center h-screen"
           style={{
                  backgroundImage: "url(https://0x0.st/oS_V.png)",
                  backgroundPosition: 'center center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                 }}>
      <div className="inline-block lg:w-1/2">
      {/* <h1 className="text-3xl font-bold text-center py-5"
          style={{

          textShadow: "1px 1px 2px gray",

        }}>
        your bit radio
      </h1> */}
          
        <div
        className="bg-white mt-2 rounded w-full flex-none relative p-3 mr-3 overflow-wrap font-bold"
        style={{
            boxShadow: "inset 0.2em 0.2em 0.2em 0 rgba(0,0,0,0.1), inset -0.2em -0.2em 0.2em 0 rgba(0,0,0,0.5)",
        }}>
          <p className="text-center pt-2 pb-5" >{talkMsg}</p>
          <ReactPlayer
            url={spinUrl}
            playing={true} // TODO autoplay is inconsistent
            width='100%'
          />

        </div>

        <div className="my-2 p-3 bg-white rounded w-full"
            style={{
                boxShadow: "inset 0.2em 0.2em 0.2em 0 rgba(0,0,0,0.1), inset -0.2em -0.2em 0.2em 0 rgba(0,0,0,0.5)",
            }}
          >

          <div className="flex">
            <input id="patp-input" type="text"
              className="hover:pointer px-4 py-2 inline-block bg-white rounded border-gray-400 border-2 flex-1"
              placeholder="!talk you smell like cheese"
            />
              <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-blue-500 hover:border-blue-700 border-2 flex-initial">
              send
            </button>
            </div>
          </div>

      </div>
    </main>
  );
}

