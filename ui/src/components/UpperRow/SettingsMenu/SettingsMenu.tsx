import React, { useEffect, useState } from "react"
import { MdOutlineSettings } from "react-icons/md"
import { isPhone } from "../../../util";
import { IsPublicDropdown } from "./IsPublicDropdown"
import { PublishStationButton } from "./PublishStationButton"
import './SettingsMenu.css';

export const SettingsMenu = () => {
    const [showConfigMenu, setShowConfigMenu] = useState(false);

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

    return (
        < div
            id="settings-menu"
            className="relative flex items-center"
        >
            < MdOutlineSettings
                className={`ml-1 hover:cursor-pointer text-base 
                ${showConfigMenu && 'bg-gray-100'}
                `}

                onClick={() => setShowConfigMenu((prev) => !prev)}
            />
            {showConfigMenu
                &&
                <div className={`absolute z-10  shadow
                             flex items-center px-2 rounded
                            justify-between bg-gray-100 gap-2
                            ${isPhone() ? 'settings-menu-phone' : 'settings-menu'}
                            `}
                    style={{
                    }}>
                    <IsPublicDropdown />
                    <PublishStationButton />
                </div>}
        </ div>
    )
}   