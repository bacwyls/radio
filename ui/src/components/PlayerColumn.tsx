import React, { FC, Component, useReducer } from 'react';
import ReactPlayer from "react-player";
import { HelpMenu } from './HelpMenu';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  setSpinUrl,
  setSpinTime,
  setViewers,
  selectSpinUrl,
  selectSpinTime,
  selectTunePatP,
  selectViewers
} from '../features/station/stationSlice';
import {
  setPlayerReady,
  setPlayerInSync,
  setNavigationOpen,
  setHelpMenuOpen,
  setHelpMenuTop,
  setHelpMenuLeft,
  selectNavigationOpen,
  selectPlayerInSync,
  selectPlayerReady,
  selectHelpMenuOpen,
  selectHelpMenuTop,
  selectHelpMenuLeft
} from '../features/ui/uiSlice';

interface IPlayerColumn {
  our: string;
  handleProgress: ((progress: any) => void);
  playerRef: any;
  radioSeekToDelta: ((spinTime: any) => void);
  radioResyncAll: ((spinUrl: any) => void);
}

export const PlayerColumn: FC<IPlayerColumn> = (props: IPlayerColumn) => {

  const { our, handleProgress, playerRef, radioSeekToDelta, radioResyncAll } = props;

  const spinUrl = useAppSelector(selectSpinUrl);
  const spinTime = useAppSelector(selectSpinTime);
  const tunePatP = useAppSelector(selectTunePatP);
  const playerReady = useAppSelector(selectPlayerReady);
  const playerInSync = useAppSelector(selectPlayerInSync);
  const viewers = useAppSelector(selectViewers);
  const helpMenuOpen = useAppSelector(selectHelpMenuOpen);
  const helpMenuTop = useAppSelector(selectHelpMenuTop);
  const helpMenuLeft = useAppSelector(selectHelpMenuLeft);
  const dispatch = useAppDispatch();

  return(
    <div>
      {!playerReady &&
        <p className="text-center">loading media player ...</p>
      }
      <ReactPlayer
        ref={playerRef}
        url={spinUrl}
        playing={true}
        width='100%'
        height='80vh'
        controls={true}
        loop={true}
        onReady={() => dispatch(setPlayerReady(true))}
        // onSeek={e => console.log('onSeek', e)}
        onProgress={e => handleProgress(e)}
        style={{ backgroundColor:'lightgray' }}
        config={{
          file: {
            // makes the audio player look nice
            attributes: { style: {height:'50%', width:'100%',}}
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
              {x}{', '}
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
                props.radioSeekToDelta(spinTime);
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
                style={{
                  whiteSpace:'nowrap'
                }}
                onClick={(e) => {
                  props.radioResyncAll(spinUrl)
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
              dispatch(setHelpMenuLeft(e.clientX));
              dispatch(setHelpMenuTop(e.clientY));
              dispatch(setHelpMenuOpen(!helpMenuOpen));
            }}
          >
            help
          </button>
          {helpMenuOpen &&
            <HelpMenu left={helpMenuLeft} top={helpMenuTop} />
          }
        </div>
      </div>
    </div>
  )
}