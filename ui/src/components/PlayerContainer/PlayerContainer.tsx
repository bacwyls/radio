import React, { FC } from 'react';
import { Help } from './Help';
import { Viewers } from './Viewers';
import { Player } from './Player';
import { SyncActions } from './SyncActions';

interface IPlayerContainer {

}

export const PlayerContainer: FC<IPlayerContainer> = (props: IPlayerContainer) => {

  const height = "78vh";

  return (
    <div className="inline-block w-full lg:mr-3 /
                    lg:w-2/3 h-full "
      style={{
        height: height,
        maxHeight: height,
      }}
    >
      <div className="relative">
        <Player />
        <div className='flex overflow-hidden justify-between'>
          <Viewers />
          <div className='flex items-start mt-1'>
            <SyncActions />
            <Help />
          </div>
        </div>
      </div >
    </div >
  );
}