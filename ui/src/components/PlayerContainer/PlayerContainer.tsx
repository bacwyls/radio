import React, { FC } from 'react';
import { Player } from './Player/Player';
import { SyncActions } from './SyncActions/SyncActions';
import { isPhone } from '../../util';
import { radio } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { selectIsPublic, selectTunePatP } from '../../features/station/stationSlice';
import { PlayButton } from './DJCommands/PlayButton/PlayButton';
import { TalkButton } from './DJCommands/TalkButton/TalkButton';
import { DisabledPlayButton } from './DJCommands/PlayButton/DisabledPlayButton';
import { DisabledTalkButton } from './DJCommands/TalkButton/DisabledTalkButton';
import { SettingsMenu } from './SettingsMenu/SettingsMenu';
import { SettingsButton } from './SettingsMenu/SettingsButton';
import { PlayMenu } from './DJCommands/PlayButton/PlayMenu';
import { TalkMenu } from './DJCommands/TalkButton/TalkMenu';
import { isValidPatp } from 'urbit-ob'
import './style.css';

interface IPlayerContainer {

}

export const PlayerContainer: FC<IPlayerContainer> = (props: IPlayerContainer) => {

  const tunePatP = useAppSelector(selectTunePatP);
  const isPublic = useAppSelector(selectIsPublic);

  return (
    <div
      className={` ${isPhone() ? 'player-container-phone' : 'player-container'}`}
    >
      <Player />
      <SettingsMenu />
      <PlayMenu />
      <TalkMenu />
      {!isPhone() &&
        <div className=' w-full flex-wrap relative pb-2 sm:pb-0 pt-2 flex justify-center gap-2 '
        >
          {tunePatP == radio.our && <SettingsButton />}
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