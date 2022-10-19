import React, { FC, useState } from 'react';
import ReactPlayer from 'react-player';
import { isMobile } from 'react-device-detect';
import { Radio } from '../lib';
import { Navigation } from './Navigation';
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

interface IPlayerColumn {
  our: string;
  radio: Radio;
  tuneTo: ((patp:string | null) => void);
}

export const PlayerColumn: FC<IPlayerColumn> = (props: IPlayerColumn) => {

  const {our, radio, tuneTo} = props;

  const spinUrl = useAppSelector(selectSpinUrl);
  const spinTime = useAppSelector(selectSpinTime);
  const tunePatP = useAppSelector(selectTunePatP);
  const playerReady = useAppSelector(selectPlayerReady);
  const playerInSync = useAppSelector(selectPlayerInSync);
  const viewers = useAppSelector(selectViewers);
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

  const wrapperClass = isMobile
    ? ''
    : 'inline-block mr-4 w-2/3';

  const reactPlayerHeight = isMobile
    ? '30vh'
    : '80vh';

  return(
    <div 
      className={wrapperClass}
      id='player-wrapper'
    >
      <Navigation
        our={our}
        tuneTo={tuneTo}
        radio={radio}
      />
      <div>
        {!playerReady &&
          <p className="text-center">loading media player ...</p>
        }
        <ReactPlayer
          ref={radio.playerRef}
          url={spinUrl}
          playing={true}
          width='100%'
          height={reactPlayerHeight}
          controls={true}
          loop={true}
          onReady={() => dispatch(setPlayerReady(true))}
          // onSeek={e => console.log('onSeek', e)}
          onProgress={e => handleProgress(e)}
          style={{ backgroundColor:'lightgray' }}
          config={{
            file: {
              // makes the audio player look nice
              attributes:{ style: { height: '50%', width: '100%' }}
            },
          }}
        />
        <div className={'flex flex-row'}>
          <div className={'flex-1' }>
            <p className={'mt-2 '}>{viewers.length}{' viewers:'}</p>
            {viewers.map((x, i) => 
              <span 
                className={'mr-3'}
                key={i}
              >
                <a
                  className={''}
                  href={'/apps/landscape/~profile/'+x}
                  target="_blank"
                >
                  {x}
                </a>
                {', '}
              </span>
            )}
          </div>
          {!playerInSync && 
            <div> 
              <button
                className={`hover:pointer px-4 py-2 \
                          flex-initial outline-none \
                          font-bold underline border-black border-t-0 \
                          text-yellow-500 `}
                onClick={(e) => {
                  radio.seekToDelta(spinTime);
                  dispatch(setPlayerInSync(true));
                }}
              >
                resync self
              </button>
              {tunePatP === props.our && 
                <button
                  className={`hover:pointer px-4 py-2 \
                            flex-initial outline-none \
                            font-bold underline border-black border-t-0 \
                            text-blue-500 `}
                  style={{ whiteSpace:'nowrap' }}
                  onClick={(e) => {
                    radio.resyncAll(spinUrl)
                  }}
                >
                  resync all
                </button>
              }
            </div>
          }
          <div>
            <button
              className={`hover:pointer px-4 py-2 \
                        flex-initial outline-none \
                        font-bold underline border-black border-t-0 \
                        ${helpMenuOpen ? 'border' : ''}`}
              onClick={(e) => {
                setHelpMenuLeft(e.clientX);
                setHelpMenuTop(e.clientY);
                setHelpMenuOpen(!helpMenuOpen);
              }}
            >
              help
            </button>
            {helpMenuOpen &&
              <HelpMenu left={helpMenuLeft} top={helpMenuTop}/>
            }
          </div>
        </div>
      </div>
    </div>
  );
}