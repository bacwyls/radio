import { Megaphone, PlayCircle } from "phosphor-react";
import React, { useState } from "react";
import { FC } from "react";
import { radio } from "../../../api";
import { getCommandArg, isPhone, timestampFromTime } from "../../../util";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './style.css';
import { Sigil } from "../../Sigil";

interface IChatMessage {
    from?: string,
    time?: string,
    message: string,
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

    const renderMessage = (message) => {
        let isCommand = getCommandArg(message);
        let [showTooltip, setShowTooltip] = useState(false);

        const handleCopy = (command: string) => {
            if (command != 'play') return;

            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 1000)
        }

        return (
            isCommand ?
                <div
                    className={`flex flex-col  font-medium 
                    rounded-md  text-text-primary bg-background-textarea
                        ${isCommand.command == 'play' && 'cursor-pointer'}
                `}
                    style={{
                        marginLeft: '1.6em',
                        lineHeight: '24px',
                        maxHeight: isCommand.command == 'play' ? '5rem' : 'none',
                    }}
                    onClick={() => handleCopy(isCommand!.command)}
                >
                    {isCommand.command == 'play' &&
                        <CopyToClipboard text={isCommand.arg}>
                            <div
                                style={{
                                    padding: '0.5em 1em',
                                }}
                            >
                                <div className="flex justify-between relative"
                                >
                                    <div className="flex items-center  font-bold	 ">
                                        <PlayCircle className="mr-0.5" size={20} weight="bold" /> Play
                                    </div>
                                    {showTooltip &&
                                        <span className="text-sm">
                                            Copied!
                                        </span>
                                    }
                                </div>
                                <div
                                    className='  break-words whitespace-normal play'
                                >
                                    {isCommand.arg}
                                </div>
                            </div>
                        </CopyToClipboard>
                    }
                    {
                        isCommand.command == 'talk' &&
                        <div
                            style={{
                                padding: '0.5em 1em',
                            }}>
                            <div className="flex items-center text-center font-bold">
                                <Megaphone className='mr-0.5 mb-0.5' size={20} weight="bold" /> Talk
                            </div>
                            <div className="break-words whitespace-normal">
                                {isCommand.arg}
                            </div>
                        </div>
                    }
                </div >
                :
                <div
                    className={`font-medium break-words whitespace-normal text-text-primary
                        `}
                    style={{
                        paddingLeft: '2em',
                        lineHeight: '26px',
                    }}
                >
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
                            :
                            message
                    }
                </div>
        )
    }

    const chatToHTMLWithTimeAndFrom = (key: number, from: string, time: string, message: string) => {
        return (
            <div
                key={message.slice(-5) + ('' + time).slice(-5)}
                className={` chat-message   
                    ${!isPhone() && 'hover:bg-hover-mild'}
                       
        `}
            >
                <div className={`flex justify-between items-center w-4/10 mb-1 text-text-secondary ${isPhone() && 'mr-1'} `}>
                    <div className={`flex items-center w-full
                    `}
                    >
                        <span className={`  mr-1.5 h-4 w-4
                          rounded flex justify-center 
                          items-center bg-background-icon
 
                          `}
                            style={{ minWidth: '1rem' }}
                        >
                            <Sigil patp={from} size={18} />
                        </span>
                        <span className='font-semibold mr-1 w-full'
                            style={{ lineHeight: '16px', }}
                        >
                            {from == radio.our ? 'You' : from}{''}
                        </span>
                    </div>
                    <span
                        className={` font-bold  text-sm
        `}
                    >
                        {timestampFromTime(time)}
                    </span>
                </div>
                {
                    renderMessage(message)
                }
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