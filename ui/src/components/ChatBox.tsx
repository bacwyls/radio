import { useRef, useEffect, useState } from "react";
import { ChatMessage, selectChats } from "../features/station/stationSlice";
import { useAppSelector } from "../app/hooks";
import React from "react";
import { timestampFromTime } from "../util";
import { isMobile } from "react-device-detect";
import { chatInputId } from "./ChatColumn";
import { playerColumnId } from "./PlayerColumn";

export const chatboxId = "radio-chatbox";

function autoScrollChatBox() {
  const chatbox = document.getElementById(chatboxId);
  if (chatbox?.lastChild instanceof Element) {
    chatbox.lastChild.scrollIntoView({ behavior: "smooth" });
  }
}

const chatToHTML = (key: number, chat: ChatMessage) => {
  return (
    <p key={key} className="p-1 hover:bg-gray-100 mb-1">
      <span className={"mr-2 text-gray-500"}>
        {timestampFromTime(chat.time)}
      </span>
      <span className={"font-bold mr-1"}>
        {chat.from}
        {":"}
      </span>
      {renderChatMessage(chat.message)}
    </p>
  );
};

const renderChatMessage = (message: string) => {
  const words = message.split(" ");
  const elements = [];
  let numImages = 0;
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (checkImageURL(word)) {
      if (numImages < 1) {
        elements.push(chatInnerImg(word));
        numImages++;
      }
    } else if (checkURL(word)) {
      elements.push(
        <a
          key={i}
          href={word}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {word}
        </a>
      );
    } else {
      elements.push(word + " ");
    }
  }
  return elements;
};

const checkURL = (url: string) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + //port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return pattern.test(url);
};

const chatInnerImg = (src: string) => {
  return (
    <img
      key={src}
      src={src}
      className={"ml-2"}
      style={{
        height: "100%",
        maxHeight: "12vh",
        objectFit: "cover",
        // display:'inline-block'
      }}
      onLoad={() => autoScrollChatBox()}
    />
  );
};

const checkImageURL = (url: string) => {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
};

export function ChatBox({ }: {}) {
  const [chatboxHeight, setChatboxHeight] = useState(0);
  const chats = useAppSelector(selectChats);
  useEffect(() => {
    // Scroll to the bottom of the chat box whenever a new chat message is added
    autoScrollChatBox();
  }, [chats]);

  useEffect(() => {
    const chatField = document.getElementById(chatInputId) as HTMLDivElement;
    if (chatField) {
      setChatboxHeight(calcChatboxHeight());
    }
  }, []);

  const calcChatboxHeight = () => {
    const chatField = document.getElementById(chatInputId) as HTMLDivElement;
    if (isMobile) {
      const playerWrapper = document.getElementById(
        playerColumnId
      ) as HTMLDivElement;
      if (!playerWrapper) return window.innerHeight;
      return (
        window.innerHeight -
        playerWrapper.getBoundingClientRect().height -
        chatField.getBoundingClientRect().height
      );
    }
    return window.innerHeight - chatField.getBoundingClientRect().height;
  };

  const height = `${chatboxHeight.toString()}px`;

  return (
    <div
      className="flex-1 overflow-y-auto flex font-mono"
      style={{
        height: isMobile ? height : "auto",
        maxHeight: isMobile ? height : "auto",
        justifyContent: "flex-end",
      }}
    >
      <div
        className="flex-1 flex flex-col h-full"
        style={{
          verticalAlign: "bottom",
          justifyContent: "flex-end",
          overflowWrap: "break-word",
        }}
      >
        <div id={chatboxId} className="overflow-y-scroll">
          {chats.map((x: any, i: any) => chatToHTML(i, chats[i]))}
        </div>
      </div>
    </div>
  );
}
