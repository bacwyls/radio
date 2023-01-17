import { Megaphone } from "phosphor-react";
import React from "react";
import { isPhone } from "../../../../util";

export const DisabledTalkButton = () => {


    return (
        isPhone() ?
            <button
                className={` talk-button-phone opacity-70
                 `}
            >
                <Megaphone weight="bold" className="text-xl" />
                Talk
            </button >
            :
            <button
                className={`  talk-button   cursor-default 	opacity-70 bg-background-player-button
        `}
            >
                <Megaphone weight="bold" className="megaphone" />
                Talk
            </button >
    )
}