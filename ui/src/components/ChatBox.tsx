import { useRef, useEffect, useState, useCallback } from "react";
import { ChatMessage, chopChats, selectChats } from "../features/station/stationSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import React from "react";
import { getRecencyText, timestampFromTime } from "../util";
import { isMobile } from "react-device-detect";
import { chatInputId } from "./ChatColumn";
import { playerColumnId } from "./PlayerColumn";
import DOMPurify from 'dompurify';


export const chatboxId = "radio-chatbox";



type ChatInnerMessageProps = {
  message: string;
  maybeAutoScrollChatBox: () => void;
};

const ChatInnerMessage: React.FC<ChatInnerMessageProps> = ({ message, maybeAutoScrollChatBox }) => {
  const linkRegex = /^https?:\/\/\S+$/i;
  const imageRegex = /^https?:\/\/\S+\.(?:jpg|jpeg|png|gif|webp)$/i;
  // const emojiRegex = /^\p{Emoji}+$/u;
  const playRegex = /^!play /;

  if (linkRegex.test(message)) {
    let sanitizedUrl = sanitize(message);
    if (imageRegex.test(sanitizedUrl)) {
      return chatInnerImg(sanitizedUrl, maybeAutoScrollChatBox);
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
    return (
    <>{message}</>
    )
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



const chatInnerImg = (src: string, maybeAutoScrollChatBox: () => void) => {
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
      onLoad={maybeAutoScrollChatBox}
    />
  );
};

export function ChatBox({ }: {}) {
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const chatboxRef = useRef<HTMLDivElement>(null);
  const chats = useAppSelector(selectChats);

  const dispatch = useAppDispatch();

  const [unseenNewMessagesCount, setUnseenNewMessagesCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isScrolledUp) {
      setUnseenNewMessagesCount(prev => prev + 1);
    }
  }, [chats]);

  useEffect(() => {
    // Only auto-scroll if not scrolled up
    if (!isScrolledUp) {
      autoScrollChatBox();
    }
  }, [chats, isScrolledUp]);

  const maxChats = 100;
  useEffect(() => {
    // maximum chats
    if (!isScrolledUp && chats.length > maxChats) {
      dispatch(chopChats(chats));
    }
  }, [chats]);

  const handleScroll = () => {
    if (chatboxRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatboxRef.current;
      const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setIsScrolledUp(!isScrolledToBottom);
      
      if (isScrolledToBottom) {
        setUnseenNewMessagesCount(0);
        if(chats.length > maxChats) {
          dispatch(chopChats(chats));
        }
      }
    }
  };

  const scrollToBottom = () => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
      setIsScrolledUp(false);
      setUnseenNewMessagesCount(0);
    }
  };

  const maybeAutoScrollChatBox = useCallback(() => {
    if (!isScrolledUp) {
      autoScrollChatBox();
    }
  }, [isScrolledUp]);

  const chatToHTML = useCallback((key: number, chat: ChatMessage) => {
    return (
      <div key={key} className="p-1 hover:bg-gray-100 mb-2 text-[0.7rem]">
        <div className="block">
          <span className={"font-bold mr-1"}>
            {chat.from}
            {":"}
          </span>
          <span className={"mr-2 text-gray-500 text-[0.6rem]"}>
            {getRecencyText(currentTime - (chat.time * 1000))}
          </span>
        </div>
        <ChatInnerMessage 
          message={chat.message}
          maybeAutoScrollChatBox={maybeAutoScrollChatBox}
        />
      </div>
    );
  }, [currentTime, maybeAutoScrollChatBox]);

  return (
    <div
      className="flex-1 h-full overflow-y-auto overflow-x-hidden flex font-mono relative"
      style={{
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
        <div 
          id={chatboxId} 
          className="overflow-y-auto overflow-x-hidden"
          style={{
          }}
          ref={chatboxRef}
          onScroll={handleScroll}
        >
          {chats.map((chat, i) => chatToHTML(i, chat))}
        </div>
      </div>
      {(isScrolledUp) &&(
        <button
          className="absolute bottom-0 right-0 border border-gray-400 text-gray-700 bg-white px-3 py-1 shadow-md hover:bg-gray-100 transition-colors duration-200"
          onClick={scrollToBottom}
          style={{
            userSelect:"none",
          }}
        >
          {unseenNewMessagesCount > 0 ? `${unseenNewMessagesCount} new ${unseenNewMessagesCount === 1 ? 'message' : 'messages'}`
            : 'latest'}
        </button>
      )}
    </div>
  );
}