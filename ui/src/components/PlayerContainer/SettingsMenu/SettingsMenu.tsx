import { Gear } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectIsSettingsMenuOpen, setIsSettingsMenuOpen } from "../../../features/ui/uiSlice";
import { isPhone } from "../../../util";
import { IsPublicSettings } from "./IsPublicSettings";
import { PublishSettings } from "./PublishSettings";
import { settingsButtonId } from "./SettingsButton";

export const SettingsMenu = () => {

    const [showSaveButton, setShowSaveButton] = useState(false);

    const isSettingsMenuOpen = useAppSelector(selectIsSettingsMenuOpen);

    const dispatch = useAppDispatch();

    const settingsMenuId = 'settings-menu';
    const saveButtonId = 'save-button';


    useEffect(() => {
        setShowSaveButton(false);
    }, [isSettingsMenuOpen]);


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
        var saveButton = document.getElementById(saveButtonId);

        if (
            saveButton && (clicked == saveButton || saveButton.contains(clicked))) {
            dispatch(setIsSettingsMenuOpen(false));
        }
        else if (
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
                <div className="flex flex-col items-between gap-3">
                    <div className="flex items-center font-bold text-bigger"
                    >
                        <Gear weight="bold" className="mr-1 text-xl" />
                        Settings</div>
                    <IsPublicSettings setShowSaveButton={setShowSaveButton} />
                    <PublishSettings setShowSaveButton={setShowSaveButton} />
                </div>
                {showSaveButton && <button
                    id={saveButtonId}
                    className={`flex items-center justify-center
                        rounded-md w-full whitespace-nowrap
                         text-bold  font-bold 
                            bg-hover-default hover:bg-hover-intense
                         `}
                    style={{
                        height: '1.7rem ',
                        minHeight: '1.7rem ',

                    }}
                >
                    Save
                </button>}
            </div>
            :
            <></>
    )

}