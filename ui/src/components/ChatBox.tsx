import React, { FC, useState } from 'react';
interface IChatBox {
  chats: string[]
}

  export const ChatBox: FC<IChatBox> = (props: IChatBox) => {

  const {chats} = props;
  function checkURL(url : string) {
    return(url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp|webp)(\?(.*))?$/gmi) != null);

  }

  const chatToHTML = (key:number, chat: string) => {

      if(chat[0] !== '~') return chatToHTML_default(key, chat);

      let split = chat.indexOf(': ');
      if(split === -1) return chatToHTML_default(key, chat);
      
      let from = chat.slice(0, split+2)
      let message = chat.slice(split+2)

      // console.log(`processing chat from ${from} with message ${message}`)

      if(checkURL(message)) {
        return chatToHTML_image(key, from, message);
      }
      return chatToHTML_default(key, chat);
    }

  const chatToHTML_default = (key:number, chat: string) => {
    return (
      <p
        key={key}
        style={{
          fontFamily:'monospace',
          marginTop:8
        }}
        >
        {chat}
      </p>
    )
  }

  // for rendering pepes
  const chatToHTML_image = (key:number, from: string, imageUrl: string) => {
    return (
      <p
        key={key}
        style={{
          fontFamily:'monospace',
          marginTop:8
        }}
        >
        <span>
          {from}
        </span>
        <img src={imageUrl} className={'ml-2'} />
        
    </p>
    )
  }

  return (
    <div
        className="bg-white mt-2 rounded w-full flex-none relative \
                   p-3 mr-3 overflow-wrap font-bold bg-opacity-70 mb-2"
        style={{
            backdropFilter: 'blur(32px)'
        }}
        >
      {/* chatbox */}
      {chats.map((x, i) => 
            chatToHTML(i, chats[chats.length-1-i])
        )}
     </div>
  );
};
