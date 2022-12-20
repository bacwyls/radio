import React, { FC, } from 'react';
import { radio } from '../../../api';
import { useAppSelector } from '../../../app/hooks';
import { selectDescription, selectTunePatP } from '../../../features/station/stationSlice';
import { selectIsDarkMode, selectIsLandscape } from '../../../features/ui/uiSlice';
import { isPhone } from '../../../util';
import { Navigate } from '../../Navigation/NavigateMenu';
import { HomeButton } from '../HomeButton/HomeButton';
import { StationTitle } from '../StationTitle';
import { ThemeButton } from '../ThemeButton';
import './style.css';

interface IUpperRowContainer {
}

export const UpperRowContainer: FC<IUpperRowContainer> = (props: IUpperRowContainer) => {

  const isLandscape = useAppSelector(selectIsLandscape);
  const isDarkMode = useAppSelector(selectIsDarkMode);

  return (
    <div
      className={` flex justify-between items-center w-full border-b  
                   ${isPhone() && isLandscape && 'upper-row-phone-landscape'}
                   ${isDarkMode ? ' bg-black-95  border-black-85' : ' bg-white  border-gray-200'}
                `}
      style={{
        height: '64px',
        minHeight: '64px',
        padding: '0 24px'
      }}
    >
      <StationTitle />
      <div className="flex  items-center ">
        {/* <Navigate /> */}
        {!isPhone() && <HomeButton />}
        <ThemeButton />
      </div>
    </div >
  )
}