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

  const height = "60vh";

  return (
    <div
      className="flex flex-col w-full bg-white  \
      border-gray-400 border-b border-t "
      style={{
        height: height,
        maxHeight: height,
        overflowWrap: 'break-word',
        verticalAlign: 'bottom',
        justifyContent: 'flex-end',
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
          <div className='flex justify-center items-center'
            style={{ height: height }}
          >
            There are no messages
          </div>
        }
      </div>
    </div >
  );
};
