import React, { FC } from 'react';
import { Radio } from '../../lib';
import { Help } from './Help';
import { Viewers } from './Viewers';
import { Player } from './Player';
import { SyncActions } from './SyncActions';

interface IPlayerContainer {
  our: string;
  radio: Radio;
  tuneTo: ((patp: string | null) => void);
}

export const PlayerContainer: FC<IPlayerContainer> = (props: IPlayerContainer) => {

  const { our, radio, tuneTo } = props;

  const height = "78vh";

  return (
    <div className="inline-block w-full lg:mr-2 /
                    lg:w-2/3 h-full "
      style={{
        height: height,
        maxHeight: height,
      }}
    >
      <div className="relative">
        <Player radio={radio} our={our} />
        <div className={'flex overflow-hidden justify-between'}>
          <Viewers />
          <div className='flex items-start mt-1'>
            <SyncActions radio={radio} our={our} />
            <Help />
          </div>
        </div>
      </div >
    </div >
  );
}