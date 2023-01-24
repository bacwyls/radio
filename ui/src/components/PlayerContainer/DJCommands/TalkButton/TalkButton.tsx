import { Megaphone } from "phosphor-react";
import React, { } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectIsTalkMenuOpen, setIsTalkMenuOpen } from "../../../../features/ui/uiSlice";
import { isPhone } from "../../../../util";
import './style.css';

export const talkButtonId = 'talk-button';

export const TalkButton = () => {

    const isTalkMenuOpen = useAppSelector(selectIsTalkMenuOpen);

    const dispatch = useAppDispatch();

    return (
        isPhone() ?
            <button
                className='talk-button-phone'
                onClick={() => dispatch(setIsTalkMenuOpen(!isTalkMenuOpen))}
            >
                <Megaphone weight="bold" className="text-xl" />
                Talk
            </button >
            :
            <button
                id={talkButtonId}
                className={` 
                    talk-button 
                     ${isTalkMenuOpen ? 'bg-hover-intense' : 'bg-background-player-button  hover:bg-hover-intense'}
                `}
                onClick={() => dispatch(setIsTalkMenuOpen(!isTalkMenuOpen))}
            >
                <Megaphone weight="bold" className="megaphone" />
                Talk
            </button >
    )
}

