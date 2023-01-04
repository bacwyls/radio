import { ArrowLeft, MusicNotes, Users, XCircle } from "phosphor-react";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isValidPatp } from 'urbit-ob'
import { useAppSelector } from "../../../app/hooks";
import { selectIsPublic, selectTowers } from "../../../features/station/stationSlice";
import { selectIsDarkMode } from "../../../features/ui/uiSlice";
import { isPhone, renderSigil } from "../../../util";
import './style.css';

interface ISearchStationRow {
}

export const SearchStationRow: FC<ISearchStationRow> = (props: ISearchStationRow) => {

    const towers = useAppSelector(selectTowers);
    const isDarkMode = useAppSelector(selectIsDarkMode);
    const isPublic = useAppSelector(selectIsPublic);
    const [isFocused, setIsFocused] = useState(false)

    const navigate = useNavigate();

    const [tuneToText, setTuneToText] = useState('');
    const [queriedTowers, setQueriedTowers] = useState(towers);

    useEffect(() => {
        document.addEventListener(
            "click",
            handleInputClick
        )

        return () => document.removeEventListener('click', handleInputClick)
    }, []);

    const suggestionsId = "suggestions-box";
    const searchStationInputId = "search-station-input";

    const handleInputClick = (event: any) => {
        var clicked = event.target as Element;
        var searchStationInput = document.getElementById(searchStationInputId);
        var suggestions = document.getElementById(suggestionsId);

        if (clicked == searchStationInput
            ||
            suggestions?.contains(clicked)
        ) {
            setIsFocused(true);
        }
        else {
            setIsFocused(false);
        }
    }

    const handleInputTextChange = (e) => {
        let text = e.target.value
        setTuneToText(text);
        if (text.trim().length > 0) {
            setQueriedTowers(towers.filter(x => x.location.includes(text)));
        }
        else {
            setQueriedTowers(towers);
        }
    }

    const handleTuneToSubmit = () => {
        if (!isValidPatp(tuneToText)) { return; };

        setTuneToText('');
        navigate('/station/' + tuneToText);
    }

    const handleSuggestionClick = (x) => {
        setIsFocused(false);
        setTuneToText(x);
    }

    return (
        <div
            className={`relative items-center flex w-full 	h-8
            
            `}
        >

            < input
                id={searchStationInputId}
                type="text"
                className={`    relative whitespace-nowrap	 h-full rounded-md border font-semibold 
               focus:outline-none focus:shadow 
            ${isDarkMode ? 'text-black-80 placeholder-black-80 border-2  ' : ' placeholder-black-70  text-black-70 border'}
            ${isFocused ? (isDarkMode ? 'bg-orange-15  ' : 'bg-orange-10') : (isDarkMode ? 'bg-orange-30  ' : 'bg-orange-20')}
            ${isValidPatp(tuneToText) ? ' border-orange-80   ' : ' border-orange-50 '}
            ${isValidPatp(tuneToText) && tuneToText.length <= 14 ? 'pl-7' : 'pl-2'}
            `}
                style={{
                    width: '100%',
                    paddingBottom: '0.1em',
                    paddingRight: '7.6em',
                }}
                autoCorrect={'off'}
                autoCapitalize={'off'}
                autoComplete={'off'}
                placeholder={isPhone() ? 'e.g. ~zod' : "e.g. ~sampel-palnet"}
                onKeyDown={(e) => {
                    if (e.key == 'Enter') {
                        handleTuneToSubmit();
                    }
                }}
                value={tuneToText}
                onChange={
                    handleInputTextChange

                }
            />
            {isValidPatp(tuneToText) && tuneToText.length <= 14 &&
                <span
                    className={`absolute ml-2 mr-1 h-4 w-4  overflow-hidden 
                                       rounded flex justify-center items-center
                                       ${isDarkMode ? 'bg-black-70' : 'bg-black-80'}
                                       `}
                >
                    {renderSigil(tuneToText, 16, isDarkMode)}
                </span>
            }
            < button
                className={`absolute right-0  rounded-md  h-full outline-none flex  
            justify-center items-center whitespace-nowrap px-1 font-bold
            ${isValidPatp(tuneToText) ? 'hover:shadow ' : 'cursor-not-allowed	'} 
            ${isDarkMode ? 'text-black-80' : 'text-black-1'}
            ${isValidPatp(tuneToText) ?
                        (isDarkMode ? 'bg-orange-80 ' : 'bg-orange-80')
                        :
                        (isDarkMode ? 'bg-orange-50  text-opacity-50' : 'bg-orange-80 opacity-40')
                    }
            `}
                style={{
                    width: '7em'
                }}
                onClick={() =>
                    handleTuneToSubmit()
                }
            >
                <MusicNotes size={20} weight="bold" className="mr-0.5" />
                Tune In
            </ button>
            {
                tuneToText.trim().length > 0 && queriedTowers.length > 0 && !isValidPatp(tuneToText) && isFocused && !isPhone() &&
                <div
                    id={suggestionsId}
                    className={`absolute border z-10 shadow rounded 
            w-full top-8 flex flex-col py-2 overflow-y-auto mt-1
            ${isDarkMode ? 'bg-black-95 border-black-85' : 'bg-white border-black-10'}
            `}
                    style={{
                        minHeight: '3em',
                        maxHeight: '9em',
                    }}
                >
                    {
                        queriedTowers.map((x) =>
                            <div
                                className={`w-full flex justify-between h
                                 cursor-pointer  px-2 py-1.5
                                 ${isDarkMode ? 'hover:bg-black-80' : 'hover:bg-black-5'}
                                 `}
                                onClick={
                                    () =>
                                        handleSuggestionClick(x.location)
                                }
                            >
                                <div className="flex items-center font-bold">
                                    <span
                                        className={`mr-1.5 h-4 w-4  overflow-hidden 
                                       rounded flex justify-center items-center
                                       ${isDarkMode ? 'bg-black-70' : 'bg-black-80 '}
                                       `}
                                        style={{ minWidth: '1rem' }}
                                    >
                                        {x.location.length <= 14 && isValidPatp(x.location) &&

                                            renderSigil(x.location, 18, isDarkMode)
                                        }
                                    </span>
                                    <div style={{
                                        lineHeight: '14px',
                                    }} >
                                        {x.location}
                                    </div>

                                </div>
                                <div className="flex gap-1 items-center">

                                    <span className={`flex items-center justify-center rounded
                          font-bold text-black-90 h-3 bg-blue-70
                          `}
                                        style={{
                                            fontSize: '14px',
                                            padding: '0 .3em'
                                        }}
                                    >
                                        {isPublic ? 'Public' : 'Private'}
                                    </span>
                                    <span className="flex items-center font-bold ml-1"
                                    >
                                        <Users
                                            size={20}
                                            weight="bold"
                                            className="mr-0.5"
                                            style={{
                                            }}
                                        />
                                        20
                                    </span>
                                </div>
                            </div>
                        )
                    }
                </div>
            }
        </div >
    )
}