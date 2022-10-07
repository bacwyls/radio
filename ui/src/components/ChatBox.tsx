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
      return chatToHTML_default_bold(key, from, message);
    }


  const chatToHTML_default = (key:number, chat : string) => {
    return (
      <p
        key={key}
        className="p-1 \
                   hover:bg-gray-100"
        >
        {chat}
      </p>
    )
  }
  const chatToHTML_default_bold = (key:number, from : string, message: string) => {
    return (
      <p
        key={key}
        className="p-1 \
                   hover:bg-gray-100"
        >
          <span
            className={'font-bold mr-1'}
          >
          {from}
        </span>
        {message}
      </p>
    )
  }

  // for rendering pepes
  const chatToHTML_image = (key:number, from: string, imageUrl: string) => {
    return (
      <p
        key={key}
        className="p-1 \
                   hover:bg-gray-100"
        >
        <span
          className={'font-bold mr-1'}
        >
          {from}
        </span>
        <img src={imageUrl} className={'ml-2'}
          style={{
            height:'10vh',
            maxWidth:'10vh',
            objectFit:'cover',
            // backgroundColor:'black'
          }}
        />
        
    </p>
    )
  }
  const height="85vh"
  return (
    <div
        className="flex flex-col w-full"
        style={{
          height:height,
          maxHeight:height,
          overflowWrap:'break-word',
          verticalAlign:'bottom',
          justifyContent:'flex-end',
        }}
        
        >

        <div
          className="overflow-y-scroll"
          id={chatboxId}

        >
          {/* chatbox */}
          {chats.map((x, i) => 
                chatToHTML(i, chats[i])
            )}

      </div>
    </div>
  );
};
