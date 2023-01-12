import { CaretUp, CaretDown } from "phosphor-react";
import React, { useState, useEffect } from "react";

interface IFilterDropdown {
    setFilter: Function,
    filter: Filter,
}

export type Filter = 'All' | 'Mutuals';

export const FilterDropdown = ({ filter, setFilter }: IFilterDropdown) => {
    const [showOptions, setShowOptions] = useState(false);
    const filterDropdownId = 'filter-dropdown';

    const handleFilterClick = () => {

        if (filter == 'All') {
            setFilter('Mutuals')
        }
        else {
            setFilter('All')
        }

        setShowOptions(false);
    }

    useEffect(() => {
        document.addEventListener(
            "click",
            handleOutsideFilterDropdownClick
        )
        return () => document.removeEventListener('click', handleOutsideFilterDropdownClick)
    }, []);

    const handleOutsideFilterDropdownClick = (event: any) => {
        var clicked = event.target as Element;
        var dropdown = document.getElementById(filterDropdownId);

        if (
            dropdown && clicked != dropdown && !dropdown.contains(clicked)
        ) {
            setShowOptions(false);
        }
    }

    return (
        <div
            id={filterDropdownId}
            className='text-base'
        >
            <button className={`border border-gray-200 rounded-t-md  
        flex px-1.5 py-0.5 font-bold items-center relative z-10
        ${!showOptions && 'rounded-b-md'}
        `}
                onClick={() => setShowOptions(prev => !prev)}
                style={{ width: '4.666rem' }}
            >
                {filter}
                <CaretUp
                    weight="bold"
                    className={`text-bigger absolute right-2 ${showOptions ? 'visible' : 'invisible'}`}
                />
                <CaretDown
                    weight="bold"
                    className={`ext-bigger absolute right-2  ${!showOptions ? 'visible' : 'invisible'}`}
                />
            </button>
            {showOptions &&
                <button
                    className={`absolute z-10 flex items-center   border-r border-l border-b
                   border-gray-200 rounded-b-md px-1.5 h-6 bg-white font-bold 
                `}
                    style={{ width: '7em', }}
                    onClick={
                        () => handleFilterClick()
                    }>
                    {filter == 'All' ? 'Mutuals' : 'All'}
                </button>
            }
        </div>

    )
}