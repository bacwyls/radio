import React, { FC, useState } from 'react';
import ReactPlayer from "react-player";
import { Radio } from '../lib';
import { HelpMenu } from './HelpMenu';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  selectSpinUrl,
  selectSpinTime,
  selectTunePatP,
  selectViewers
} from '../features/station/stationSlice';
import {
  setPlayerReady,
  setPlayerInSync,
  selectPlayerInSync,
  selectPlayerReady,
} from '../features/ui/uiSlice';
import { IoMdHelpCircleOutline, IoMdSync } from 'react-icons/io'
import { Viewers } from './Viewers';

interface IPlayerContainer {
  our: string;
  radio: Radio;
  tuneTo: ((patp: string | null) => void);
}

export const PlayerContainer: FC<IPlayerContainer> = (props: IPlayerContainer) => {

  const { our, radio, tuneTo } = props;

  const spinUrl = useAppSelector(selectSpinUrl);
  const spinTime = useAppSelector(selectSpinTime);
  const tunePatP = useAppSelector(selectTunePatP);
  const playerReady = useAppSelector(selectPlayerReady);
  const playerInSync = useAppSelector(selectPlayerInSync);
  // const helpMenuOpen = useAppSelector(selectHelpMenuOpen);
  // const helpMenuTop = useAppSelector(selectHelpMenuTop);
  // const helpMenuLeft = useAppSelector(selectHelpMenuLeft);
  const dispatch = useAppDispatch();

  const [helpMenuOpen, setHelpMenuOpen] = useState(false);
  const [helpMenuTop, setHelpMenuTop] = useState(0);
  const [helpMenuLeft, setHelpMenuLeft] = useState(0);

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

  const height = "78vh";

  return (
    <div className="inline-block w-full lg:mr-2 /
                    lg:w-2/3 h-full "
      style={{
        height: height,
        maxHeight: height,
      }}
    >
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
        <div className={'flex overflow-hidden justify-between'}>
          <Viewers />
          <div className='flex items-start mt-1'>
            {!playerInSync &&
              <>
                <button
                  className={` px-2  ml-2 mr-2\
                          flex-initial outline-none \
                          font-bold border-black \
                          flex text-center items-center justify-center 
                          text-yellow-500 `}
                  style={{ fontSize: '.7rem' }}
                  onClick={(e) => {
                    radio.seekToDelta(spinTime);
                    dispatch(setPlayerInSync(true));
                  }}
                >
                  <IoMdSync className='mr-1 text-sm' /> resync self
                </button>
                {tunePatP === props.our &&
                  <button
                    className={` px-2  mr-2\
                            flex-initial outline-none \
                            font-bold  \
                            text-blue-500 \
                            flex text-center items-center justify-center
                           border-black
                            `}
                    style={{ whiteSpace: 'nowrap', fontSize: '.7rem' }}
                    onClick={(e) => {
                      radio.resyncAll(spinUrl)
                    }}
                  >
                    <IoMdSync className='mr-1 text-sm' /> resync all
                  </button>
                }
              </>
            }
            <button
              id='help-button'
              className={` px-2  \
                         flex flex-initial items-center justify-center outline-none \
                        font-bold  border-black\
                        text-center
                        `}
              style={{ fontSize: '.7rem' }}
              onClick={(e) => {
                setHelpMenuLeft(e.clientX);
                setHelpMenuTop(e.clientY);
                setHelpMenuOpen(!helpMenuOpen);
              }}
            >
              <IoMdHelpCircleOutline className='mr-1 text-sm' />
              help
            </button>
          </div>
          {helpMenuOpen &&
            <HelpMenu left={helpMenuLeft} top={helpMenuTop} setHelpMenuOpen={setHelpMenuOpen} />
          }
        </div>
      </div >
    </div >
  );
}