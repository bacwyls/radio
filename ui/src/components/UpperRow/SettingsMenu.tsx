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
        < div id="settings-menu" className="relative flex items-center"  >
            < MdOutlineSettings
                className='ml-1 hover:cursor-pointer text-sm '
                onClick={() => setShowConfigMenu((prev) => !prev)}
            />
            {showConfigMenu
                &&
                <div className="absolute z-10  
                             flex items-center px-2 rounded
                            justify-between bg-gray-100  "
                    style={{
                        left: '2em',
                        height: '9vh',
                        maxHeight: '4em',
                        width: '16em',
                    }}>
                    <IsPublicDropdown />
                    <PublishStationButton />
                </div>}
        </ div>
    )
}   