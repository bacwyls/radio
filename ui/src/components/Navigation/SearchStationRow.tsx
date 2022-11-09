import React, { FC, useState } from "react";
import { GoRadioTower } from "react-icons/go";
import { GrSatellite, GrSearch } from "react-icons/gr";
import { MdOutlineRadio, MdOutlineTune } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { isValidPatp } from 'urbit-ob'
import { radio } from "../../api";

interface ISearchStationRow {
    setqueriedTowers: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SearchStationRow: FC<ISearchStationRow> = (props: ISearchStationRow) => {

    const { setqueriedTowers } = props;

    // const towers = useAppSelector(selectTowers);
    const hardCodedTowers = ['~harlys-forbec', '~fidwed-sipwyn', '~tasrym-sorrup-fidwed-sipwyn', '~fidwed-sipwyn', '~tidreg', '~fidwed-sipwyn', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec', '~fidwed-sipwyn', '~harlys-forbec',]

    const navigate = useNavigate();

    const [tuneToText, setTuneToText] = useState('');

    const [error, setError] = useState(false);

    function handleInputTextChange(e) {
        setTuneToText(e.target.value);
        setqueriedTowers(hardCodedTowers.filter(x => x.includes(e.target.value)));
        error && setError(false);
    }

    function handleTuneToSubmit() {
        if (!tuneToText || tuneToText.length == 0) return;
        if (!isValidPatp(tuneToText)) { setError(true); return; };

        setTuneToText('');
        navigate('/station/' + tuneToText);
    }

    return (
        <div className="h-6 relative items-center mb-2 sm:mb-4 flex">
            {/* <GrSearch className="absolute ml-2 	"
                    style={{
                        fontSize: '.6rem',
                    }}
                ></GrSearch> */}
            < input
                type="text"
                className=" px-2 
             h-6 whitespace-nowrap	focus:bg-white
            rounded border border-gray-400 bg-gray-50
            placeholder-black  hover:border-black hover:shadow
            "
                style={{
                    width: '100%',
                    maxWidth: '15em',
                    fontSize: '.6rem',
                    paddingBottom: '0.1em'
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
            outline-none flex  hover:border-black bg-blue-50    
            rounded border border-solid border-gray-400   hover:shadow
            justify-center items-center ml-2 whitespace-nowrap px-1	font-semibold"
                style={{
                    fontSize: '.6rem'
                }}
                onClick={() =>
                    handleTuneToSubmit()
                }
            >
                <MdOutlineTune className="mr-1 text-sm " />
                Tune In
            </ button>
            {
                error && <div
                    className="text-red-600 text-xs absolute mt-9"
                    style={{
                        fontSize: '.6rem'
                    }}
                >invalid ship</div>
            }
        </div >
    )

}