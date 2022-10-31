import { sigil, reactRenderer } from "@tlon/sigil-js";
import React, { useEffect } from "react";
import { FC } from "react";
import { isValidPatp } from 'urbit-ob'
import { radio } from "../../api";
import { timestampFromTime } from "../../util";

interface IChatMessage {
    from?: string,
    time?: string,
    message: string,
    // key: number,
}

export const ChatMessage: FC<IChatMessage> = (props: IChatMessage) => {

    const { from, time, message } = props;

    const chatToHTML = (key: number, message: string, from?: string, time?: string) => {

        // let msg = chat.message;
        // let from = from;
        // let time = chat.time;

        // let split = chat.indexOf(': ');
        // if(split === -1) return chatToHTML_default(key, chat);

        // let from = chat.slice(0, split+2)
        // let message = chat.slice(split+2)

        // console.log(`processing chat from ${from} with message ${message}`)

        return (!from || !time)
            ? chatToHTML_default(key, message)
            : chatToHTMLWithTimeAndFrom(key, from, time, message);
    }

    const chatToHTML_default = (key: number, message: string) => {
        return (
            <p key={message.slice(-10)}>{message}</p>
        );
    }

    const chatToHTMLWithTimeAndFrom = (key: number, from: string, time: string, message: string) => {
        return (
            <div
                key={message.slice(-5) + ('' + time).slice(-5)}
                className="hover:bg-gray-100 px-1 py-1 break-all"
                style={{ fontSize: '.65rem' }}
            >
                <div className='flex justify-between items-center w-4/10'>
                    <div className='flex'>
                        <span className='bg-black p-0.5 mr-1 ml-1 rounded
                           flex justify-center items-center'>
                            {
                                isValidPatp(from) && from.length <= 14 && sigil({
                                    patp: from,
                                    renderer: reactRenderer,
                                    size: 18,
                                    colors: ['black', 'white'],
                                })}
                        </span>
                        <span className='font-bold mr-1'>
                            {from == radio.our ? 'You' : from}{':'}
                        </span>
                    </div>
                    <span className={'text-gray-500 flex'}>
                        {timestampFromTime(time)}
                    </span>
                </div>
                <div className='flex' style={{ paddingLeft: '2.2em' }}>
                    {
                        checkURL(message)
                            ? <img src={message} className={'ml-2 mt-1'}
                                style={{
                                    height: '100%',
                                    // width: '12vh',
                                    // minHeight:'1vh',
                                    maxHeight: '12vh',
                                    // minWidth:'1vw',
                                    // maxWidth:'15vw',
                                    objectFit: 'cover',
                                    // backgroundColor:'black'
                                }}
                            // onLoad={() => scrollToBottom()}
                            />
                            : message
                    }
                </div>
            </div >
        );
    }

    function checkURL(url: string) {
        return (url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp|webp)(\?(.*))?$/gmi) != null);
    }

    return (
        chatToHTML(1, message, from, time)
    )

}