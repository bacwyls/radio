import { PlayCircle } from "phosphor-react";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectIsDarkMode, selectIsPlayModalOpen, setIsPlayModalOpen } from "../../../../features/ui/uiSlice";
import { isPhone } from "../../../../util";
import './style.css';

export const playButtonId = 'play-button-id';

export const PlayButton = () => {

    const isDarkMode = useAppSelector(selectIsDarkMode);
    const isPlayModalOpen = useAppSelector(selectIsPlayModalOpen)

    const dispatch = useAppDispatch();


    return (
        isPhone() ?
            <button
                className={`  
                             play-button-phone
             `}
                onClick={(e) => {
                    dispatch(setIsPlayModalOpen(true));
                }
                }
            >
                <PlayCircle weight="bold" size={24} />
                Play
            </button >
            :
            <button
                id={playButtonId}
                className={`  
                   play-button
                   ${isDarkMode ? ' border-black-85' : 'border-black-20'}
              ${isPlayModalOpen ? (isDarkMode ? 'bg-black-70' : 'bg-black-5') : (isDarkMode ? ' bg-black-90  hover:bg-black-70 ' : ' bg-white hover:bg-black-5')}
    `}
                onClick={(e) => {
                    dispatch(setIsPlayModalOpen(!isPlayModalOpen))
                }}
            >
                <PlayCircle weight="bold" className="play-circle" />
                Play
            </button>
    )
}