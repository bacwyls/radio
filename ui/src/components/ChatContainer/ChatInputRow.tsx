import { ArrowLeft } from "phosphor-react";
import React, { FC, useEffect, useRef, useState } from "react";
import { radio } from "../../api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSpinTime, selectSpinUrl } from "../../features/station/stationSlice";
import { selectIsChatFullScreen, selectIsDarkMode, setIsChatFullScreen, setPlayerInSync } from "../../features/ui/uiSlice";
import { handleUserInput, isPhone, tuneTo } from "../../util";

interface IChatInputRow {
}

export const ChatInputRow: FC<IChatInputRow> = (props: IChatInputRow) => {

    const chatInputId = 'radio-chat-input';

    const dispatch = useAppDispatch();

    const spinUrl = useAppSelector(selectSpinUrl);
    const spinTime = useAppSelector(selectSpinTime);
    const isChatFullScreen = useAppSelector(selectIsChatFullScreen);
    const isDarkMode = useAppSelector(selectIsDarkMode);
    // const inputReference = useRef<HTMLInputElement>(null);

    const [inputText, setInputText] = useState('');

    // parse from user input
    function getCommandArg(chat: string) {
        // if(!(chat[0] === '!' || chat[0] === '|' || chat[0] === '+' || chat[0] === ':')) return;
        if (!(chat[0] === '!')) return;

        let splitIdx = chat.indexOf(' ');
        if (splitIdx === -1) return { 'command': chat.slice(1), 'arg': '' };
        let command = chat.slice(1, splitIdx);
        let arg = chat.slice(splitIdx + 1);
        return { 'command': command, 'arg': arg };
    }

    function processInput() {
        handleUserInput(
            dispatch,
            inputText,
            spinTime,
            spinUrl,
        );
        setInputText('');
    }


    return (
        <div
            className={`flex items-start  w-full
                    // ${isPhone() && 'fixed bottom-0 z-10'}
                `}
            style={{
                padding: '0 24px 0 24px',
                height: '88px',
            }}
        >
            {isPhone() && isChatFullScreen &&
                <ArrowLeft
                    size={32}
                    weight="bold"
                    className="mr-1 cursor:pointer flex justify-items-start"
                    onClick={() => dispatch(setIsChatFullScreen(false))} />
            }
            <input
                type="text"
                // ref={inputReference}
                className={`px-2 flex items-center mt-2 w-full   
                      border  rounded-md  outline-none focus:shadow
                    font-bold 
                    ${isDarkMode ? 'bg-black-70 focus:bg-black-80 border-black-70  text-black-1 placeholder-white' : ' text-black-80  bg-black-10 border-black-10 placeholder-black-80 focus:bg-black-1'}

                    `}
                style={{
                    height: '40px',
                    fontSize: '.6rem',
                    paddingRight: '6.4em'
                }}
                autoCorrect={'off'}
                autoCapitalize={'off'}
                autoComplete={'off'}
                placeholder="Message"
                id={chatInputId}
                onKeyDown={(e: any) => {
                    if (e.key == 'Enter') {
                        processInput();
                    }
                }}
                value={inputText}
                onChange={e => setInputText(e.target.value)}
            />
            < button
                className={`bg-white rounded mt-2
                           flex-initial outline-none flex font-bold 
                            rounded-md 
                             justify-center items-center  
                             ${isDarkMode ? 'text-black-90' : '  text-white '}
                             ${inputText.trim().length > 0 ? 'hover:shadow bg-blue-90   ' : 'cursor-not-allowed	bg-blue-50 text-opacity-50 '} 
                             `}
                style={{
                    fontSize: '.6rem',
                    width: '6em',
                    height: '40px',
                    marginLeft: '-6em',
                }}
                onClick={() =>
                    processInput()
                }
            >
                Send
            </ button>
        </div >
    )
}