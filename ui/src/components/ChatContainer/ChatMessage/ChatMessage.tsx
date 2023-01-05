import { Megaphone, PlayCircle } from "phosphor-react";
import React, { useState } from "react";
import { FC } from "react";
import { isValidPatp } from 'urbit-ob'
import { radio } from "../../../api";
import { useAppSelector } from "../../../app/hooks";
import { selectIsDarkMode } from "../../../features/ui/uiSlice";
import { getCommandArg, isPhone, renderSigil, timestampFromTime } from "../../../util";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './style.css';

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

    const renderMessage = (message) => {
        let isCommand = getCommandArg(message);
        let [showTooltip, setShowTooltip] = useState(false);

        const handleCopy = (command: string) => {
            if (command != 'play') return;

            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false),
                1000
            )
        }

        return (
            isCommand ?
                <div
                    className={`flex flex-col  font-medium 
                    rounded-md ${isPhone() && ''}
                ${isDarkMode ? ' bg-black-80 text-black-10' : 'bg-black-10 text-black-90 '}
                        }
                        ${isCommand.command == 'play' && 'cursor-pointer'}
                `
                    }
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
                                        <span style={{ fontSize: '14px' }}>
                                            Copied!
                                        </span>
                                    }
                                </div>
                                <div
                                    className={`  break-words whitespace-normal
                                            play
                                            `}
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
                    className={`font-medium break-words whitespace-normal 
                     ${isDarkMode ? 'text-black-10' : 'text-black-90'}
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
                className={` overflow-x-hidden w-full   
                    ${isPhone() ?
                        (isDarkMode ?
                            'text-black-30' : '')
                        :
                        (isDarkMode ?
                            'hover:bg-black-90 text-black-30' : 'hover:bg-black-4 ')
                    }
        `}
                style={{
                    paddingTop: '10px',
                    paddingLeft: '24px',
                    paddingBottom: '10px',
                    paddingRight: '24px',
                    marginRight: 'calc(-1 * calc(25vw - 100%))'
                }}
            >
                <div className={`flex justify-between items-center w-4/10 mb-0.5 ${isPhone() && 'mr-1'} `}>
                    <div className={`flex items-center w-full
                    `}
                    >
                        <span className={`  mr-1.5 h-4 w-4
                          rounded flex justify-center 
                          items-center
                          ${isDarkMode ? 'bg-black-70' : 'bg-black-80'}
 
                          `}
                            style={{ minWidth: '1rem' }}
                        >{
                                from && isValidPatp(from) && from.length <= 14 &&
                                renderSigil(from, 18, isDarkMode)
                            }
                        </span>
                        <span className='font-semibold mr-1 w-full'
                            style={{ lineHeight: '16px', }}
                        >
                            {from == radio.our ? 'You' : from}{''}
                        </span>
                    </div>
                    <span
                        className={` font-bold  
        `}
                        style={{
                            fontSize: '14px',
                        }}
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