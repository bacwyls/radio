import React from "react"
import { useAppSelector } from "../../../app/hooks"
import { selectIsLandscape } from "../../../features/ui/uiSlice"
import { isPhone } from "../../../util"
import { ChatButton } from "../../ChatContainer/ChatButton"
import { ViewersButton } from "../../PlayerContainer/Viewers/ViewersButton"
import { HomeButton } from "../../UpperRow/HomeButton"
import { PhoneActionsMenu } from "../PhoneActionsMenu"
import './style.css';

export const PhoneFooter = () => {

    const isLandscape = useAppSelector(selectIsLandscape);

    return (
        <div
            className={`w-full  fixed 
                         bg-white border-t  border-gray-400 z-10
                        flex justify-around items-center
                        ${isPhone() && isLandscape && 'phone-footer-landscape'}
                        `}
            style={{ bottom: 0, height: '8vh' }}
        >
            <ChatButton />
            <ViewersButton />
            <PhoneActionsMenu />
            <HomeButton />
        </div>
    )
}