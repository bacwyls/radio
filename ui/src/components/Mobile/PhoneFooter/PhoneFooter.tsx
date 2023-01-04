import React from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { selectIsDarkMode, selectIsLandscape, selectIsPlayModalOpen, selectIsSettingsMenuOpen, selectIsTalkModalOpen, selectIsViewersMenuOpen, setIsPlayModalOpen, setIsSettingsMenuOpen, setIsTalkModalOpen, setIsViewersMenuOpen } from "../../../features/ui/uiSlice"
import { isPhone } from "../../../util"
import { ChatButton } from "../ChatButton"
import { ViewersButton } from "../../ChatContainer/Viewers/ViewersButton"
import { HomeButton } from "../../UpperRow/HomeButton/HomeButton"
import { PhoneActionsMenu } from "../PhoneActionsMenu"
import './style.css';
import { ArrowLeft } from "phosphor-react"
import { SettingsMenu } from "../../PlayerContainer/SettingsMenu/SettingsMenu"
import { PlayModal } from "../../PlayerContainer/DJCommands/PlayButton/PlayModal"
import { TalkModal } from "../../PlayerContainer/DJCommands/TalkButton/TalkModal"

export const PhoneFooter = () => {

    const isLandscape = useAppSelector(selectIsLandscape);
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const isViewersMenuOpen = useAppSelector(selectIsViewersMenuOpen);
    const isSettingsMenuOpen = useAppSelector(selectIsSettingsMenuOpen);
    const isPlayModalOpen = useAppSelector(selectIsPlayModalOpen);
    const isTalkModalOpen = useAppSelector(selectIsTalkModalOpen);

    const dispatch = useAppDispatch();

    return (
        <div
            className={`w-screen  fixed 
                         border-t   
                        flex items-center 
                        ${isPhone() && isLandscape && 'phone-footer-landscape'}
                        ${isDarkMode ? 'bg-black-95 border-black-85 text-black-10' : 'bg-white text-black-80 border-black-10'}
                        ${(isViewersMenuOpen || isSettingsMenuOpen || isPlayModalOpen || isTalkModalOpen) ? 'justify-start' : 'justify-around'}
                        `}
            style={{ bottom: 0, height: '64px', zIndex: 160, }}
        >
            {(isSettingsMenuOpen) &&
                <>
                    < ArrowLeft
                        size={24}
                        weight="bold"
                        style={{ marginLeft: '24px' }}
                        onClick={() => {
                            dispatch(setIsSettingsMenuOpen(false))
                        }}
                    />
                    <SettingsMenu />
                </>
            }

            {(isPlayModalOpen) &&
                <>
                    < ArrowLeft
                        size={28}
                        weight="bold"
                        style={{ marginLeft: '24px' }}
                        onClick={() => {
                            dispatch(setIsPlayModalOpen(false))
                        }}
                    />
                    <PlayModal />
                </>
            }

            {(isTalkModalOpen) &&
                <>
                    < ArrowLeft
                        size={28}
                        weight="bold"
                        style={{ marginLeft: '24px' }}
                        onClick={() => {
                            dispatch(setIsTalkModalOpen(false))
                        }}
                    />
                    <TalkModal />
                </>
            }

            {(isViewersMenuOpen) &&
                <>
                    < ArrowLeft
                        size={28}
                        weight="bold"
                        style={{ marginLeft: '24px' }}
                        onClick={() => {
                            dispatch(setIsViewersMenuOpen(false))
                        }}
                    />
                </>
            }

            {
                !(isViewersMenuOpen || isSettingsMenuOpen || isPlayModalOpen || isTalkModalOpen) &&
                <>
                    <ChatButton />
                    <PhoneActionsMenu />
                    <HomeButton />
                </>
            }

        </div>
    )
}