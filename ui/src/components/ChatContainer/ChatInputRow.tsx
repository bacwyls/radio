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
            className={`   w-full  flex px-4 
                    ${isPhone() ? 'fixed bottom-0 left-0   items-center' : 'items-start relative'}
                `}
            style={{
                height: isPhone() ? '2.666rem' : '3.666rem',
            }}
        >
            {isPhone() && <ArrowLeft
                weight="bold"
                className="mr-2  text-2xl"
                onClick={() => dispatch(setIsChatFullScreen(false))} />}
            <input
                type="text"
                className={`bold-placeholder  pl-2 pr-16     flex items-center relative   font-medium
                      border  border-border-intense  rounded-md  outline-none focus:shadow text-text-primary focus:bg-background-input-focused bg-background-input 
                      placeholder-text-secondary w-full
                ${!(tunePatP && isValidPatp(tunePatP)) && 'cursor-default'}
                    ${isPhone() ? '' : 'mt-2 '}
                    `}
                disabled={!(tunePatP && isValidPatp(tunePatP))}
                style={{
                    height: isPhone() ? '2rem' : '1.666rem',
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
                             ${inputText.trim().length > 0 ? 'hover:shadow  bg-blue-button' : 'cursor-default text-opacity-80 	bg-blue-disabled'} 
                             `}
                style={{
                    right: '1rem',
                    width: '3.5rem',
                    height: isPhone() ? '2rem' : '1.666rem',
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