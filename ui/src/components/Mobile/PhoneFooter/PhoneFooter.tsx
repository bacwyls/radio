import React from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { selectIsLandscape, selectIsPlayMenuOpen, selectIsSettingsMenuOpen, selectIsTalkMenuOpen, selectIsViewersMenuOpen, setIsPlayMenuOpen, setIsSettingsMenuOpen, setIsTalkMenuOpen, setIsViewersMenuOpen } from "../../../features/ui/uiSlice"
import { isPhone } from "../../../util"
import { ChatButton } from "../ChatButton"
import { HomeButton } from "../../UpperRow/HomeButton/HomeButton"
import { PhoneActionsMenu } from "../PhoneActionsMenu"
import './style.css';
import { ArrowLeft } from "phosphor-react"
import { SettingsMenu } from "../../PlayerContainer/SettingsMenu/SettingsMenu"
import { PlayMenu } from "../../PlayerContainer/DJCommands/PlayButton/PlayMenu"
import { TalkMenu } from "../../PlayerContainer/DJCommands/TalkButton/TalkMenu"

export const PhoneFooter = () => {

    const isLandscape = useAppSelector(selectIsLandscape);
    const isViewersMenuOpen = useAppSelector(selectIsViewersMenuOpen);
    const isSettingsMenuOpen = useAppSelector(selectIsSettingsMenuOpen);
    const isPlayMenuOpen = useAppSelector(selectIsPlayMenuOpen);
    const isTalkMenuOpen = useAppSelector(selectIsTalkMenuOpen);

    const dispatch = useAppDispatch();

    return (
        <div
            className={`w-screen  fixed 
                         border-t
                        flex items-center text-text-default bg-background-default border-border-mild 
                        ${isPhone() && isLandscape && 'phone-footer-landscape'}
                        ${(isViewersMenuOpen || isSettingsMenuOpen || isPlayMenuOpen || isTalkMenuOpen) ? 'justify-start' : 'justify-around'}
                        `}
            style={{ bottom: 0, height: '2.7rem', zIndex: 160, }}
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

            {(isPlayMenuOpen) &&
                <>
                    < ArrowLeft
                        weight="bold"
                        className='ml-4 text-2xl'
                        onClick={() => {
                            dispatch(setIsPlayMenuOpen(false))
                        }}
                    />
                    <PlayMenu />
                </>
            }

            {(isTalkMenuOpen) &&
                <>
                    < ArrowLeft
                        weight="bold"
                        className='ml-4 text-2xl'
                        onClick={() => {
                            dispatch(setIsTalkMenuOpen(false))
                        }}
                    />
                    <TalkMenu />
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
                !(isViewersMenuOpen || isSettingsMenuOpen || isPlayMenuOpen || isTalkMenuOpen) &&
                <>
                    <ChatButton />
                    <PhoneActionsMenu />
                    <HomeButton />
                </>
            }

        </div>
    )
}