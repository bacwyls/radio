import React, { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectIsPublic } from "../../../features/station/stationSlice";
import { IsPublicBadge } from "../../IsPublicBadge";
import './style.css';

export const StationIsPublicInfo = () => {
    const [showInfo, setShowInfo] = useState(false);
    const isPublic = useAppSelector(selectIsPublic);

    return (
        <span
            className="  w-min relative h-min"
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
        >
            {showInfo &&
                <div
                    className={` public-info
                            `}
                >
                    {isPublic ? 'This station is public and everybody can use DJ commands (Play & Talk).'
                        :
                        'This station is private and only the host can use DJ commands (Play & Talk).'
                    }
                </div>}
            <IsPublicBadge isPublic={isPublic} />
        </span >
    )
}