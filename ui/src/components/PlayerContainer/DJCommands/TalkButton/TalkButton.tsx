import { Megaphone } from "phosphor-react";
import React, { } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectIsTalkModalOpen, setIsTalkModalOpen } from "../../../../features/ui/uiSlice";
import { isPhone } from "../../../../util";
import './style.css';

export const talkButtonId = 'talk-button';

export const TalkButton = () => {

    const isTalkModalOpen = useAppSelector(selectIsTalkModalOpen);

    const dispatch = useAppDispatch();

    return (
        isPhone() ?
            <button
                className='talk-button-phone'
                onClick={() => dispatch(setIsTalkModalOpen(!isTalkModalOpen))}
            >
                <Megaphone weight="bold" className="text-xl" />
                Talk
            </button >
            :
            <button
                id={talkButtonId}
                className={` 
                    talk-button 
                     ${isTalkModalOpen ? 'bg-hover-intense' : 'bg-background-player-button  hover:bg-hover-intense'}
                `}
                onClick={() => dispatch(setIsTalkModalOpen(!isTalkModalOpen))}
            >
                <Megaphone weight="bold" className="megaphone" />
                Talk
            </button >
    )
}

