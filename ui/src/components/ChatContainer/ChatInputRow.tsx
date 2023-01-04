import { ArrowLeft } from "phosphor-react";
import React, { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSpinTime, selectSpinUrl } from "../../features/station/stationSlice";
import { selectIsChatFullScreen, selectIsDarkMode, setIsChatFullScreen } from "../../features/ui/uiSlice";
import { handleUserInput, isPhone } from "../../util";

interface IChatInputRow {
}

export const ChatInputRow: FC<IChatInputRow> = (props: IChatInputRow) => {

    const chatInputId = 'radio-chat-input';

    const dispatch = useAppDispatch();

    const spinUrl = useAppSelector(selectSpinUrl);
    const spinTime = useAppSelector(selectSpinTime);
    const isChatFullScreen = useAppSelector(selectIsChatFullScreen);
    const isDarkMode = useAppSelector(selectIsDarkMode);

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
            className={`   w-full  flex 
                    ${isPhone() ? 'fixed bottom-0 left-0   items-center' : 'items-start relative'}
                `}
            style={{
                padding: '0 24px',
                height: isPhone() ? '64px' : '88px',
            }}
        >
            {isPhone() && <ArrowLeft
                size={28}
                weight="bold"
                className="mr-2  "
                onClick={() => dispatch(setIsChatFullScreen(false))} />}
            <input
                type="text"
                className={`pl-2 flex items-center relative   
                      border  rounded-md  outline-none focus:shadow 

                    ${isDarkMode ? 'bg-black-70 focus:bg-black-85 border-black-70  text-black-10 placeholder-black-10'
                        : ' text-black-80  bg-black-10 border-black-10 placeholder-black-80 focus:bg-black-1'}
                    ${isPhone() ? '' : 'mt-2 '}
                    `}
                style={{
                    height: isPhone() ? '2rem' : '40px',
                    width: '100%',
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
                className={` 
                            absolute outline-none flex font-bold rounded-md 
                             justify-center items-center    bg-blue-90 
                             ${!isPhone() && 'mt-2 '}
                             ${isDarkMode ? 'text-black-80' : '  text-black-1 '}
                             ${inputText.trim().length > 0 ? 'hover:shadow ' : 'cursor-not-allowed	opacity-50'} 
                             `}
                style={{
                    right: '24px',
                    width: '5em',
                    height: isPhone() ? '2rem' : '40px',
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