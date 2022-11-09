import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { radio } from "../../../api";
import { useAppSelector } from "../../../app/hooks";
import { selectIsPublic } from "../../../features/station/stationSlice";

export const IsPublicDropdown = () => {

    const isPublic = useAppSelector(selectIsPublic);
    const [showOptions, setShowOptions] = useState(false);

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
        (radio.tunedTo !== radio.our) ?
            <> {isPublic ? ' (public)' : ' (private)'}
            </>
            :
            <div
                className="relative "
                style={{ fontSize: '.65rem', }}>
                <button
                    id="is-public-dropdown"
                    className="flex items-center border hover:border-black
                             justify-between font-semibold relative
                           border-gray-400 rounded px-3 h-6 bg-white"
                    style={{ width: '8em' }}
                    onClick={() => setShowOptions(prev => !prev)}>
                    {isPublic ? 'public' : 'private'}
                    <MdOutlineKeyboardArrowUp className={`text-base absolute right-3 ${showOptions ? 'visible' : 'invisible'}`} />
                    <MdOutlineKeyboardArrowDown className={`text-base absolute right-3 ${!showOptions ? 'visible' : 'invisible'}`} />
                </button >
                {showOptions &&
                    <button
                        className="absolute z-10 flex items-center hover:border-black  border justify-between
                           border-gray-400 rounded-b px-3 h-6 bg-white font-semibold 
                           "
                        style={{ width: '8em', marginTop: '-.32em' }}
                        onClick={() => isPublic ? radio.private() : radio.public()}>
                        {isPublic ? 'private' : 'public'}
                    </button>}
            </div>

    )

}
