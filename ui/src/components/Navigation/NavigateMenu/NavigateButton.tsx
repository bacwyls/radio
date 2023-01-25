import { NavigationArrow } from 'phosphor-react';
import React, { FC, useState, } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectIsNavigateMenuOpen, setIsNavigateMenuOpen } from '../../../features/ui/uiSlice';
import { NavigateMenu } from './NavigateMenu';

export const NavigateButton = () => {

    const isNavigateMenuOpen = useAppSelector(selectIsNavigateMenuOpen);

    const dispatch = useAppDispatch();

    return (
        <>
            <button
                className={`   text-center  rounded   px-2 font-bold gap-1 hidden md:flex
            flex justify-center items-center relative mr-0.5  hover:bg-hover-default
                    `}
                style={{
                    height: '1.7rem',
                }}
                onClick={() => dispatch(setIsNavigateMenuOpen(!isNavigateMenuOpen))}
            >
                <NavigationArrow weight="bold" className='text-xl' />
                Navigate
            </button>
            {isNavigateMenuOpen && <NavigateMenu onCancel={() => dispatch(setIsNavigateMenuOpen(!isNavigateMenuOpen))} />}
        </>
    )

}