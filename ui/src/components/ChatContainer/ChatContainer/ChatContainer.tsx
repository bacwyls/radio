import React, { FC, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectIsChatFullScreen, selectIsLandscape, setIsChatFullScreen } from '../../../features/ui/uiSlice';
import { isPhone } from '../../../util';
import { ChatBox } from '../ChatBox/ChatBox';
import { ChatInputRow } from '../ChatInputRow';
import './style.css';

interface IChatContainer {
}

export const ChatContainer: FC<IChatContainer> = (props: IChatContainer) => {

  const isChatFullScreen = useAppSelector(selectIsChatFullScreen);
  const isLandscape = useAppSelector(selectIsLandscape);

  return (
    <div
      className={`flex flex-col justify-between w-full mt-3 
           ${isPhone() && isLandscape && 'chat-container-phone-landscape'} 
      `}
      style={{ height: 'calc(100% - 3.25em)' }}
    >
      <ChatBox />
      {(!isPhone() || isChatFullScreen) && < ChatInputRow />}
    </div >
  );
}