import { Megaphone } from "phosphor-react"
import React, { useEffect, useState } from "react"
import { radio } from "../../../../api";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectIsTalkModalOpen, setIsTalkModalOpen } from "../../../../features/ui/uiSlice";
import { isPhone } from "../../../../util"
import { talkButtonId } from "./TalkButton";

export const TalkModal = () => {

    const isTalkModalOpen = useAppSelector(selectIsTalkModalOpen);

    const dispatch = useAppDispatch();

    const urlInputId = 'url-input';

    const [textToSpeech, setTextToSpeech] = useState('');

    const processTalk = () => {
        if (textToSpeech.trim().length == 0) return;
        radio.chat('!talk ' + textToSpeech);
        radio.talk(textToSpeech);
        setTextToSpeech('');
        dispatch(setIsTalkModalOpen(false));
    }

    useEffect(() => {
        setTextToSpeech('')
    }, [isTalkModalOpen]);


    const talkModalId = 'talk-modal';

    useEffect(() => {
        if (isPhone()) return;

        document.addEventListener(
            "click",
            handleOutsideTalkModalClick
        )

        return () => document.removeEventListener('click', handleOutsideTalkModalClick)
    }, []);

    const handleOutsideTalkModalClick = (event: any) => {
        var clicked = event.target as Element;
        var talkModal = document.getElementById(talkModalId);
        var talkButton = document.getElementById(talkButtonId);

        if (
            talkModal && clicked != talkModal && !talkModal.contains(clicked) && clicked != talkButton && !talkButton?.contains(clicked)
        ) {
            dispatch(setIsTalkModalOpen(false));
        }
    }

    return (
        isTalkModalOpen ?
            <div
                id={talkModalId}
                className={`  
                    ${isPhone() ? 'talk-modal-phone' : 'talk-modal'}
                    `}
            >
                <div
                    className='font-semibold text-bigger '
                    style={{ lineHeight: '0.916rem' }}
                >
                    The text will be converted to speech and broadcasted
                    to everybody.
                </div>
                <div className='relative '
                    style={{ height: '5rem' }}

                >
                    <textarea
                        id={urlInputId}
                        autoComplete="off"
                        className={`bold-placeholder rounded-md border border-background-textarea  w-full
                px-2 py-1 outline-none focus:shadow resize-none placeholder-text-secondary text-text-primary  
                bg-background-textarea focus:bg-background-textarea-focused 
                `}
                        placeholder='Text to Speech'
                        value={textToSpeech}
                        onChange={e => setTextToSpeech(e.target.value)}
                        maxLength={64}
                        style={{ height: '5rem' }}
                    />
                    <span className={`absolute bottom-1 left-2  font-semibold  text-text-secondary
                        }

    ` }
                    >{textToSpeech.length + '/64'}</span>
                    <button
                        className={`flex items-center justify-center 
                 gap-1 font-bold  rounded-md absolute bottom-1 right-2   text-text-button
                ${textToSpeech.trim().length > 0 ? 'hover:shadow  bg-blue-button ' : 'cursor-default text-opacity-80 bg-blue-disabled'}
    `}
                        style={{
                            width: '3.5rem',
                            height: '1.666rem',
                        }}
                        onClick={processTalk}
                    >
                        Talk
                    </button>
                </div>
                {/* {urlToPlay.trim().length != 0 &&
                <XCircle className="absolute cursor-pointer" style={{ right: '6.2em' }} size={22} weight="bold"
                  onClick={() => setUrlToPlay('')}
                />
              } */}
            </div >
            :
            <></>
    )
}