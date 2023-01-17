import { Question } from "phosphor-react";
import React, { useEffect, useState } from "react"

export const DiscoveryInfo = () => {

    const [showDiscoveryInfo, setShowDiscoveryInfo] = useState(false);

    const discoveryInfoId = 'discovery-info';

    useEffect(() => {
        document.addEventListener(
            "click",
            handleOutsideDiscoveryInfoMenuClick
        )

        return () => document.removeEventListener('click', handleOutsideDiscoveryInfoMenuClick)
    }, []);

    const handleOutsideDiscoveryInfoMenuClick = (event: any) => {
        var clicked = event.target as Element;
        var discoveryInfo = document.getElementById(discoveryInfoId);

        if (
            clicked != discoveryInfo && !discoveryInfo?.contains(clicked)
        ) {
            setShowDiscoveryInfo(false);
        }
    }

    return (
        <div
            id={discoveryInfoId}
        >
            <button
                className={`cursor-pointer rounded p-0.5  mt-1  
                    ${showDiscoveryInfo ? 'bg-hover-default' : ' hover:bg-hover-default'}
                    `}
                onClick={() => setShowDiscoveryInfo(prev => !prev)}
            >
                <Question
                    className="text-lg"
                    weight="bold"
                />
            </button>
            {
                showDiscoveryInfo && <div
                    className={`border  z-10 px-2 py-4   ml-2 sm:ml-4 mt-8 left-0 top-0 text-center
                            rounded  absolute  leading-4 font-bold    border-border-default  bg-background-default shadow-lg text-base
                            `}
                    style={{
                        width: '14rem',
                    }}
                >
                    Published stations will appear here.
                </div>
            }
        </div >
    )
}