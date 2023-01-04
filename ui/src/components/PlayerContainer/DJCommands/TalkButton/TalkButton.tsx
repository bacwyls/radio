import { Megaphone } from "phosphor-react";
import React, { useState, useEffect } from "react";
import { radio } from "../../../../api";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectIsDarkMode, selectIsTalkModalOpen, setIsTalkModalOpen } from "../../../../features/ui/uiSlice";
import { isPhone } from "../../../../util";
import './style.css';

export const talkButtonId = 'talk-button';

export const TalkButton = () => {

    const isDarkMode = useAppSelector(selectIsDarkMode);
    const isTalkModalOpen = useAppSelector(selectIsTalkModalOpen);

    const dispatch = useAppDispatch();

    return (
        isPhone() ?
            <button
                className={` 
            talk-button-phone
`}
                onClick={(e) => {
                    dispatch(setIsTalkModalOpen(!isTalkModalOpen))
                }}
            >
                <Megaphone weight="bold" size={24} />
                Talk
            </button >
            :
            <button
                id={talkButtonId}
                className={` 
                talk-button
                ${isDarkMode ? ' border-black-85' : 'border-black-20'}
                ${isTalkModalOpen ? (isDarkMode ? 'bg-black-70' : 'bg-black-5') : (isDarkMode ? ' bg-black-90  hover:bg-black-70 ' : ' bg-white hover:bg-black-5')} `}
                onClick={(e) => {
                    // e.stopPropagation()
                    dispatch(setIsTalkModalOpen(!isTalkModalOpen))
                }}
            >
                <Megaphone weight="bold" className="megaphone" />
                Talk
            </button >
    )
}

