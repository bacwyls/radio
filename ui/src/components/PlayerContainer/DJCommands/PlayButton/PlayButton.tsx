import { PlayCircle } from "phosphor-react";
import React, { } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectIsPlayModalOpen, setIsPlayModalOpen } from "../../../../features/ui/uiSlice";
import { isPhone } from "../../../../util";
import './style.css';

export const playButtonId = 'play-button-id';

export const PlayButton = () => {

    const isPlayModalOpen = useAppSelector(selectIsPlayModalOpen)

    const dispatch = useAppDispatch();


    return (
        isPhone() ?
            <button
                className='play-button-phone'
                onClick={() => dispatch(setIsPlayModalOpen(true))}
            >
                <PlayCircle weight="bold" className="text-xl" />
                Play
            </button >
            :
            <button
                id={playButtonId}
                className={`  
                   play-button 
              ${isPlayModalOpen ? 'bg-hover-intense' : 'bg-background-player-button hover:bg-hover-intense'}
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