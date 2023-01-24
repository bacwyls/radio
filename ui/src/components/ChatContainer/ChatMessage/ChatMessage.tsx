import { Megaphone, PlayCircle } from "phosphor-react";
import React, { useEffect, useState, } from "react";
import { FC } from "react";
import { radio } from "../../../api";
import { getCommandArg, isPhone, timestampFromTime } from "../../../util";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Sigil } from "../../Sigil";
import './style.css';

interface IChatMessage {
    from: string,
    time: string,
    message: string,
}

export const ChatMessage: FC<IChatMessage> = (props: IChatMessage) => {
    const { from, time, message } = props;

    const renderMessage = (message) => {
        let isCommand = getCommandArg(message);
        let [showTooltip, setShowTooltip] = useState(false);

        const handleCopy = (command: string) => {
            if (command != 'play') return;

            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 1000)
        }

        return (
            (isCommand && (isCommand.command == 'play' || isCommand.command == 'talk')) ?
                <div
                    className={`flex flex-col  font-medium ml-4
                    rounded-md  text-text-primary bg-background-textarea
                        ${isCommand.command == 'play' && 'cursor-pointer'}
                `}
                    style={{
                        lineHeight: '1rem',
                        maxHeight: isCommand.command == 'play' ? '5rem' : 'none',
                    }}
                    onClick={() => handleCopy(isCommand!.command)}
                >
                    {isCommand.command == 'play' &&
                        <CopyToClipboard text={isCommand.arg}>
                            <div
                                style={{
                                    padding: '0.3rem 0.7rem',
                                }}
                            >
                                <div className="flex justify-between relative text-text-default"
                                >
                                    <div className="flex items-center  font-bold	 ">
                                        <PlayCircle className="mr-0.5 text-lg" weight="bold" /> Play
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
                                padding: '0.3rem 0.7rem',
                            }}>
                            <div className="flex items-center text-center font-bold text-text-default">
                                <Megaphone className='mr-0.5 mb-0.5 text-lg' weight="bold" /> Talk
                            </div>
                            <div className="break-words whitespace-normal">
                                {isCommand.arg}
                            </div>
                        </div>
                    }
                </div >
                :
                <div
                    className={`font-medium break-words whitespace-normal text-text-primary `}
                    style={{
                        paddingLeft: '1.4rem',
                        lineHeight: '1rem',
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
                            />
                            :
                            message
                    }
                </div>
        )
    }

    function checkURL(url: string) {
        return (url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp|webp)(\?(.*))?$/gmi) != null);
    }

    return (
        <div
            className={` chat-message   
            ${!isPhone() && 'hover:bg-hover-mild'}
`}
        >
            <div className={`flex justify-between items-center w-4/10 mb-1 text-text-secondary ${isPhone() && 'mr-1'} 
        
        `}>
                <div className={`flex items-center w-full
            `}
                >
                    <span className={`  mr-1.5 h-4 w-4
                  rounded flex justify-center 
                  items-center bg-background-icon
                  `}
                        style={{ minWidth: '1rem' }}
                    >
                        <Sigil patp={from} size={0.75} />
                    </span>
                    <span className={`font-semibold mr-1 w-full
      
                `}
                        style={{ lineHeight: '0.7rem', }}
                    >
                        {from == radio.our ? 'You' : from}{''}
                    </span>
                </div>
                <span
                    className={` font-bold  text-sm whitespace-nowrap
`}
                >
                    {timestampFromTime(time)}
                </span>
            </div>
            {
                renderMessage(message)
            }
        </div >
    )

}