import { Gear } from "phosphor-react";
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
        <button
            id="settings-menu"
            className={`rounded hover:bg-gray-100  flex items-center justify-center
             ${showConfigMenu && 'bg-gray-100'}
             `}
            style={{ width: '2em', height: '2em' }}
            onClick={() => setShowConfigMenu((prev) => !prev)}
        >
            <Gear size={26} weight="bold"
            />
            {showConfigMenu
                &&
                <div className={`fixed z-20  shadow 
                             flex items-center px-2 rounded
                            justify-center gap-2 bg-gray-100 
                            ${isPhone() ? 'settings-menu-phone' : 'settings-menu'}
                            `}
                >
                    <IsPublicDropdown />
                    <PublishStationButton />
                </div>}
        </button >

    )
}   