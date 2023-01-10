import React, { FC, useEffect, } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { chopChats, selectChats } from '../../../features/station/stationSlice';
import { selectIsChatFullScreen } from '../../../features/ui/uiSlice';
import { isPhone } from '../../../util';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import './style.css';
import { ViewersButton } from '../Viewers/ViewersButton';

const ChatMessageMemo = React.memo(ChatMessage);

interface IChatBox {
}

export const ChatBox: FC<IChatBox> = (props: IChatBox) => {

  const chats = useAppSelector(selectChats);
  const chatboxId = 'chatbox-radio';
  const chatboxContainerId = 'chatbox-container-radio'

  const dispatch = useAppDispatch();

  const maxChats = 100;

  const isChatFullScreen = useAppSelector(selectIsChatFullScreen);

  useEffect(() => {
    scrollToBottom();

    if (chats.length > maxChats) {
      dispatch(chopChats(chats));
    }

  }, [chats]);

  useEffect(() => {
    scrollToBottom();
  }, [isChatFullScreen]);

  const scrollToBottom = () => {
    let chatWindow = document.getElementById(chatboxId) as HTMLDivElement;
    if (!chatWindow) return;
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

  return (
    <div
      className={`  
                  ${isPhone() ? 'chatbox-container-phone' : 'chatbox-container'}
                 ${isChatFullScreen ? 'chatbox-container-full' : ''}
                `}
    >
      <div
        className={`font-bold flex items-center justify-between rounded-md text-text-primary px-4
                     `}
        style={{
          height: '64px',
        }}
      >
        <span
          className='text-lg'
        >Chat</span>
        <ViewersButton />
      </div>
      <div
        id={chatboxContainerId}
        className={` 
                  ${isPhone() ? 'chatbox-phone' : 'chatbox'}
                  ${isChatFullScreen ? 'chatbox-full' : ''}
            `}
      >
        {chats && chats.length > 0 ?
          <div
            className={`overflow-y-auto overflow-x-hidden
          `}
            id={chatboxId}
          >
            {
              chats.map((x: any, i: any) =>
                <ChatMessageMemo
                  key={generateUniqueKey(x, i)}
                  from={x.from}
                  message={x.message}
                  time={x.time}
                />)
            }
          </div>
          :
          <div
            className={`flex justify-center items-center h-full w-full font-medium '
            `}
          >
            There are no messages
          </div>
        }
      </div >
    </div >
  );
};
