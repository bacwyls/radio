import { PlayCircle } from "phosphor-react";
import React from "react";
import { isPhone } from "../../../../util";

export const DisabledPlayButton = () => {


    return (
        isPhone() ?
            <button
                className={`  opacity-70 
                 play-button-phone
                 `}
            >
                <PlayCircle weight="bold" size={24} style={{ marginBottom: '-4px' }} />
                Play
            </button >
            :
            <button
                className={`  play-button   cursor-not-allowed opacity-70 `}
            >
                <PlayCircle weight="bold" className="megaphone" />
                Play
            </button >
    )
}
