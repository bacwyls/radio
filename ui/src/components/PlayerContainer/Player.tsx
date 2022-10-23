import React from "react";
import { FC } from "react";
import ReactPlayer from "react-player";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSpinTime, selectSpinUrl } from "../../features/station/stationSlice";
import { selectPlayerReady, setPlayerInSync, setPlayerReady } from "../../features/ui/uiSlice";
import { Radio } from "../../lib";

interface IPlayer {
    radio: Radio;
    our: string;
}

export const Player: FC<IPlayer> = (props: IPlayer) => {
    const { radio, our } = props;

    const playerReady = useAppSelector(selectPlayerReady);
    const spinUrl = useAppSelector(selectSpinUrl);
    const spinTime = useAppSelector(selectSpinTime);

    const dispatch = useAppDispatch();

    function handleProgress(progress: any) {
        // autoscrubbing

        var currentUnixTime = Date.now() / 1000;
        var delta = Math.ceil(currentUnixTime - spinTime);
        var duration = radio.player.getDuration();
        let diff = Math.abs((delta % duration) - progress.playedSeconds)

        if (our === radio.tunedTo) {
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
        <div className="relative ">
            {!playerReady &&
                <p className="text-center absolute left-1/2 -translate-x-1/2">loading media player ...</p>
            }
            <ReactPlayer
                ref={radio.playerRef}
                url={spinUrl}
                playing={true}
                width='100%'
                height='68vh'
                controls={true}
                loop={true}
                onReady={() => dispatch(setPlayerReady(true))}
                // onSeek={e => console.log('onSeek', e)}
                onProgress={e => handleProgress(e)}
                style={{
                    backgroundColor: 'lightgray', borderRadius: '0.25rem',
                    overflow: 'hidden', boxShadow: 'rgba(50, 50, 93, 0.25) \
             0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
                }}
                config={{
                    file: {
                        // makes the audio player look nice
                        attributes: { style: { height: '50%', width: '100%' } }
                    },
                }}
            />
        </div>
    )


}