import React, { FC, } from 'react';
import { radio } from '../../../api';
import { useAppSelector } from '../../../app/hooks';
import { selectTunePatP } from '../../../features/station/stationSlice';
import { selectIsLandscape } from '../../../features/ui/uiSlice';
import { isPhone } from '../../../util';
import { Navigate } from '../../Navigation/NavigateMenu';
import { HomeButton } from '../HomeButton';
import { PublishStationButton } from '../SettingsMenu/PublishStationButton';
import { SettingsMenu } from '../SettingsMenu/SettingsMenu';
import { StationTitle } from '../StationTitle';
import { ThemeButton } from '../ThemeButton';
import './style.css';

interface IUpperRowContainer {
}

export const UpperRowContainer: FC<IUpperRowContainer> = (props: IUpperRowContainer) => {

  const isLandscape = useAppSelector(selectIsLandscape);
  const tunePatP = useAppSelector(selectTunePatP);

  return (
    <div
      className={` flex justify-between w-full 
                   ${isPhone() && isLandscape && 'upper-row-phone-landscape'}
                `}
      style={{ height: '2.5em' }}
    >
      <StationTitle />
      <div className="flex  items-center ">
        {/* <Navigate /> */}
        {tunePatP == radio.our && <SettingsMenu />}
        <ThemeButton />
        {!isPhone() && <HomeButton />}
      </div>
    </div >
  )
}