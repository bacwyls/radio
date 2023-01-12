import React from "react"
import { useAppSelector } from "../app/hooks";
import { selectIsPublic } from "../features/station/stationSlice";

export const IsPublicBadge = () => {

    const isPublic = useAppSelector(selectIsPublic);

    return (
        <span className={`flex items-center justify-center rounded
                          ml-1.5  font-bold  text-black-90 h-3 bg-background-badge text-sm
                          `}
            style={{
                padding: '0.2rem'
            }}
        >
            {isPublic ? 'Public' : 'Private'}
        </span>
    )

}