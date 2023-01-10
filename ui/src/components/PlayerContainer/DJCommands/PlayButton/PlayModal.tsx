import { PlayCircle, Link } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { radio } from "../../../../api";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectIsPlayModalOpen, setIsPlayModalOpen } from "../../../../features/ui/uiSlice";
import { isPhone } from "../../../../util";
import { playButtonId } from "./PlayButton";
import './style.css';

export const PlayModal = () => {

    const isPlayModalOpen = useAppSelector(selectIsPlayModalOpen)

    const [urlToPlay, setUrlToPlay] = useState('');

    const urlInputId = 'url-input'

    const dispatch = useAppDispatch();

    function processPlay() {
        if (urlToPlay.trim().length == 0) return;
        radio.spin(urlToPlay);
        radio.chat('!play ' + urlToPlay);
        setUrlToPlay('');
        dispatch(setIsPlayModalOpen(false));
    }

    useEffect(() => {
        setUrlToPlay('')
    }, [isPlayModalOpen]);


    const playModalId = 'play-modal';

    useEffect(() => {
        if (isPhone()) return;

        document.addEventListener(
            "click",
            handleOutsidePlayModalClick
        )

        return () => document.removeEventListener('click', handleOutsidePlayModalClick)
    }, []);

    const handleOutsidePlayModalClick = (event: any) => {
        var clicked = event.target as Element;
        var playModal = document.getElementById(playModalId);
        var playButton = document.getElementById(playButtonId);

        if (
            playModal && clicked != playModal && !playModal.contains(clicked) && clicked != playButton && !playButton?.contains(clicked)
        ) {
            dispatch(setIsPlayModalOpen(false));
        }
    }

    return (
        isPlayModalOpen
            ?
            <div
                id={playModalId}
                className={`
        ${isPhone() ? 'play-modal-phone' : 'play-modal'}
    `}
            >
                <div className='font-semibold text-bigger'
                >
                    Change the current player content
                </div>
                <div
                    className={`
      flex flex-col text-text-secondary
    `}
                >
                    <span className='font-semibold'>
                        Accepts a variety of URLs </span>
                    <span className='font-medium text-sm'>
                        e.g., Youtube, SoundCloud, Twitch, file paths, etc.
                    </span>
                </div>
                <div className='flex relative items-center'
                >
                    <input
                        id={urlInputId}
                        autoComplete="off"
                        className={`border bold-placeholder
                        flex items-center justify-center pl-7 
                             rounded-md w-full  outline-none focus:shadow  
                             bg-background-input focus:bg-background-input-focused 
                             border-background-input text-text-primary
                              placeholder-text-secondary
                        `}
                        placeholder='Insert URL'
                        value={urlToPlay}
                        onChange={e => setUrlToPlay(e.target.value)}
                        style={{
                            height: '40px',
                            paddingRight: '6.3em',
                        }}
                    />
                    <Link className='absolute left-2' size={22} weight="bold" />
                    {/* {urlToPlay.trim().length != 0 &&
    <XCircle className="absolute cursor-pointer" style={{ right: '6.2em' }} size={22} weight="bold"
      onClick={() => setUrlToPlay('')}
    />
  } */}
                    <button
                        className={`flex items-center justify-center 
                                     gap-0.5 font-bold  rounded-md  text-text-button
                             ${urlToPlay.trim().length > 0 ? 'hover:shadow  bg-blue-button button-grow ' : 'cursor-default	 bg-blue-disabled text-opacity-80'} 
                         `}
                        style={{
                            width: '6em',
                            height: '40px',
                            marginLeft: '-6em',
                        }}
                        onClick={processPlay}
                    >
                        <PlayCircle size={22} weight="bold" />
                        Play
                    </button>
                </div>
            </div>
            :
            <></>
    )
}