import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { chopChats, selectChats } from '../../features/station/stationSlice';
import { ChatMessage } from './ChatMessage';

const ChatMessageMemo = React.memo(ChatMessage);

export const ChatBox: FC = () => {

  const chats = useAppSelector(selectChats);
  const chatboxId = 'chatbox-radio';

  const dispatch = useAppDispatch();

  const maxChats = 100;

  useEffect(() => {
    scrollToBottom();
    if (chats.length > maxChats) {
      dispatch(chopChats(chats));
    }
  }, [chats]);

  const scrollToBottom = () => {
    let chatWindow = document.getElementById(chatboxId) as HTMLDivElement;
    var xH = chatWindow.scrollHeight;
    chatWindow.scrollTo(0, xH);
  }

  const generateUniqueKey = (chat, index) => {
    if (!chat.time || !chat.from) {
      return index;
    }
    else
      return ('' + chat.time) + chat.from;
  }

  const height = "68vh";

  return (
    <div
      className='border-t rounded-t border-r
       border-l border-gray-400 flex flex-col'
      style={{
        height: '100%',
        minHeight: height,
        maxHeight: height,
      }}
    >
      <div
        className='font-bold flex items-center px-2 
                     bg-white border-b border-gray-400 rounded-t'
        style={{ minHeight: "min(8vh, 4em)" }}
      >
        Chat
      </div>
      <div
        className="flex flex-col w-full 
                  "
        style={{
          justifyContent: 'flex-end',
          height: 'calc(68vh - min(8vh, 4em)',
          // height: 'calc(100% - min(8vh, 4em))'
        }}
      >
        <div
          className="overflow-y-auto"
          id={chatboxId}
        >
          {chats && chats.length > 0 ?
            chats.map((x: any, i: any) =>
              <ChatMessageMemo
                key={generateUniqueKey(x, i)}
                from={x.from}
                message={x.message}
                time={x.time}
              />)
            :
            <div
              className='flex justify-center items-center'
              style={{ height: height }}
            >
              There are no messages
            </div>
          }</div>
      </div >
    </div>
  );
};
