import React, { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectIsPublic } from "../../../features/station/stationSlice";
import { selectIsDarkMode } from "../../../features/ui/uiSlice";
import { isPhone } from "../../../util";
import './style.css';

export const IsPublicInfo = () => {
    const [showInfo, setShowInfo] = useState(false);
    const isPublic = useAppSelector(selectIsPublic);
    const isDarkMode = useAppSelector(selectIsDarkMode);

    return (
        <span className={`relative flex items-center justify-center rounded
        ml-1 font-bold text-black-90 h-3 bg-blue-70  
        
        `}
            style={{
                fontSize: '14px',
                padding: '0 .3em'

            }}
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
        >
            {isPublic ? 'Public' : 'Private'}
            {showInfo &&
                <div
                    className={` 
                    ${isPhone() ? 'public-info-phone' : 'public-info'}
                      ${isDarkMode ? ' bg-black-95 border-black-85 text-black-10 filter drop-shadow-md-dark  ' : ' bg-white text-black-80 border-black-10 '}
                            `}
                >
                    {isPublic ? 'This station is public and everybody can use DJ commands (Play & Talk).'
                        :
                        'This station is private and only the host can use DJ commands (Play & Talk).'
                    }
                </div>}
        </span >
    )
}