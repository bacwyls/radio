import { sigil, reactRenderer } from "@tlon/sigil-js";
import React from "react";
import { FC } from "react";
import { isValidPatp } from 'urbit-ob'
import { radio } from "../../api";
import { useAppSelector } from "../../app/hooks";
import { selectIsDarkMode } from "../../features/ui/uiSlice";
import { isPhone, timestampFromTime } from "../../util";

interface IChatMessage {
    from?: string,
    time?: string,
    message: string,
}

export const ChatMessage: FC<IChatMessage> = (props: IChatMessage) => {
    const { from, time, message } = props;

    const isDarkMode = useAppSelector(selectIsDarkMode);

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
                className={` py-1 break-all
                    ${isDarkMode ? 'hover:bg-hover-gray-dark ' : 'hover:bg-hover-gray-light '}
                `}
                style={{
                    fontSize: '.65rem',
                    color: `${isDarkMode ? 'rgb(254,255,254' : ''}`
                }}
            >
                <div className={`flex justify-between items-center w-4/10  ${isPhone() && 'mr-1'}`}>
                    <div className='flex'>

                        {
                            isValidPatp(from) && from.length <= 14 &&

                            <span
                                className={`p-0.5 mr-1 rounded
                           flex justify-center items-center
                           `}
                                style={{
                                    backgroundColor: `${isDarkMode ? 'rgb(253,253,253)' : 'black'}`
                                }}
                            >{
                                    sigil({
                                        patp: from,
                                        renderer: reactRenderer,
                                        size: 18,
                                        colors: isDarkMode ? ['rgb(253,253,253)', 'black'] : ['black', 'white'],
                                    })
                                }</span>
                        }
                        <span className='font-bold mr-1'>
                            {/* {from} */}
                            {from == radio.our ? 'You' : from}{':'}
                        </span>
                    </div>
                    <span
                        className={` font-bold flex mr-1 
                                     ${isDarkMode ? 'text-gray-dark ' : 'text-gray-light'}
                    `}

                        style={{
                            fontSize: '.6rem'
                        }}
                    >
                        {timestampFromTime(time)}
                    </span>
                </div>
                <div className={`flex ${isPhone() && 'mr-1'}`} style={{ paddingLeft: '2.2em', lineHeight: '.8rem' }}>
                    {
                        checkURL(message)
                            ? <img src={message} className={'ml-2 mt-1'}
                                style={{
                                    height: '100%',
                                    maxHeight: '12vh',
                                    objectFit: 'cover',
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