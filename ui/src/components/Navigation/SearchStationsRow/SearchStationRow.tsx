import { MusicNotes } from "phosphor-react";
import React, { FC, useState } from "react";
import { MdOutlineTune } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { isValidPatp } from 'urbit-ob'
import './style.css';

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
        <div
            className={`h-6 relative items-center mb-2 sm:mb-4 flex
            
            `}
        >
            {/* <GrSearch className="absolute ml-2 	"
                    style={{
                        fontSize: '.6rem',
                    }}
                ></GrSearch> */}
            < input
                type="text"
                className=" pr-4 pl-2 bg-gray-50
             h-6 whitespace-nowrap	focus:bg-white
            rounded border font-semibold font-gray-800
            placeholder-gray-800  hover:border-black focus:outline-none
            "
                style={{
                    width: '100%',
                    maxWidth: '15em',
                    fontSize: '.6rem',
                    paddingBottom: '0.1em',
                    backgroundColor: '#FFF2EB',
                    borderColor: '#F4E8D7',
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
                className=" rounded w-20 h-6    
            outline-none flex   
            rounded   hover:shadow text-white
            justify-center items-center whitespace-nowrap px-1	font-bold"
                style={{
                    fontSize: '.6rem',
                    backgroundColor: '#F8BD72',
                    marginLeft: '-1em'
                }}
                onClick={() =>
                    handleTuneToSubmit()
                }
            >
                {/* <MdOutlineTune className="mr-1 text-sm " /> */}
                <MusicNotes size={20} weight="bold" className="mr-0.5" />
                Tune In
            </ button>
            {
                error && <div
                    className="text-red-300 font-bold text-xs absolute mt-9"
                    style={{
                        fontSize: '.6rem'
                    }}
                >Invalid Ship</div>
            }
        </div >
    )

}