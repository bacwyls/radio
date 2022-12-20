import React, { FC, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectIsChatFullScreen, selectIsDarkMode, selectIsLandscape, setIsChatFullScreen } from '../../../features/ui/uiSlice';
import { isPhone } from '../../../util';
import { ChatBox } from '../ChatBox/ChatBox';
import { ChatInputRow } from '../ChatInputRow';
import './style.css';

interface IChatContainer {
}

export const ChatContainer: FC<IChatContainer> = (props: IChatContainer) => {

  const isChatFullScreen = useAppSelector(selectIsChatFullScreen);
  const isLandscape = useAppSelector(selectIsLandscape);
  const isDarkMode = useAppSelector(selectIsDarkMode);

  return (
    <div
      className={`
      chat-container
      flex flex-col justify-between  h-full shadow-lg border-l 
           ${isPhone() && isLandscape && 'chat-container-phone-landscape'}
           ${isDarkMode ? 'bg-black-95 border-black-85 text-black-10' : 'bg-white border-gray-200'} 
      `}
    >
      <ChatBox />
      {(!isPhone() || isChatFullScreen) && < ChatInputRow />}
    </div >
  );
}