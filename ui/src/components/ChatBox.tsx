import { useRef, useEffect, useState } from "react";
import { ChatMessage, chopChats, selectChats } from "../features/station/stationSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import React from "react";
import { timestampFromTime } from "../util";
import { isMobile } from "react-device-detect";
import { chatInputId } from "./ChatColumn";
import { playerColumnId } from "./PlayerColumn";
import DOMPurify from 'dompurify';


export const chatboxId = "radio-chatbox";



type ChatInnerMessageProps = {
  message: string;

};

const ChatInnerMessage: React.FC<ChatInnerMessageProps> = ({ message }) => {
  const linkRegex = /^https?:\/\/\S+$/i;
  const imageRegex = /^https?:\/\/\S+\.(?:jpg|jpeg|png|gif|webp)$/i;
  // const emojiRegex = /^\p{Emoji}+$/u;
  const playRegex = /^!play /;

  if (linkRegex.test(message)) {
    let sanitizedUrl = sanitize(message);
    if (imageRegex.test(sanitizedUrl)) {
      return chatInnerImg(sanitizedUrl);
    } else {
      return (
        safeLinkTag(sanitizedUrl)
      );
    }
    // this is torture
    // } else if (emojiRegex.test(message)) {
    //   return <span style={{ fontSize: '2em' }}>{message.substring(0, 24)}</span>;
  } else if (playRegex.test(message)) {
    // special case for !play links because thats useful
    let url = message.substring(6);
    return (
      <>
        {"!play "}
        {safeLinkTag(url)}
      </>
    )
  } else {
    return <>{message}</>;
  }
};

function sanitize(rawURL: string) {
  const sanitizedUrl = DOMPurify.sanitize(rawURL, {
    ALLOWED_TAGS: [], // disallow any HTML tags
    ALLOWED_ATTR: [], // disallow any HTML attributes
    ALLOW_DATA_ATTR: false, // disallow data: URLs
    ALLOWED_URI_REGEXP: /^https?:\/\//i, // allow only HTTP(S) URLs
  });
  return sanitizedUrl;
}
function safeLinkTag(rawURL: string) {
  let sanitizedUrl = sanitize(rawURL);
  return (
    <a href={sanitizedUrl} target="_blank"
      rel="noopener noreferrer"
      className="text-blue-800 hover:underline">
      {sanitizedUrl}
    </a>
  )
}

function autoScrollChatBox() {
  const chatbox = document.getElementById(chatboxId);
  if (chatbox?.lastChild instanceof Element) {
    // chatbox.lastChild.scrollIntoView({ behavior: "smooth" });
    chatbox.lastChild.scrollIntoView();
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
      <ChatInnerMessage message={chat.message}
      />
    </p>
  );
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
      }}
      onLoad={() => autoScrollChatBox()}
    />
  );
};

export function ChatBox({ }: {}) {
  const [chatboxHeight, setChatboxHeight] = useState(window.innerHeight);
  const chats = useAppSelector(selectChats);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Scroll to the bottom of the chat box whenever a new chat message is added
    autoScrollChatBox();
  }, [chats]);

  useEffect(() => {
    const chatField = document.getElementById(chatInputId) as HTMLDivElement;
    if (chatField) {
      setChatboxHeight(calcChatboxHeight());
    }

    const handleWindowResize = () => {
      setChatboxHeight(calcChatboxHeight());
      autoScrollChatBox();
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  }, []);

  const maxChats = 100;
  useEffect(() => {
    // maximum chats
    if (chats.length > maxChats) {
      dispatch(chopChats(chats));
    }
  }, [chats]);


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

  const height = `${chatboxHeight.toString()}px`

  return (
    <div
      className="flex-1 overflow-y-auto flex font-mono"
      style={{
        height: height,
        maxHeight: height,
        justifyContent: "flex-end",
      }}
    >
      <div
        className="flex-1 flex flex-col h-full"
        style={{
          verticalAlign: "bottom",
          justifyContent: "flex-end",
          wordBreak: 'break-word',
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
