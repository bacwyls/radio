import { Megaphone } from "phosphor-react"
import React, { useEffect, useState } from "react"
import { radio } from "../../../../api";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectIsDarkMode, selectIsTalkModalOpen, setIsTalkModalOpen } from "../../../../features/ui/uiSlice";
import { isPhone } from "../../../../util"
import { talkButtonId } from "./TalkButton";

export const TalkModal = () => {

    const isDarkMode = useAppSelector(selectIsDarkMode);
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
                ${isDarkMode ? ' bg-black-95 border-black-85 filter drop-shadow-md-dark' : ' bg-white border-black-10'} `}
                style={{ fontSize: '16px' }}
            >
                <div
                    className='font-semibold '
                    style={{ fontSize: '18px', lineHeight: '22px' }}
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
                        className={`  rounded-md border w-full f
                px-2 py-1 outline-none focus:shadow	resize-none	
                ${isDarkMode ? 'bg-black-80 focus:bg-black-85 border-black-80  placeholder-black-10 text-black-10  '
                                : 'bg-black-10 placeholder-black-80  text-black-80 border-black-10 focus:bg-black-1'}
                `}
                        placeholder='Text to Speech'
                        value={textToSpeech}
                        onChange={e => setTextToSpeech(e.target.value)}
                        maxLength={64}
                        style={{ height: '5rem' }}
                    />
                    <span className={`absolute bottom-1 left-2  font-semibold 
                                    ${isDarkMode ? 'text-black-10  '
                            : 'text-black-60'}

                    ` }
                    >{textToSpeech.length + '/64'}</span>
                    <button
                        className={`flex items-center justify-center 
                gap-0.5 font-bold  rounded-md absolute bottom-1 right-2   
                ${isDarkMode ? 'text-black-90' : '  text-black-5 '}
                ${textToSpeech.trim().length > 0 ? 'hover:shadow  bg-blue-90 ' : 'cursor-not-allowed opacity-50 bg-blue-90'} 
                `}
                        style={{
                            width: '6em',
                            height: '40px',
                            marginLeft: '-6em',
                        }}
                        onClick={processTalk}
                    >
                        <Megaphone size={22} weight="bold" />
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