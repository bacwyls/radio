import { MusicNotes, Users, } from "phosphor-react";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isValidPatp } from 'urbit-ob'
import { useAppSelector } from "../../../app/hooks";
import { selectIsPublic, selectTowers } from "../../../features/station/stationSlice";
import { selectIsDarkMode } from "../../../features/ui/uiSlice";
import { isPhone } from "../../../util";
import { IsPublicBadge } from "../../IsPublicBadge";
import { Sigil } from "../../Sigil";
import './style.css';

interface ISearchStationRow {
}

export const SearchStationRow: FC<ISearchStationRow> = (props: ISearchStationRow) => {

    const towers = useAppSelector(selectTowers);
    const [isFocused, setIsFocused] = useState(false)
    const isDarkMode = useAppSelector(selectIsDarkMode);

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
                className={`outline-black-5 outline    relative whitespace-nowrap	 h-full rounded-md border font-bold
               focus:outline-none focus:shadow  text-background-icon placeholder-black-60 
               ${isDarkMode && 'border-2'}
            ${isFocused ? 'bg-orange-input-focused ' : 'bg-orange-input'} 
            ${isValidPatp(tuneToText) ? '  pl-7 border-orange ' : '  pl-2 border-orange-disabled '}
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
            {isValidPatp(tuneToText) &&
                <span opacity-50
                    className={`absolute ml-2 mr-1 h-4 w-4  overflow-hidden 
                                       rounded flex justify-center items-center
                                       bg-background-icon
                                       `}
                >
                    <Sigil patp={tuneToText} size={16} />
                </span>
            }
            < button
                className={`absolute right-0  rounded-md  h-full  flex  
            justify-center items-center whitespace-nowrap px-1 font-bold z-10 text-text-button 
            ${isValidPatp(tuneToText) ? 'bg-orange button-grow hover:shadow-md' : 'bg-orange-disabled cursor-default text-opacity-disabled'}
            `}
                style={{
                    width: '7em',
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
            border-border-default bg-background-default text-text-default

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
                                 cursor-pointer  px-2 py-1.5 hover:bg-hover-default
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
                                       bg-background-icon
                                       `}
                                        style={{ minWidth: '1rem' }}
                                    >
                                        {x.location.length <= 14 && isValidPatp(x.location) &&
                                            <Sigil patp={x.location} size={18} />
                                        }
                                    </span>
                                    <div
                                        style={{
                                            maxWidth: '8.5em',
                                            lineHeight: '14px',
                                        }} >
                                        {x.location}
                                    </div>
                                    <IsPublicBadge />
                                </div>
                                <div className="flex gap-1 items-center  ml-1">
                                    <span className="flex items-center font-bold "
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