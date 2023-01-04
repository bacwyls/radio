import React, { useState, useEffect } from "react";
import { radio } from "../../../../api";
import { isPhone, tuneTo } from "../../../../util";
import { ViewersTabOption } from "../ViewersButton";
import { MagnifyingGlass } from "phosphor-react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectIsDarkMode } from "../../../../features/ui/uiSlice";
import './ViewersMenu.css';
import { selectBanned, selectTunePatP, selectViewers } from "../../../../features/station/stationSlice";
import { Banned } from "./Banned";
import { Viewer } from "./Viewer";

// const viewers = ['~harlys-forbec', '~tasrym-sorrup-fidwed-sipwyn', "~bosdys", '~martyr-martel',]
// const viewers = ['~harlys-forbec', '~tasrym-sorrup-fidwed-sipwyn', '~tasrym-sorrup-fidwed-sipwyn--tasrym-sorrup-fidwed-sipwyn', "~bosdys", '~martyr-martel', '~harlys-forbec', '~tasrym-sorrup-fidwed-sipwyn', "~bosdys", '~martyr-martel', '~harlys-forbec', '~tasrym-sorrup-fidwed-sipwyn', "~bosdys", '~martyr-martel', '~harlys-forbec', '~tasrym-sorrup-fidwed-sipwyn', "~bosdys", '~martyr-martel', '~harlys-forbec', '~tasrym-sorrup-fidwed-sipwyn', "~bosdys", '~martyr-martel']

export const ViewersMenu = () => {
    const viewers = useAppSelector(selectViewers);
    const banned = useAppSelector(selectBanned);
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const tunePatP = useAppSelector(selectTunePatP);

    const [openTab, setOpenTab] = useState<ViewersTabOption>('Online');
    const [viewersQuery, setViewersQuery] = useState('');
    const [queriedList, setQueriedList] = useState<string[]>(viewers);

    function handleTabClick(option: ViewersTabOption) {
        setOpenTab(option);
        setViewersQuery('');

        if (option == 'Online') {
            setQueriedList(viewers)
        }

        else if (option == 'Banned') {
            setQueriedList(banned)
        }

    }

    function handleViewersInputTextChange(e) {
        setViewersQuery(e.target.value);
    }

    useEffect(() => {
        if (openTab == 'Online') {
            let newv = viewers.filter(x => x.includes(viewersQuery))
            setQueriedList(newv);
        }
        else if (openTab == 'Banned') {
            let newb = banned.filter(x => x.includes(viewersQuery))
            setQueriedList(newb);
        }
    }, [viewersQuery, viewers, banned]);

    return (
        viewers.length > 0 && (radio.our != tunePatP || banned) ?
            <div
                className={` 
            ${isDarkMode ? ' bg-black-95  border-black-85  ' : ' bg-white border-black-10'}
               ${isPhone() ? 'viewers-menu-phone' : ' viewers-menu'}
                    `}
            >
                <div className={`flex h-7 border-b
            ${isDarkMode ? 'border-black-60  ' : ' border-black-20'}
            `}
                >
                    <button
                        className={`w-1/2  py-2 
                            flex justify-center items-center 
                             ${openTab == 'Online' ?
                                (isDarkMode ? ' font-semibold border-white border-b-2' :
                                    'border-black-100 font-semibold border-b-2 ')
                                : 'border-transparent'
                            }
                      ` }
                        style={{
                            marginBottom: '-0.1em',
                        }}
                        onClick={() => handleTabClick('Online')}
                    >
                        Online
                        <span className={`ml-1 
                        `}
                            style={{ fontSize: '14px' }}>
                            ({viewers.length})
                        </span>
                    </button>
                    <button
                        className={`w-1/2 
                    py-2 flex justify-center items-center 
                    ${radio.isAdmin() ? '' : 'cursor-not-allowed opacity-50'}
                        ${openTab == 'Banned'
                                ? (isDarkMode ? 'border-white  border-b-2 font-semibold' : 'border-black-100  border-b-2 font-semibold')
                                : 'border-transparent'
                            } `}
                        style={{
                            marginBottom: '-0.1em',

                        }}
                        onClick={() => {
                            radio.isAdmin() &&
                                handleTabClick('Banned')
                        }}
                    >
                        Banned
                        {radio.isAdmin() &&
                            <span className={`ml-1
                               `}
                                style={{ fontSize: '14px' }}>
                                ({banned.length})
                            </span>}
                    </button>
                </div>
                <div className="relative h-full "
                >
                    <div className="absolute w-full h-10 top-0 left-0 "
                    >
                        <div
                            className="viewers-input-wrapper  "
                        >
                            < input
                                type="text"
                                className={`viewers-input
                                ${isDarkMode ? 'bg-black-70 focus:bg-black-85 border-black-70  text-black-10 placeholder-black-10'
                                        : ' text-black-80  bg-black-10 border-black-10 placeholder-black-80 focus:bg-black-1'}
                   `}
                                autoCorrect={'off'}
                                autoCapitalize={'off'}
                                autoComplete={'off'}
                                placeholder="e.g. ~sampel-palnet"
                                value={viewersQuery}
                                onChange={handleViewersInputTextChange}
                            />
                            <MagnifyingGlass className="absolute right-2  " size={16} weight="bold" />
                        </div>
                    </div>
                    <div className="viewers-list"
                    >
                        <div className={` 
                                ${isPhone() ? 'viewers-input-sticky-row-phone' : 'viewers-input-sticky-row'}
                                ${isDarkMode ? ' bg-black-95  border-black-95' : ' bg-white border-white'}
                `}
                        >
                        </div>

                        <div className="flex flex-col ">
                            {openTab == 'Online' ?
                                queriedList.map((x, i) =>
                                    <Viewer key={x} ship={x} index={i} />
                                )
                                :
                                queriedList.map((x, i) =>
                                    <Banned key={x} ship={x} index={i} />
                                )
                            }
                        </div>
                    </div>
                </div >
            </div >
            :
            <></>
    )
}
