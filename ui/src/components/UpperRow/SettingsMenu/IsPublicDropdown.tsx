import { CaretDown, CaretUp } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { radio } from "../../../api";
import { useAppSelector } from "../../../app/hooks";
import { selectIsPublic } from "../../../features/station/stationSlice";
import { selectIsDarkMode } from "../../../features/ui/uiSlice";

export const IsPublicDropdown = () => {

    const isPublic = useAppSelector(selectIsPublic);
    const [showOptions, setShowOptions] = useState(false);
    const isDarkMode = useAppSelector(selectIsDarkMode);

    useEffect(() => {
        document.addEventListener(
            "click",
            handleOutsideIsPublicDropdownClick
        )
        return () => document.removeEventListener('click', handleOutsideIsPublicDropdownClick)
    }, []);

    const handleOutsideIsPublicDropdownClick = (event: any) => {
        var clicked = event.target as Element;
        var dropdown = document.getElementById('is-public-dropdown');

        if (
            dropdown && clicked != dropdown && !dropdown.contains(clicked)
        ) {
            setShowOptions(false);
        }
    }

    return (
        <div
            className="relative "
            id="is-public-dropdown"
            style={{ fontSize: '.65rem', }}>
            <button
                className={`flex items-center border 
                              font-semibold relative
                           border-gray-400 rounded px-2 h-6 
                           ${isDarkMode ? 'bg-lighter-black text-white-dark hover:border-white-dark' : 'bg-white hover:border-black'}
                           `}
                style={{ width: '8em' }}
                onClick={() => setShowOptions(prev => !prev)}>
                {isPublic ? 'public' : 'private'}
                <CaretUp
                    size={18}
                    weight="bold"
                    className={` absolute right-2 ${showOptions ? 'visible' : 'invisible'}`}
                />
                <CaretDown
                    size={18}
                    weight="bold"
                    className={` absolute right-2 ${!showOptions ? 'visible' : 'invisible'}`}
                />
            </button >
            {showOptions &&
                <button
                    className={`absolute z-10 flex items-center   border
                           border-gray-400 rounded-b px-2 h-6 bg-white font-semibold 
                           ${isDarkMode ? 'bg-lighter-black text-white-dark  hover:border-white-dark' : 'bg-white hover:border-black'}
                        `}
                    style={{ width: '8em', marginTop: '-.32em' }}
                    onClick={isPublic ?
                        () => {
                            radio.private()
                            setShowOptions(false)
                        }

                        : () => {
                            radio.public()
                            setShowOptions(false)
                        }
                    }>
                    {isPublic ? 'private' : 'public'}
                </button>}
        </div>

    )

}
