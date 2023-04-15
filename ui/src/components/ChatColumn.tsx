import React, { FC, useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";
import { useAppDispatch } from "../app/hooks";
import { ChatBox } from "./ChatBox";
import { Radio } from "../lib";


interface IChatColumn {
  fullscreen?: boolean;
}

export const chatInputId = "radio-chat-input";

export const ChatColumn: FC<IChatColumn> = (props: IChatColumn) => {
  const dispatch = useAppDispatch();

  const inputReference = useRef<HTMLInputElement>(null);

  const radio = new Radio();

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



  function processInput() {
    radio.handleUserInput(dispatch);
  }

  const InputBox = () => {
    return (
      <div className="flex border-gray-300 border-t">
        <input
          type="text"
          ref={inputReference}
          className="hover:pointer px-4 py-2 inline-block \
                  flex-1 outline-none border-none placeholder-gray-800"
          autoCorrect={"off"}
          autoCapitalize={"off"}
          autoComplete={"off"}
          // autoFocus={true}
          placeholder="write your message..."
          id={chatInputId}
          onKeyDown={(e: any) => {
            if (e.key == "Enter") {
              processInput();
            }
          }}
          style={{ width: "100%", boxSizing: "border-box" }}
        />
        <button
          className="hover:pointer px-4 py-2\
                  flex-initial ml-2 outline-none border-none"
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
