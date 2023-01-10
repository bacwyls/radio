import { ArrowLeft } from "phosphor-react";
import React, { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSpinTime, selectSpinUrl, selectTunePatP } from "../../features/station/stationSlice";
import { setIsChatFullScreen } from "../../features/ui/uiSlice";
import { handleUserInput, isPhone } from "../../util";
import { isValidPatp } from 'urbit-ob';

interface IChatInputRow {
}

export const ChatInputRow: FC<IChatInputRow> = (props: IChatInputRow) => {

    const chatInputId = 'radio-chat-input';

    const dispatch = useAppDispatch();

    const spinUrl = useAppSelector(selectSpinUrl);
    const spinTime = useAppSelector(selectSpinTime);
    const tunePatP = useAppSelector(selectTunePatP);

    const [inputText, setInputText] = useState('');

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
                className={`bold-placeholder pl-2 flex items-center relative   font-medium
                      border  rounded-md  outline-none focus:shadow text-text-primary focus:bg-background-input-focused bg-background-input border-background-input
                      placeholder-text-default
                ${!(tunePatP && isValidPatp(tunePatP)) && 'cursor-default'}
                 
                    ${isPhone() ? '' : 'mt-2 '}
                    `}
                disabled={!(tunePatP && isValidPatp(tunePatP))}
                style={{
                    height: isPhone() ? '2rem' : '40px',
                    width: '100%',
                    paddingRight: '6.4em',

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
                             justify-center items-center    text-text-button 
                             ${!isPhone() && 'mt-2 '}
                             ${inputText.trim().length > 0 ? 'hover:shadow  bg-blue-button button-grow' : 'cursor-default text-opacity-80 	bg-blue-disabled'} 
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