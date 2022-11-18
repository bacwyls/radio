import React, { useEffect, useState } from "react";
import { FC } from "react";
import { useMobileOrientation } from "react-device-detect";
import ReactPlayer from "react-player";
import { radio } from "../../../api";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectSpinTime, selectSpinUrl } from "../../../features/station/stationSlice";
import { selectIsLandscape, selectPlayerReady, setPlayerInSync, setPlayerReady } from "../../../features/ui/uiSlice";
import { isPhone } from "../../../util";
import './Player.css';

interface IPlayer {
}

export type Orientation = 'Landscape' | 'Portrait';

export const Player: FC<IPlayer> = (props: IPlayer) => {

    const playerReady = useAppSelector(selectPlayerReady);
    const spinUrl = useAppSelector(selectSpinUrl);
    const spinTime = useAppSelector(selectSpinTime);
    const isLandscape = useAppSelector(selectIsLandscape);

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
            className={`${isPhone() ? (isLandscape ? 'player-phone-landscape' : 'player-phone-portrait') : 'player  '}`}
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
                <p className="text-center absolute 
                            left-1/2 -translate-x-1/2">
                    loading media player...
                </p>
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
                // onSeek={e => console.log('onSeek', e)}
                onProgress={e => handleProgress(e)}
                style={{
                    backgroundColor: 'lightgray',
                    borderRadius: `${isPhone() ? '0' : '0.25rem'}`,
                    overflow: 'hidden',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
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