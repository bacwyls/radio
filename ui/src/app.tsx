import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { StatusBar } from './components/StatusBar';
import ReactPlayer from "react-player";

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export function App() {

  let synth = window.speechSynthesis;
  const voices  = speechSynthesis.getVoices();
  synth.voice = voices[0];
  const [talkMsg, setTalkMsg] = useState("");
  const [spinUrl, setSpinUrl] = useState("");
  const [statusSub, setStatusSub] = useState();
  useEffect(() => {
    if (!api || statusSub) return;
      api
        .subscribe({
            app: "tenna",
            path: "/radio-listen/client",
            event: handleSub,
            quit: subFail,
            err: subFail
        })
        .then((subscriptionId) => {
          setStatusSub(subscriptionId);
          });
  }, [api]);


  function handleSub(update) {
        if (Object.keys(update)[0] == "spin") {
            var updateSpin = update["spin"];
            setSpinUrl(updateSpin);
        }
        else if (Object.keys(update)[0] == "talk") {
            var updateTalk = update["talk"]
            var utterThis = new SpeechSynthesisUtterance(updateTalk);
            synth.speak(utterThis);
            setTalkMsg(updateTalk);
        }
      };
  function subFail() {
        console.log("fail!")
      };

/*
  useEffect(() => {
    async function init() {
      console.log("innit?");
      api.poke({
          app: 'radio',
          mark: 'radio-action',
        json: {'poast': "banana test message :))"}
        });
      api.poke({
          app: 'radio',
          mark: 'radio-action',
          json: {'show': null}
        });

      window.id = api.subscribe({
        app: "radio",
        path: "/radio-status",
        event: printEvent,
        quit: subFail,
        err: subFail
      });
    }

    init();
  }, []);
  */

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="max-w-md p-5 space-y-6 py-20">
        <h1 className="text-3xl font-bold">your bit radio</h1>
        <StatusBar
          statusMsg={talkMsg}
        />
        <div>
          <ReactPlayer
            url={spinUrl}
            playing={true} // TODO autoplay is inconsistent
            width='100%'
          />
        </div>
      </div>
    </main>
  );
}
