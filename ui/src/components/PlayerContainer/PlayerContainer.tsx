import React, { FC, useEffect } from 'react';
import { Player } from './Player/Player';
import { SyncActions } from './SyncActions/SyncActions';
import { isPhone } from '../../util';
import { radio } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectIsPublic, selectSpinTime, selectSpinUrl, selectTunePatP } from '../../features/station/stationSlice';
import { PlayButton } from './DJCommands/PlayButton/PlayButton';
import { TalkButton } from './DJCommands/TalkButton/TalkButton';
import { DisabledPlayButton } from './DJCommands/PlayButton/DisabledPlayButton';
import { DisabledTalkButton } from './DJCommands/TalkButton/DisabledTalkButton';
import { SettingsMenu } from './SettingsMenu/SettingsMenu';
import { SettingsMenuButton } from './SettingsMenu/SettingsMenuButton';
import { PlayModal } from './DJCommands/PlayButton/PlayModal';
import { TalkModal } from './DJCommands/TalkButton/TalkModal';
import { selectPlayerReady, setPlayerInSync } from '../../features/ui/uiSlice';
import { isValidPatp } from 'urbit-ob'
import './style.css';

interface IPlayerContainer {

}

export const PlayerContainer: FC<IPlayerContainer> = (props: IPlayerContainer) => {

  const tunePatP = useAppSelector(selectTunePatP);
  const isPublic = useAppSelector(selectIsPublic);
  const playerReady = useAppSelector(selectPlayerReady);
  const spinUrl = useAppSelector(selectSpinUrl);
  const spinTime = useAppSelector(selectSpinTime);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPlayerInSync(true));
    radio.seekToDelta(spinTime);
  }, [playerReady]);

  useEffect(() => {
    if (!radio.player) return;
    radio.player.url = spinUrl;
  }, [spinUrl]);

  useEffect(() => {
    if (!radio.player) return;
    if (!playerReady) return;
    dispatch(setPlayerInSync(true));
    radio.seekToDelta(spinTime);
  }, [spinTime]);

  return (
    <div
      className={` ${isPhone() ? 'player-container-phone' : 'player-container'}`}
    >
      <Player />
      <SettingsMenu />
      <PlayModal />
      <TalkModal />
      {!isPhone() &&
        <div className=' w-full flex-wrap relative pb-2 sm:pb-0 pt-2 flex justify-center gap-2 '
        >
          {tunePatP == radio.our && <SettingsMenuButton />}
          {(radio.our != tunePatP && !isPublic) || !(tunePatP && isValidPatp(tunePatP)) ? <>
            <DisabledPlayButton />
            <DisabledTalkButton />
          </>
            :
            <>
              <PlayButton />
              <TalkButton />
            </>
          }
          <SyncActions />
        </div>
      }
    </div >
  );

}