import React, { FC } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectIsChatFullScreen, selectIsViewersMenuOpen } from '../../../features/ui/uiSlice';
import { isPhone } from '../../../util';
import { ChatBox } from '../ChatBox/ChatBox';
import { ChatInputRow } from '../ChatInputRow';
import './style.css';

interface IChatContainer {
}

export const ChatContainer: FC<IChatContainer> = (props: IChatContainer) => {

  const isChatFullScreen = useAppSelector(selectIsChatFullScreen);
  const isViewersMenuOpen = useAppSelector(selectIsViewersMenuOpen);

  return (
    <div
      className={`
         ${isPhone() ? 'chat-container-phone' : 'chat-container'}
         ${isChatFullScreen && 'chat-container-full'}
      `}
    >
      <ChatBox />
      {(!isPhone() || (isChatFullScreen && !isViewersMenuOpen)) && < ChatInputRow />}
    </div >
  );
}