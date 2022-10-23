import React, { FC, useEffect, useState } from 'react';
import { Radio } from '../../lib';
import { IMinitower } from './UpperRow';
import { NavItem } from '../NavItem';
import { selectNavigationOpen, toggleNativationOpen } from '../../features/ui/uiSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

interface INavigateMenu {
    tuneTo: ((patp: string | null) => void);
    radio: Radio;
    our: string,
    towers: Array<IMinitower>,
}

export const NavigateMenu: FC<INavigateMenu> = (props: INavigateMenu) => {

    const { tuneTo, radio, our, towers } = props;

    const dispatch = useAppDispatch();

    const hardCodedTowers = ['~harlys-forbec', '~fidwed-sipwyn', '~tasrym-sorrup-fidwed-sipwyn', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec',]
    const [inputText, setInputText] = useState('');
    const navigationOpen = useAppSelector(selectNavigationOpen);

    const navigateBackgroundId = 'navigate-background';

    function handleInputTextChange(e) {
        setInputText(e.target.value);
    }

    function handleTuneToSubmit() {
        if (!inputText || inputText.length == 0) return;
        tuneTo(inputText);
        setInputText('');
    }

    function handleMenuClose() {
        dispatch(toggleNativationOpen());
    }

    function handleMenuBackgroundClick(e: any) {
        if (e.target == document.getElementById(navigateBackgroundId)) {
            handleMenuClose();
        }
    }

    return (
        navigationOpen ?
            <div className='w-full h-full fixed  z-50'
                style={{
                    backdropFilter: 'blur(10px) brightness(0.8)'
                    , top: 0, left: 0
                }}
                id={navigateBackgroundId}
                onClick={handleMenuBackgroundClick}
            >
                <div
                    className='fixed px-5 py-8 flex flex-col rounded \
                   bg-white justify-center'
                    style={{
                        top: '10vh',
                        maxWidth: '35em',
                        width: '100vw',
                        height: '22em',
                        right: '50%',
                        boxShadow: 'rgba(50, 50, 93, 0.25) \
                                    0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
                        transform: 'translateX(50%)',
                    }}
                >
                    <p className='text-base font-bold mb-1'>stations:</p>
                    <button
                        className='absolute flex items-center
                         border-gray-400 rounded border
                         text-bold px-2 py-1 mt-3 mr-5'
                        style={{
                            fontSize: '.6rem', right: 0, top: '0',
                            boxShadow: 'rgba(50, 50, 93, 0.25) \
                            0px 2px 5px -1px, rgba(0, 0, 0, 0.3)`\
                             0px 1px 3px - 1px ',
                        }}
                        onClick={handleMenuClose}
                    >
                        <span className='font-bold'
                            style={{ fontSize: '.7rem' }}>close
                        </span>
                        <span className=' text-gray-500 ml-1 px-1 
                          border-gray-400 rounded border'
                            style={{
                                fontSize: '.6rem', right: '0.1em', top: '0.1em',
                                boxShadow: 'rgba(50, 50, 93, 0.25) \
                0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
                            }}>Tab</span>
                    </button>


                    {/* <NavItem tuneTo={tuneTo} patp={null} logout/> */}

                    <div className='flex mb-2 overflow-x-auto'
                        style={{ height: '170px' }}>
                        {radio.tunedTo !== radio.our &&
                            <NavItem
                                tuneTo={tuneTo}
                                patp={our}
                                title={'my station'} />
                        }

                        {radio.tunedTo !== radio.hub &&
                            <NavItem
                                tuneTo={tuneTo}
                                patp={radio.hub}
                                title={'hub'} />
                        }
                        {/* <NavItem tuneTo={tuneTo} patp={'~littel-wolfur'} />
        <NavItem tuneTo={tuneTo} patp={'~sorwet'} /> */}
                        {/* <NavItem tuneTo={tuneTo} patp={'~poldec-tonteg'} flare={'🎷'}/> */}

                        {towers.map((tower: any, i: number) =>
                            <NavItem tuneTo={tuneTo}
                                key={i}
                                patp={tower.location}
                                flare={tower.viewers} />
                        )}

                        {
                            hardCodedTowers.map((tower: any, i: number) =>
                                <NavItem tuneTo={tuneTo}
                                    key={i}
                                    patp={tower}
                                    flare={'' + 20} />
                            )
                        }
                    </div>

                    <div> other:
                        <div className="flex mt-1 h-6">
                            < input
                                type="text"
                                className="p-2 inline-block \
                                           w-3/4  bg-white
                                           rounded border border-solid border-gray-400
                                           "
                                style={{
                                    fontSize: '.6rem'
                                }}
                                autoCorrect={'off'}
                                autoCapitalize={'off'}
                                autoComplete={'off'}
                                // autoFocus={false}
                                placeholder="e.g. ~sampel-palnet"
                                onKeyDown={(e) => {
                                    if (e.key == 'Enter') {
                                        handleTuneToSubmit();
                                    }
                                }}
                                value={inputText}
                                onChange={handleInputTextChange}
                            />
                            < button
                                className="bg-white rounded w-1/4  \
                                           flex-initial outline-none flex  \
                                           rounded border border-solid border-gray-400 \
                                           justify-center items-center ml-2"
                                style={{
                                    fontSize: '.6rem'
                                }}
                                onClick={() =>
                                    handleTuneToSubmit()
                                }
                            >
                                📡
                                tune in
                            </ button>
                        </div >
                    </div>
                </div>
            </div >
            :
            <>  </>
    )
}