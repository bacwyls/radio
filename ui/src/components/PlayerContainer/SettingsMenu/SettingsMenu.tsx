import { Gear } from "phosphor-react";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectIsSettingsMenuOpen, setIsSettingsMenuOpen } from "../../../features/ui/uiSlice";
import { isPhone } from "../../../util";
import { IsPublicSettings } from "./IsPublicSettings";
import { PublishSettings } from "./PublishSettings";
import { settingsButtonId } from "./SettingsButton";

export const SettingsMenu = () => {
    const isSettingsMenuOpen = useAppSelector(selectIsSettingsMenuOpen);

    const dispatch = useAppDispatch();

    const settingsMenuId = 'settings-menu';

    useEffect(() => {
        if (isPhone()) return;

        document.addEventListener(
            "click",
            handleOutsideSettingsMenuClick)

        return () => document.removeEventListener('click', handleOutsideSettingsMenuClick)
    }, []);

    const handleOutsideSettingsMenuClick = (event: any) => {

        var clicked = event.target as Element;
        var settingsMenu = document.getElementById(settingsMenuId);
        var settingsButton = document.getElementById(settingsButtonId);

        if (
            settingsMenu && clicked != settingsMenu && !settingsMenu.contains(clicked) && clicked != settingsButton && !settingsButton?.contains(clicked)
        ) {
            dispatch(setIsSettingsMenuOpen(false));
        }
    }

    return (
        isSettingsMenuOpen ?
            <div
                id={settingsMenuId}
                className={` 
                            ${isPhone() ? 'settings-menu-phone  ' : 'settings-menu '}
                            `}
            >
                <div className="flex justify-between">
                    <div className="flex items-center font-bold text-bigger"
                    >
                        <Gear weight="bold" className="mr-1 text-xl" />
                        Settings</div>
                    {/* <button
                        className=' flex items-center justify-center
                         border-gray-400 rounded-md  hover:border-black
                         text-bold px-2 py-1 h-6
                         bg-gray-100 '
                        style={{
                            boxShadow: 'rgba(50, 50, 93, 0.25) \
                            0px 2px 5px -1px, rgba(0, 0, 0, 0.3)`\
                             0px 1px 3px - 1px ',
                            height: '40px',

                        }}
                        onClick={() => setShowConfigMenu(false)}
                    >
                        <span
                            className='font-bold '
                        >
                            Close
                        </span>
                    </button> */}
                </div>
                <IsPublicSettings />
                <PublishSettings />
            </div>
            :
            <></>
    )

}