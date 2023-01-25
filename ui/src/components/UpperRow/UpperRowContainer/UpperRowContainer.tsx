import React, { FC, } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectIsLandscape } from '../../../features/ui/uiSlice';
import { isPhone } from '../../../util';
import { HomeButton } from '../HomeButton/HomeButton';
import { StationTitle } from '../StationTitle';
import { ThemeButton } from '../../ThemeButton';
import { NavigateButton } from '../../Navigation/NavigateMenu/NavigateButton';
import './style.css';

interface IUpperRowContainer {
}

export const UpperRowContainer: FC<IUpperRowContainer> = (props: IUpperRowContainer) => {

  const isLandscape = useAppSelector(selectIsLandscape);

  return (
    <div
      className={` flex justify-between items-center w-full border-b-2 
      border-border-mild  bg-background-default px-4 
                   ${isPhone() && isLandscape && 'upper-row-phone-landscape'}
                `}
      style={{
        height: '2.7rem',
        minHeight: '2.7rem',
      }}
    >
      <StationTitle />
      <div className="flex  items-center ">
        {!isPhone() &&
          <>
            <NavigateButton />
            <HomeButton />
          </>
        }
        <ThemeButton />
      </div>
    </div >
  )
}