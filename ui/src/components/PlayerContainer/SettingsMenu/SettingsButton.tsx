import { Gear } from "phosphor-react";
import React from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectIsSettingsMenuOpen, setIsSettingsMenuOpen } from "../../../features/ui/uiSlice";
import { isPhone } from "../../../util";
import './style.css';

export const settingsButtonId = 'settings-button';

export const SettingsButton = () => {

    const isSettingsMenuOpen = useAppSelector(selectIsSettingsMenuOpen);

    const dispatch = useAppDispatch();

    return (
        isPhone() ?
            <button
                className={`
                settings-button-phone
         `}
                onClick={() => dispatch(setIsSettingsMenuOpen(!isSettingsMenuOpen))}
            >
                <Gear weight="bold" className="text-xl" />
                Settings
            </button >
            :
            <button
                id={settingsButtonId}
                className={`
                 settings-button 
             ${isSettingsMenuOpen ? 'bg-hover-intense' : 'bg-background-player-button hover:bg-hover-intense'}
        `}
                onClick={(e) => {
                    dispatch(setIsSettingsMenuOpen(!isSettingsMenuOpen))
                }
                }

            >
                <Gear weight="bold" className="gear" />
                Settings
            </button >
    )
}   