import React, { FC, useEffect } from 'react';
import { Help } from '../ChatContainer/Help/Help';
import { Player } from './Player/Player';
import { SyncActions } from './SyncActions';
import { isPhone } from '../../util';
import { ViewersButton } from './Viewers/ViewersButton';

interface IPlayerContainer {

}

export const PlayerContainer: FC<IPlayerContainer> = (props: IPlayerContainer) => {

  return (
    <div className={`inline-block relative  w-full flex flex-col 
                     ${isPhone() ? '' : ''}
                     `}
      style={{ marginRight: '25px' }}
    >
      <Player />
      <SyncActions />
      {/* {!isPhone() && <div className='flex overflow-hidden justify-between'>
        <ViewersButton />
        <div className='flex items-start mt-1 gap-1'>
          <SyncActions />
          <Help />
        </div>
      </div>} */}
    </div >
  );
}