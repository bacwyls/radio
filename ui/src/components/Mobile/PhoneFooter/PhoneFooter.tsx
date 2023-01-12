import React from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { selectIsLandscape, selectIsPlayModalOpen, selectIsSettingsMenuOpen, selectIsTalkModalOpen, selectIsViewersMenuOpen, setIsPlayModalOpen, setIsSettingsMenuOpen, setIsTalkModalOpen, setIsViewersMenuOpen } from "../../../features/ui/uiSlice"
import { isPhone } from "../../../util"
import { ChatButton } from "../ChatButton"
import { HomeButton } from "../../UpperRow/HomeButton/HomeButton"
import { PhoneActionsMenu } from "../PhoneActionsMenu"
import './style.css';
import { ArrowLeft } from "phosphor-react"
import { SettingsMenu } from "../../PlayerContainer/SettingsMenu/SettingsMenu"
import { PlayModal } from "../../PlayerContainer/DJCommands/PlayButton/PlayModal"
import { TalkModal } from "../../PlayerContainer/DJCommands/TalkButton/TalkModal"

export const PhoneFooter = () => {

    const isLandscape = useAppSelector(selectIsLandscape);
    const isViewersMenuOpen = useAppSelector(selectIsViewersMenuOpen);
    const isSettingsMenuOpen = useAppSelector(selectIsSettingsMenuOpen);
    const isPlayModalOpen = useAppSelector(selectIsPlayModalOpen);
    const isTalkModalOpen = useAppSelector(selectIsTalkModalOpen);

    const dispatch = useAppDispatch();

    return (
        <div
            className={`w-screen  fixed 
                         border-t
                        flex items-center text-text-default bg-background-default border-border-default
                        ${isPhone() && isLandscape && 'phone-footer-landscape'}
                        ${(isViewersMenuOpen || isSettingsMenuOpen || isPlayModalOpen || isTalkModalOpen) ? 'justify-start' : 'justify-around'}
                        `}
            style={{ bottom: 0, height: '2.666rem', zIndex: 160, }}
        >
            {(isSettingsMenuOpen) &&
                <>
                    < ArrowLeft
                        className='ml-4 text-2xl'
                        weight="bold"
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
                        weight="bold"
                        className='ml-4 text-2xl'
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
                        weight="bold"
                        className='ml-4 text-2xl'
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
                        weight="bold"
                        className='ml-4 text-2xl'
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