import React, { FC, useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { Radio } from "../lib";

import { handleUserInput } from "../util";
// import { ChatBox } from './ChatBox';
import {
  selectSpinUrl,
  selectSpinTime,
  selectTunePatP,
  selectChats,
  chopChats,
} from "../features/station/stationSlice";
import { ChatBox } from "./ChatBox";

let radio: Radio = new Radio();

interface IChatColumn {
  fullscreen?: boolean;
}

export const chatInputId = "radio-chat-input";

export const ChatColumn: FC<IChatColumn> = (props: IChatColumn) => {
  const spinUrl = useAppSelector(selectSpinUrl);
  const chats = useAppSelector(selectChats);
  const spinTime = useAppSelector(selectSpinTime);
  const tunePatP = useAppSelector(selectTunePatP);
  const dispatch = useAppDispatch();

  const inputReference = useRef<HTMLInputElement>(null);

  const fullscreen = props.fullscreen;
  let maxWidth = isMobile ? "100%" : "33%";

  useEffect(() => {
    // autofocus input
    if (!inputReference) return;
    if (!inputReference.current) return;
    window.setTimeout(() => {
      // use a slight delay for better UX
      // @ts-ignore
      if (!inputReference.current) return;
      inputReference.current.focus();
    }, 1000);
  }, []);

  const maxChats = 100;
  useEffect(() => {
    // maximum chats
    if (chats.length > maxChats) {
      dispatch(chopChats(chats));
    }
  }, [chats]);

  function processInput() {
    handleUserInput(radio, dispatch, chatInputId, spinTime, spinUrl, tunePatP);
  }

  const InputBox = () => {
    return (
      <div className="flex border-gray-300 border-t">
        <input
          type="text"
          ref={inputReference}
          className="hover:pointer px-4 py-2 inline-block \
                        flex-1 outline-none border-none placeholder-gray-800 "
          autoCorrect={"off"}
          autoCapitalize={"off"}
          autoComplete={"off"}
          autoFocus={true}
          placeholder="write your message..."
          id={chatInputId}
          onKeyDown={(e: any) => {
            if (e.key == "Enter") {
              processInput();
            }
          }}
        />
        <button
          className="hover:pointer px-4 py-2\
                        flex-initial ml-2 outline-none border-none"
          style={{ backdropFilter: "blur(32px)" }}
          onClick={() => processInput()}
        >
          send
        </button>
      </div>
    );
  };

  return (
    <div
      className="text-xs font-mono flex flex-col"
      style={{
        flex: isMobile ? "2" : "1",
        order: "1",
        maxWidth: maxWidth,
      }}
    >
      <div className="flex-1 overflow-y-auto">
        <ChatBox />
      </div>
      <div>
        <InputBox />
      </div>
    </div>
  );
};
