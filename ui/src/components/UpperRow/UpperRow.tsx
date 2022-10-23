import React, { FC, } from 'react';
import { Radio } from '../../lib';
import { PublishStationButton } from './PublishStationButton';
import { Navigation } from './Navigation';
import { StationTitle } from './StationTitle';

interface IUpperRow {
  our: string;
  tuneTo: ((patp: string | null) => void);
  radio: Radio;
}

export interface IMinitower {
  location: string;
  description: string;
  time: number;
  viewers: number;
}

export const UpperRow: FC<IUpperRow> = (props: IUpperRow) => {

  const { our, tuneTo, radio } = props;

  const height = '10vh';
  return (
    <div className="py-1 flex" style={{ height: height, maxHeight: height }}>
      <div className="flex align-middle items-center justify-between m-w-2/3 mr-2 w-2/3">
        <StationTitle our={our} />
        <PublishStationButton radio={radio} />
      </div>
      <div className="flex flex-row m-w-1/3 w-1/3 justify-end items-center">
        <Navigation radio={radio} our={our} tuneTo={tuneTo} />
      </div>
    </div >
  )
}