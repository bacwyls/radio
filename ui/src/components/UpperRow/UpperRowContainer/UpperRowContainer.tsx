import React, { FC, } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectIsLandscape } from '../../../features/ui/uiSlice';
import { isPhone } from '../../../util';
import { HomeButton } from '../HomeButton/HomeButton';
import { StationTitle } from '../StationTitle';
import { ThemeButton } from '../ThemeButton';
import './style.css';

interface IUpperRowContainer {
}

export const UpperRowContainer: FC<IUpperRowContainer> = (props: IUpperRowContainer) => {

  const isLandscape = useAppSelector(selectIsLandscape);

  return (
    <div
      className={` flex justify-between items-center w-full border-b 
      border-border-default bg-background-default px-4
                   ${isPhone() && isLandscape && 'upper-row-phone-landscape'}
                `}
      style={{
        height: '64px',
        minHeight: '64px',
      }}
    >
      <StationTitle />
      <div className="flex  items-center ">
        {!isPhone() && <HomeButton />}
        <ThemeButton />
      </div>
    </div >
  )
}