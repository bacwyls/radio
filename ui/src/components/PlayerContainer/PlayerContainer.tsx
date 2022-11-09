import React, { FC, useEffect } from 'react';
import { Help } from './Help/Help';
import { Player } from './Player/Player';
import { SyncActions } from './SyncActions';
import { isPhone } from '../../util';
import { ViewersButton } from './Viewers/ViewersButton';

interface IPlayerContainer {

}

export const PlayerContainer: FC<IPlayerContainer> = (props: IPlayerContainer) => {

  return (
    <div className={`inline-block relative sm:mr-3 w-full 
                     ${isPhone() ? '' : 'mb-2'}
                     `}
    >
      <Player />
      {!isPhone() && <div className='flex overflow-hidden justify-between'>
        <ViewersButton />
        <div className='flex items-start mt-1 gap-1'>
          <SyncActions />
          <Help />
        </div>
      </div>}
    </div >
  );
}