import React, { useEffect, useState } from "react"
import { MdOutlineSettings } from "react-icons/md"
import { IsPublicDropdown } from "./IsPublicDropdown"
import { PublishStationButton } from "./PublishStationButton"

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
            clicked != settingsMenu && !settingsMenu?.contains(clicked)
        ) {
            setShowConfigMenu(false);
        }
    }

    return (
        < span id="settings-menu" className="relative"  >
            < MdOutlineSettings
                className='ml-1 hover:cursor-pointer text-sm '
                onClick={() => setShowConfigMenu((prev) => !prev)}
            />
            {showConfigMenu
                &&
                <div className="absolute z-10  
                             flex items-center 
                            justify-between bg-gray-100  px-2 rounded"
                    style={{
                        left: '2em',
                        top: '-3vh',
                        height: '9vh',
                        width: '16em',
                    }}>
                    <IsPublicDropdown />
                    <PublishStationButton />
                </div>}
        </ span>
    )
}   