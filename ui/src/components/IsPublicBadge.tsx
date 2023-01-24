import React from "react"

export const IsPublicBadge = ({ isPublic }) => {

    return (
        <span className={`flex items-center justify-center rounded 
                          ml-1.5  font-bold  text-black-90 h-3 bg-background-badge text-sm
                          `}
            style={{
                padding: '0.05rem 0.2rem 0 0.2rem'
            }}
        >
            {isPublic ? 'Public' : 'Private'}
        </span>
    )

}