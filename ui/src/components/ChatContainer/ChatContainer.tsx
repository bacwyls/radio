import React, { FC } from 'react';
import { ChatBox } from './ChatBox';
import { ChatInputRow } from './ChatInputRow';

interface IChatContainer {
  // inputReference: React.RefObject<HTMLInputElement>;
}

export const ChatContainer: FC<IChatContainer> = (props: IChatContainer) => {

  return (
    <div
      className="w-full lg:w-1/3 bg-white rounded"
    >
      <div className='shadow rounded flex flex-col'>
        <ChatBox />
        <ChatInputRow />
      </div>

    </div >
  );
}