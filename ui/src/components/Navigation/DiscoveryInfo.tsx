import React, { useEffect, useState } from "react"
import { MdOutlineInfo } from "react-icons/md";

export const DiscoveryInfo = () => {

    const [showDiscoveryInfo, setShowDiscoveryInfo] = useState(false);

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
                className="flex items-center font-semibold h-6 "
                style={{ fontSize: '.75rem' }}
            >
                <span
                    className="h-full flex items-center whitespace-nowrap	"
                    style={{ paddingBottom: '0.1em' }}
                > Discovery pool
                </span>
                <MdOutlineInfo
                    onClick={() => setShowDiscoveryInfo(prev => !prev)}
                    className="cursor-pointer ml-1 h-full  "
                />
            </div>
            {showDiscoveryInfo && <div
                className="border bg-white z-10 px-2 py-4 ml-2 sm:ml-4 mt-8 
                            rounded shadow absolute text-xs leading-4"
                style={{
                    left: 0,
                    top: 0,
                    width: '15em',
                }}
            >

                Published stations with the most viewers will appear here.
            </div>}
        </div>

    )

}