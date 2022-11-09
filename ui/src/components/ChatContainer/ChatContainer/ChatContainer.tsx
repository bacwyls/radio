import React, { FC, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectIsChatFullScreen, selectIsLandscape, setIsChatFullScreen } from '../../../features/ui/uiSlice';
import { isPhone } from '../../../util';
import { ChatBox } from '../ChatBox/ChatBox';
import { ChatInputRow } from '../ChatInputRow';
import './ChatContainer.css';

interface IChatContainer {
}

export const ChatContainer: FC<IChatContainer> = (props: IChatContainer) => {

  const isChatFullScreen = useAppSelector(selectIsChatFullScreen);
  const isLandscape = useAppSelector(selectIsLandscape);

  return (
    <div
      className={`inline bg-white w-full h-full
           ${isPhone() && isLandscape && 'chat-container-phone-landscape'} 
      `}
    >
      <div
        className={` bg-white flex flex-col 
                     ${isPhone() ? '' : 'border border-gray-400  rounded shadow'} 
                      ${isChatFullScreen && 'chat-container-full'}
                  `}
      >
        <ChatBox />
        {(!isPhone() || isChatFullScreen) && < ChatInputRow />}
      </div>
    </div >
  );
}