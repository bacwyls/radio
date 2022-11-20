import { Gear } from "phosphor-react";
import React, { useEffect, useState } from "react"
import { useAppSelector } from "../../../app/hooks";
import { selectIsDarkMode } from "../../../features/ui/uiSlice";
import { isPhone } from "../../../util";
import { IsPublicDropdown } from "./IsPublicDropdown"
import { PublishStationButton } from "./PublishStationButton"
import './SettingsMenu.css';

export const SettingsMenu = () => {
    const [showConfigMenu, setShowConfigMenu] = useState(false);
    const isDarkMode = useAppSelector(selectIsDarkMode);

    useEffect(() => {
        document.addEventListener(
            "click",
            handleOutsideSettingsMenuClick
        )

        return () => document.removeEventListener('click', handleOutsideSettingsMenuClick)
    }, []);

    const handleOutsideSettingsMenuClick = (event: any) => {
        var clicked = event.target as Element;
        var settingsMenu = document.getElementById('settings-menu');

        if (
            settingsMenu && clicked != settingsMenu && !settingsMenu.contains(clicked)
        ) {
            setShowConfigMenu(false);
        }
    }

    return (<div
        id="settings-menu"
    >
        <button
            className={`rounded  flex items-center justify-center 
            ${isDarkMode ? 'text-white-dark hover:bg-hover-gray-dark ' : 'hover:bg-hover-gray-light'}
             ${showConfigMenu && (isDarkMode ? 'bg-hover-gray-dark' : 'bg-hover-gray-light')}
             `}
            style={{
                width: '2em',
                height: '2em',
            }}
            onClick={() => setShowConfigMenu((prev) => !prev)}
        >
            <Gear size={26} weight="bold"
            />
        </button >
        {showConfigMenu
            &&
            <div className={`fixed z-20   
                             flex items-center px-2 rounded
                            justify-center gap-2 
                            ${isDarkMode ? 'bg-lighter-black' : 'bg-gray-50 shadow'}
                            ${isPhone() ? 'settings-menu-phone  ' : 'settings-menu '}
                            `}
            >
                <IsPublicDropdown />
                <PublishStationButton />
            </div>}
    </div>

    )
}   