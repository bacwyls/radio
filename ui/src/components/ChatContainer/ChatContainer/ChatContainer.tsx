import { ArrowLeft } from 'phosphor-react';
import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectIsChatFullScreen, selectIsDarkMode, selectIsLandscape, selectIsViewersMenuOpen, setIsChatFullScreen } from '../../../features/ui/uiSlice';
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
  const isViewersMenuOpen = useAppSelector(selectIsViewersMenuOpen);

  const dispatch = useAppDispatch();

  return (
    <div
      className={`
         ${isPhone() ? 'chat-container-phone' : 'chat-container'}
         ${isChatFullScreen && 'chat-container-full'}
         ${!isPhone() && isDarkMode && 'filter drop-shadow-md-dark'}
           ${isDarkMode ? 'bg-black-95 border-black-85 text-black-10' : 'bg-white  border-black-10'} 
      `}
    >
      <ChatBox />
      {(!isPhone() || (isChatFullScreen && !isViewersMenuOpen)) && < ChatInputRow />}
    </div >
  );
}