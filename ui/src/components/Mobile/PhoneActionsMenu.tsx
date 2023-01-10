import { List } from "phosphor-react";
import React, { useEffect, useState } from "react"
import { radio } from "../../api";
import { useAppSelector } from "../../app/hooks";
import { selectTunePatP, selectIsPublic } from "../../features/station/stationSlice";
import { DisabledPlayButton } from "../PlayerContainer/DJCommands/PlayButton/DisabledPlayButton";
import { PlayButton } from "../PlayerContainer/DJCommands/PlayButton/PlayButton";
import { DisabledTalkButton } from "../PlayerContainer/DJCommands/TalkButton/DisabledTalkButton";
import { TalkButton } from "../PlayerContainer/DJCommands/TalkButton/TalkButton";
import { SettingsMenuButton } from "../PlayerContainer/SettingsMenu/SettingsMenuButton";
import { SyncActions } from "../PlayerContainer/SyncActions/SyncActions";

export const PhoneActionsMenu = () => {
    const [showActionsMenu, setShowActionsMenu] = useState(false);

    const tunePatP = useAppSelector(selectTunePatP);
    const isPublic = useAppSelector(selectIsPublic);

    const phoneActionsMenuId = "phone-actions-menu"

    useEffect(() => {
        document.addEventListener(
            "click",
            handleOutsidePhoneActionsMenuClick
        )
        return () => document.removeEventListener('click', handleOutsidePhoneActionsMenuClick)
    }, []);

    const handleOutsidePhoneActionsMenuClick = (event: any) => {
        var clicked = event.target as Element;
        var phoneActionsMenu = document.getElementById(phoneActionsMenuId);

        if (
            phoneActionsMenu && clicked != phoneActionsMenu && !phoneActionsMenu.contains(clicked)
        ) {
            setShowActionsMenu(false);
        }
    }

    return (
        <button
            className={`rounded-md p-1 bg-background-default
                     `}
            id={phoneActionsMenuId}
        >
            <List size={24} weight="bold"
                onClick={() => setShowActionsMenu(prev => !prev)}
            />
            {showActionsMenu &&
                <div
                    className={`fixed flex left-0 w-screen gap-1 py-2 justify-around items-center border-t bg-background-default text-text-default border-border-default
                                `}
                    style={{
                        bottom: '64px',
                    }}
                >
                    {radio.our == tunePatP && <SettingsMenuButton />}
                    {(radio.our != tunePatP && !isPublic) ? <>
                        <DisabledPlayButton />
                        <DisabledTalkButton />
                    </>
                        :
                        <>
                            <PlayButton />
                            <TalkButton />
                        </>
                    }
                    <SyncActions />
                </div>
            }
        </button >
    )




}


{/* <button
className={` text-lg  rounded-full bg-orange-80 shadow-lg p-1.5 
         ${showActionsMenu && 'bg-gray-100'}
         `}
style={{ marginTop: '-4px' }}
id={phoneActionsMenuId}
> */}