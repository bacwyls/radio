import React from "react";
import { FC } from "react";
import ReactPlayer from "react-player";
import { radio } from "../../../api";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectSpinTime, selectSpinUrl } from "../../../features/station/stationSlice";
import { selectIsDarkMode, selectIsLandscape, selectIsPlayModalOpen, selectIsSettingsMenuOpen, selectIsTalkModalOpen, selectPlayerReady, setPlayerInSync, setPlayerReady } from "../../../features/ui/uiSlice";
import { isPhone } from "../../../util";
import { PlayerLoadingAnimation } from "../PlayerLoadingAnimation/PlayerLoadingAnimation";
import './Player.css';

interface IPlayer {
}

export type Orientation = 'Landscape' | 'Portrait';

export const Player: FC<IPlayer> = (props: IPlayer) => {

    const playerReady = useAppSelector(selectPlayerReady);
    const spinUrl = useAppSelector(selectSpinUrl);
    const spinTime = useAppSelector(selectSpinTime);
    const isLandscape = useAppSelector(selectIsLandscape);
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const isTalkModalOpen = useAppSelector(selectIsTalkModalOpen);
    const isPlayModalOpen = useAppSelector(selectIsPlayModalOpen)
    const isSettingsMenuOpen = useAppSelector(selectIsSettingsMenuOpen);


    const dispatch = useAppDispatch();

    function handleProgress(progress: any) {
        // autoscrubbing

        var currentUnixTime = Date.now() / 1000;
        var delta = Math.ceil(currentUnixTime - spinTime);
        var duration = radio.player.getDuration();
        let diff = Math.abs((delta % duration) - progress.playedSeconds)

        if (radio.our === radio.tunedTo) {
            // if(diff > 60) {
            //   console.log('host broadcasting new time')
            //   radio.setTime(spinUrl, progress.playedSeconds);
            // }
            if (diff > 3) {
                dispatch(setPlayerInSync(false));
            }
            return;
        }
        // we arent the host
        if (diff > 2) {
            // client scrub to host
            console.log('client scrubbing to host')
            radio.seekToDelta(spinTime);
            return;
        }
    }


    return (
        <div
            className={` 
            ${isPhone() ? (isLandscape ? 'player-phone-landscape' : 'player-phone-portrait') : 'player  '}
            `}
            style={
                !(isPhone() && isLandscape) ? {}
                    :
                    {
                        minWidth: window.innerWidth + 'px',
                        width: window.innerWidth + 'px',
                        minHeight: window.innerHeight + 'px',
                        height: window.innerHeight + 'px',
                    }}
        >
            {!playerReady &&
                <div className="w-full h-full"
                    style={{
                        backgroundColor: isDarkMode ? '#4A4948' : '#D2D1D1',
                        borderRadius: `${isPhone() ? '0' : '0.375rem'}`,
                    }}
                >
                    <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                        <PlayerLoadingAnimation />
                    </span>
                </div>
            }
            <ReactPlayer
                ref={radio.playerRef}
                url={spinUrl}
                playing={true}
                width='100%'
                height='100%'
                controls={true}
                loop={true}
                onReady={() => dispatch(setPlayerReady(true))}
                onProgress={e => handleProgress(e)}
                style={{
                    backgroundColor: isDarkMode ? '#3F3D3C' : '#D2D1D1',
                    borderRadius: `${isPhone() ? '0' : '0.375rem'}`,
                    overflow: 'hidden',
                    filter: (!isPhone() && (isPlayModalOpen || isTalkModalOpen || isSettingsMenuOpen)) ? 'blur(2px) brightness(40%)' : '',
                    boxShadow: isDarkMode ? '0 4px 6px -1px rgb(0 0 0 / 0.6), 0 2px 4px -2px rgb(0 0 0 / 0.6)' : '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)   ',
                    visibility: playerReady ? 'visible' : 'hidden',
                }}
                config={{
                    file: {
                        // makes the audio player look nice
                        attributes: { style: { height: '50%', width: '100%', transform: 'translateY(12.5%)', } }
                    },
                }}
            />
        </div >
    )
}