import { Megaphone } from "phosphor-react"
import React, { useEffect, useState } from "react"
import { radio } from "../../../../api";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectIsTalkMenuOpen, setIsTalkMenuOpen } from "../../../../features/ui/uiSlice";
import { isPhone, } from "../../../../util"
import { talkButtonId } from "./TalkButton";

export const TalkMenu = () => {

    const isTalkMenuOpen = useAppSelector(selectIsTalkMenuOpen);

    const dispatch = useAppDispatch();

    const urlInputId = 'url-input';

    const [textToSpeech, setTextToSpeech] = useState('');

    const processTalk = () => {
        if (textToSpeech.trim().length == 0) return;

        radio.chat('!talk ' + textToSpeech);
        radio.talk(textToSpeech);

        setTextToSpeech('');

        dispatch(setIsTalkMenuOpen(false));

    }

    useEffect(() => {
        setTextToSpeech('')
    }, [isTalkMenuOpen]);


    const talkMenuId = 'talk-menu';

    useEffect(() => {
        if (isPhone()) return;

        document.addEventListener(
            "click",
            handleOutsideTalkMenuClick
        )

        return () => document.removeEventListener('click', handleOutsideTalkMenuClick)
    }, []);

    const handleOutsideTalkMenuClick = (event: any) => {
        var clicked = event.target as Element;
        var talkMenu = document.getElementById(talkMenuId);
        var talkButton = document.getElementById(talkButtonId);

        if (
            talkMenu && clicked != talkMenu && !talkMenu.contains(clicked) && clicked != talkButton && !talkButton?.contains(clicked)
        ) {
            dispatch(setIsTalkMenuOpen(false));
        }
    }

    return (
        isTalkMenuOpen ?
            <div
                id={talkMenuId}
                className={`  
                    ${isPhone() ? 'talk-menu-phone' : 'talk-menu'}
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
                        className={`bold-placeholder rounded-md border  border-background-textarea  w-full
                px-2 py-1 outline-none focus:shadow resize-none placeholder-text-secondary text-text-primary  
                bg-background-textarea focus:bg-background-textarea-focused  focus:border-2
                ${textToSpeech.trim().length > 0 ? 'focus:border-blue-button' : 'focus:border-blue-disabled'}
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
                 gap-0.5 font-bold  rounded-md absolute bottom-1 right-2   text-text-button
                ${textToSpeech.trim().length > 0 ? 'hover:shadow  bg-blue-button ' : 'cursor-default text-opacity-80 bg-blue-disabled'}
    `}
                        style={{
                            width: '4rem',
                            height: '1.7rem',
                        }}
                        onClick={processTalk}
                    >
                        <Megaphone weight="bold" className="text-xl" />
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