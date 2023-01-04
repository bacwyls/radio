import { Gear, Question, Lock, Globe } from "phosphor-react";
import React, { useEffect, useState } from "react"
import { radio } from "../../../api";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectDescription, selectHasPublishedStation, selectIsPublic, setDescription, setHasPublishedStation, setIsPublic } from "../../../features/station/stationSlice";
import { selectIsDarkMode, selectIsSettingsMenuOpen, setIsSettingsMenuOpen } from "../../../features/ui/uiSlice";
import { isPhone } from "../../../util";
import { SettingsMenu } from "./SettingsMenu";
import './style.css';

export const settingsButtonId = 'settings-button';

export const SettingsMenuButton = () => {

    const isDarkMode = useAppSelector(selectIsDarkMode);
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
                <Gear weight="bold" size={24} />
                Settings
            </button >
            :
            <button
                id={settingsButtonId}
                className={`
                 settings-button 
                 ${isDarkMode ? ' border-black-85' : 'border-black-20'}
             ${isSettingsMenuOpen ? (isDarkMode ? 'bg-black-70 ' : 'bg-black-5') : (isDarkMode ? ' bg-black-90  hover:bg-black-70 ' : ' bg-white hover:bg-black-5')}
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