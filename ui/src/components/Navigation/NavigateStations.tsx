import React, { useEffect, useState } from "react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { radio } from "../../api";
import { useAppSelector } from "../../app/hooks";
import { selectTowers } from "../../features/station/stationSlice";
import { NavItem } from "./NavItem";
import { isValidPatp } from 'urbit-ob'
import { GrSatellite, GrSearch } from "react-icons/gr";

interface INavigateStations {

}

export const NavigateStations: FC<INavigateStations> = (props: INavigateStations) => {

    // const towers = useAppSelector(selectTowers);
    const hardCodedTowers = ['~harlys-forbec', '~fidwed-sipwyn', '~tasrym-sorrup-fidwed-sipwyn', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec',]
    const [queriedTowers, setqueriedTowers] = useState(hardCodedTowers);

    const [tuneToText, setTuneToText] = useState('');
    const [error, setError] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const navigate = useNavigate();

    function handleInputTextChange(e) {
        setTuneToText(e.target.value);
        setqueriedTowers(hardCodedTowers.filter(x => x.includes(e.target.value)));
        error && setError(false);
    }

    useEffect(() => {
        if (tuneToText.length > 0 && queriedTowers.length == 0) {
            setNotFound(true);
        }
        else if (setNotFound) {
            setNotFound(false);
        }
    }, [queriedTowers]);

    function handleTuneToSubmit() {
        if (!tuneToText || tuneToText.length == 0) return;
        if (!isValidPatp(tuneToText)) { setError(true); return; };

        setTuneToText('');
        navigate('/station/' + tuneToText);
    }

    return (
        <div
            className="text-sm w-full h-full"
            style={{
                minHeight: '100%'
            }}
        >
            <div className='text-sm whitespace-nowrap'>
                Join station:
            </div>
            <div className="flex h-8 relative items-center  mb-2 ">
                <GrSearch className="absolute ml-2 	"
                    style={{
                        fontSize: '.6rem',
                    }}
                ></GrSearch>
                < input
                    type="text"
                    className=" pl-6 pb-0.5 flex flex-initial
                                h-6 bg-white whitespace-nowrap	
                               rounded border border-gray-400
                               placeholder-black  hover:border-black
                               "
                    style={{
                        width: '100%',
                        maxWidth: '15em',
                        fontSize: '.6rem'
                    }}
                    autoCorrect={'off'}
                    autoCapitalize={'off'}
                    autoComplete={'off'}
                    placeholder="e.g. ~sampel-palnet"
                    onKeyDown={(e) => {
                        if (e.key == 'Enter') {
                            handleTuneToSubmit();
                        }
                    }}
                    value={tuneToText}
                    onChange={handleInputTextChange}
                />
                < button
                    className="bg-white rounded w-20 h-6    
                               outline-none flex  hover:border-black
                               rounded border border-solid border-gray-400 
                               justify-center items-center ml-2 whitespace-nowrap	"
                    style={{
                        fontSize: '.6rem'
                    }}
                    onClick={() =>
                        handleTuneToSubmit()
                    }
                >
                    <GrSatellite className="mr-1" />
                    Tune In
                </ button>
                {error && <div
                    className="text-red-600 text-xs absolute mt-10"
                    style={{
                        fontSize: '.6rem'
                    }}
                >invalid ship</div>}
            </div>

            <div
                className='grid overflow-y-auto py-2 justify-items-center
                	 sm:gap-2 px-1 sm:px-3
                         rounded border border-gray-400'
                style={{
                    minWidth: '100%',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gridTemplateRows: 'repeat(auto-fill, minmax(140px, 1fr))'
                }}>
                {/* {notFound && <div
                        className="absolute flex justify-start  text-xs"
                        style={{
                            fontSize: '.9rem',
                            color: 'orange'
                        }}
                    >station is not in the discovery pool</div>} */}

                {/* <NavItem tuneTo={tuneTo} patp={null} logout/> */}

                {radio.tunedTo !== radio.our && tuneToText.length == 0 &&
                    <NavItem
                        patp={radio.our}
                        title={'My Station'} />
                }

                {radio.tunedTo !== radio.hub && tuneToText.length == 0 &&
                    <NavItem
                        patp={radio.hub}
                        title={'Hub'} />
                }
                {/* <NavItem tuneTo={tuneTo} patp={'~littel-wolfur'} />
<NavItem tuneTo={tuneTo} patp={'~sorwet'} /> */}
                {/* <NavItem tuneTo={tuneTo} patp={'~poldec-tonteg'} flare={'🎷'}/> */}

                {/* {towers.map((tower: any, i: number) =>
            <NavItem
                key={i}
                patp={tower.location}
                flare={tower.viewers} />
        )} */}
                {
                    queriedTowers.map((tower: any, i: number) =>
                        <NavItem
                            key={i}
                            patp={tower}
                            flare={'' + 20} />
                    )
                }
            </div>
        </div >
    )
}