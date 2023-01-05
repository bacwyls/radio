import { Megaphone } from "phosphor-react";
import { useAppSelector } from "../../../../app/hooks";
import { selectIsDarkMode } from "../../../../features/ui/uiSlice";
import React from "react";
import { isPhone } from "../../../../util";

export const DisabledTalkButton = () => {

    const isDarkMode = useAppSelector(selectIsDarkMode);

    return (
        isPhone() ?
            <button
                className={` talk-button-phone opacity-70
                 `}
            >
                <Megaphone weight="bold" size={24} style={{ marginBottom: '-4px' }} />
                Talk
            </button >
            :
            <button
                className={`  talk-button   cursor-not-allowed	opacity-70
                ${isDarkMode ? ' border-black-85' : 'border-black-20'}
        ${isDarkMode ? ' bg-black-90 ' : ' bg-white'}
        `}
            >
                <Megaphone weight="bold" className="megaphone" />
                Talk
            </button >
    )
}