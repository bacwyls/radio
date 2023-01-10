import { Radio, Television } from 'phosphor-react';
import React from 'react';
import { isValidPatp } from 'urbit-ob'
import { radio } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { selectTunePatP } from '../../features/station/stationSlice';
import { Sigil } from '../Sigil';
import { StationIsPublicInfo } from './StationIsPublicInfo/StationIsPublicInfo';

export const StationTitle = () => {

    const tunePatP = useAppSelector(selectTunePatP);

    return (
        !(tunePatP && isValidPatp(tunePatP)) ?
            <div
                className={`flex items-center font-bold  whitespace-nowrap text-text-default text-bigger
            `}
            >
                (Loading...)
            </div>
            :
            <div
                className={`flex items-center  w-full text-bigger text-text-default
            `}

            >
                {tunePatP == radio.hub &&
                    <>
                        <span
                            className={`rounded flex items-center justify-center bg-background-icon text-text-icon`}
                            style={{ maxHeight: '40px', maxWidth: '40px', minHeight: '40px', minWidth: '40px' }}
                        >
                            <Television
                                size={24}
                                weight="bold"
                            />
                        </span>
                        <span className='ml-1.5 font-bold'>Hub</span>
                    </>
                }
                {
                    tunePatP == radio.our && tunePatP != radio.hub &&
                    <>
                        < span
                            className={`rounded flex items-center justify-center bg-background-icon text-text-icon
                         `}
                            style={{ maxHeight: '40px', maxWidth: '40px', minHeight: '40px', minWidth: '40px' }}
                        >
                            <Radio
                                size={24}
                                weight="bold"
                            />
                        </span >
                        <div
                            className={`flex items-center font-bold  ml-1.5  whitespace-nowrap`}
                        >
                            My Station
                        </div>
                    </>
                }
                {
                    tunePatP &&
                    tunePatP != radio.hub
                    && tunePatP != radio.our &&
                    <>
                        <span
                            className={`  overflow-hidden  
                           rounded flex justify-center items-center bg-background-icon
                           `}
                            style={{
                                maxHeight: '40px',
                                maxWidth: '40px',
                                minHeight: '40px',
                                minWidth: '40px'
                            }}
                        >
                            <Sigil patp={tunePatP} size={24} />
                        </span>
                        <span
                            className={`ml-1.5 font-bold 
                                                        `}
                            style={{
                                maxWidth: '8.5em',
                                lineHeight: '16px',
                            }}
                        >
                            {tunePatP}
                        </span>
                    </>
                }
                <StationIsPublicInfo />
            </div >
    )
}