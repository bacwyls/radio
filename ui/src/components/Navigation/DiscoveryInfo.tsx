import { Question } from "phosphor-react";
import React, { useEffect, useState } from "react"
import { useAppSelector } from "../../app/hooks";
import { selectIsDarkMode } from "../../features/ui/uiSlice";

export const DiscoveryInfo = () => {

    const [showDiscoveryInfo, setShowDiscoveryInfo] = useState(false);
    const isDarkMode = useAppSelector(selectIsDarkMode);

    useEffect(() => {
        document.addEventListener(
            "click",
            handleOutsideDiscoveryInfoMenuClick
        )

        return () => document.removeEventListener('click', handleOutsideDiscoveryInfoMenuClick)
    }, []);

    const handleOutsideDiscoveryInfoMenuClick = (event: any) => {
        var clicked = event.target as Element;
        var discoveryInfo = document.getElementById('discovery-info');

        if (
            clicked != discoveryInfo && !discoveryInfo?.contains(clicked)
        ) {
            setShowDiscoveryInfo(false);
        }
    }

    return (
        <div
            id="discovery-info"
        >
            <div
                className={`flex items-center  h-6 
                ${isDarkMode ? 'text-white-dark' : ''}
                `}
                style={{ fontSize: '.8rem' }}
            >
                <span
                    className={`h-full flex items-center whitespace-nowrap font-bold
                       
                    `}
                > Discovery
                </span>
                <button
                    className={`cursor-pointer rounded p-1
                    ${showDiscoveryInfo ? (isDarkMode ? 'bg-hover-gray-dark' : ' bg-hover-gray-light') : ''}
                    ${isDarkMode ? ' hover:bg-hover-gray-dark' : ' hover:bg-hover-gray-light'}
                    `}
                    onClick={() => setShowDiscoveryInfo(prev => !prev)}

                >
                    <Question
                        size={22}
                        weight="bold"
                    />
                </button>
            </div>
            {showDiscoveryInfo && <div
                className={`border bg-white z-10 px-2 py-4   ml-2 sm:ml-4 mt-8 
                            rounded shadow absolute text-xs leading-4
                            ${isDarkMode ? 'text-white-dark bg-lighter-black border-light-border-dark' : ''}
                            `}
                style={{
                    left: 0,
                    top: 0,
                    width: '15em',
                }}
            >
                Published stations with the most viewers will appear here.
            </div>}
        </div >

    )

}