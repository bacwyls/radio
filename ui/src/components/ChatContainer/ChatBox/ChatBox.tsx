import React, { FC, useEffect, } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { chopChats, selectChats } from '../../../features/station/stationSlice';
import { selectIsChatFullScreen } from '../../../features/ui/uiSlice';
import { isPhone, scrollToBottom } from '../../../util';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import { ViewersButton } from '../Viewers/ViewersButton';
import './style.css';

const ChatMessageMemo = React.memo(ChatMessage);
const chatboxContainerId = 'chatbox-container-radio';
export const chatboxId = 'chatbox-radio';

interface IChatBox {
}

export const ChatBox: FC<IChatBox> = (props: IChatBox) => {

  const chats = useAppSelector(selectChats);

  const dispatch = useAppDispatch();

  const maxChats = 100;

  const isChatFullScreen = useAppSelector(selectIsChatFullScreen);

  useEffect(() => {

    if (chats.length > maxChats) {
      dispatch(chopChats(chats));
    }

  }, [chats]);


  useEffect(() => {
    scrollToBottom(chatboxId, 'auto');
  }, [isChatFullScreen]);

  return (
    <div
      className={`  
                  ${isPhone() ? 'chatbox-container-phone' : 'chatbox-container'}
                 ${isChatFullScreen ? 'chatbox-container-full' : ''}
                `}
    >
      <div
        className={`font-bold flex items-center justify-between rounded-md text-text-default px-4 `}
        style={{
          height: '2.7rem',
          minHeight: '2.7rem',
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
            className={`overflow-y-auto overflow-x-hidden smooth-scroll`}
            id={chatboxId}
          >
            {
              chats.map((chat: any) =>
                <ChatMessageMemo
                  key={('' + chat.time) + chat.from}
                  from={chat.from}
                  message={chat.message}
                  time={chat.time}
                />)
            }
          </div>
          :
          <div
            className={`flex justify-center items-center h-full w-full font-medium '`}
          >
            There are no messages
          </div>
        }
      </div >
    </div >
  );
};
