import React, { FC, useEffect, useState } from 'react';
interface IChatBox {
  chats: string[]
}

  export const ChatBox: FC<IChatBox> = (props: IChatBox) => {

  const {chats} = props;

  const chatboxId = 'chatbox-radio';

  useEffect(()=>{
    let chatWindow = document.getElementById(chatboxId) as HTMLDivElement; 
    var xH = chatWindow.scrollHeight; 
    chatWindow.scrollTo(0, xH);
  }, [chats])

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
        className="mb-2"
        // style={{
        //   fontFamily:'monospace',
        //   marginBottom:8
        // }}
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
        className="mb-2"

        // style={{
        //   fontFamily:'monospace',
        //   marginBottom:8
        // }}
        >
        <span>
          {from}
        </span>
        <img src={imageUrl} className={'ml-2'}
          style={{
            height:'100px',
            maxWidth:'100px',
            objectFit:'cover',
          }}
        />
        
    </p>
    )
  }

  return (
    <div
        className="w-full \
                   mr-3 overflow-scroll mt-2"
        style={{
          height:'388px',
          maxHeight:'388px',
          justifyContent:'flex-end',
        }}
        id={chatboxId}
        >
      {/* chatbox */}
      {chats.map((x, i) => 
            chatToHTML(i, chats[i])
        )}
     </div>
  );
};
