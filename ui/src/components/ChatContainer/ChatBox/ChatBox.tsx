import { Question } from 'phosphor-react';
import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { chopChats, selectChats } from '../../../features/station/stationSlice';
import { selectIsChatFullScreen, selectIsDarkMode } from '../../../features/ui/uiSlice';
import { isPhone } from '../../../util';
import { Help } from '../Help/Help';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import './style.css';
import { ViewersMenu } from '../../UpperRow/Viewers/ViewersMenu/ViewersMenu';
import { ViewersButton } from '../../UpperRow/Viewers/ViewersButton';

const ChatMessageMemo = React.memo(ChatMessage);

interface IChatBox {
}

export const ChatBox: FC<IChatBox> = (props: IChatBox) => {

  const chats = useAppSelector(selectChats);
  const chatboxId = 'chatbox-radio';
  const chatboxContainerId = 'chatbox-container-radio'

  const dispatch = useAppDispatch();

  const maxChats = 100;

  // const viewers = useAppSelector(selectViewers);
  const viewers = ['~harlys-forbec', '~tasrym-sorrup-fidwed-sipwyn', "~bosdys", '~martyr-martel',]

  const isChatFullScreen = useAppSelector(selectIsChatFullScreen);
  const isDarkMode = useAppSelector(selectIsDarkMode);

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
      className={` flex flex-col 
                  ${isPhone() ? 'chatbox-container-phone' : 'chatbox-container'}
                    ${isChatFullScreen ? 'chatbox-container-full' : ''}
                `}
    >
      <div
        className={`font-extrabold flex items-center justify-between
                     z-10 
                     ${isDarkMode ? 'text-black-10' : ''}
                     
                     `}
        style={{
          padding: '0 24px 0 24px',
          height: '64px',
          fontSize: '20px',
          // boxShadow: chats.length > 0 ? (isDarkMode ? 'rgba(0, 0, 0, .8) 0px 4px 8px -16px, rgba(0, 0, 0, .8) 0px 12px 20px -16px' : 'rgba(0, 0, 0, 0.2) 0px 4px 4px -16px, rgba(0, 0, 0, 0.2) 0px 12px 20px -16px') : 'none',
        }}
      >
        Chat
        <ViewersButton />
        {/* <Help /> */}
      </div>
      <div
        id={chatboxContainerId}
        className={`  w-full flex flex-col

                  ${isPhone() ? 'chatbox-phone' : 'chatbox'}
                  ${isChatFullScreen ? 'chatbox-full' : ''}
            `}
        style={{
          justifyContent: 'flex-end',
        }}
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
            className={`flex justify-center items-center h-full w-full  '
            `}
          >
            There are no messages
          </div>
        }
      </div >
    </div >
  );
};
