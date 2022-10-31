import React from "react";
import { radio } from "../../api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSpinTime, selectSpinUrl } from "../../features/station/stationSlice";
import { setPlayerInSync } from "../../features/ui/uiSlice";
import { tuneTo } from "../../util";

export const ChatInputRow = () => {

    const chatInputId = 'radio-chat-input';

    const dispatch = useAppDispatch();

    const spinUrl = useAppSelector(selectSpinUrl);
    const spinTime = useAppSelector(selectSpinTime);

    function handleUserInput() {
        let input = document.getElementById(chatInputId) as HTMLInputElement;

        let chat = input.value;
        input.value = '';

        if (chat === '') return;

        // check for commands
        let got = getCommandArg(chat);
        if (!got) {
            // just a regular chat message
            radio.chat(chat);
            return;
        }

        // interpreting message as a command
        let command = got.command;
        let arg = got.arg;
        switch (command) {
            case 'talk':
                radio.chat(chat);
                radio.talk(arg);
                break;
            case 'play':
                radio.spin(arg);
                radio.chat(chat);
                break;
            case 'tune':
                if (arg === '') arg = radio.our;
                radio.chat(chat);
                tuneTo(arg, radio, dispatch)
                break;
            case 'background':
                radio.background(arg);
                radio.chat(chat);
                break;
            case 'time':
                dispatch(setPlayerInSync(true));
                radio.seekToDelta(spinTime);
                radio.chat(chat);
                break;
            case 'set-time':
                radio.resyncAll(spinUrl);
                radio.chat(chat);
                break;
            case 'public':
                if (radio.tunedTo !== radio.our) {
                    return;
                }
                radio.public();
                radio.chat(chat);
                break;
            case 'private':
                if (radio.tunedTo !== radio.our) {
                    return;
                }
                radio.private();
                radio.chat(chat);
                break;
            case 'ping':
                radio.ping();
                // radio.chat(chat);
                break;
            case 'logout':
                radio.tune(null);
                break;
            //
            // image commands
            default:
                radio.chatImage(command);
                break;
            //
        }
    }

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

    return (
        <div
            className="flex items-center px-2  
                        border border-gray-400 rounded-b "
            style={{
                height: '10vh',
                maxHeight: '4em'
            }}
        >
            <input
                type="text"
                // ref={inputReference}
                className="px-2 py-1 inline-block \
                    w-3/4  border-gray-400 hover:border-black
                    border border-solid  bg-gray-50
                    rounded focus:bg-white placeholder-black"
                style={{
                    fontSize: '.6rem',

                }}
                autoCorrect={'off'}
                autoCapitalize={'off'}
                autoComplete={'off'}
                // autoFocus={false}
                placeholder="Message"
                id={chatInputId}
                onKeyDown={(e: any) => {
                    if (e.key == 'Enter') {
                        handleUserInput();
                    }
                }}
            />
            < button
                className="bg-white rounded w-1/4 py-1 \
        flex-initial outline-none flex font-bold hover:border-black \
        rounded border border-solid  border-gray-400 \
         justify-center items-center ml-2 bg-blue-50"
                style={{
                    fontSize: '.6rem'
                }}
                onClick={() =>
                    handleUserInput()
                }
            >
                Send
            </ button>
        </div >
    )
}