import React, { FC } from "react";
import { radio } from "../../../../api";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectHasPublishedStation, setHasPublishedStation } from "../../../../features/station/stationSlice";
import './style.css';

interface IToggleSwitch {
}

export const ToggleSwitch: FC<IToggleSwitch> = (props: IToggleSwitch) => {

    const hasPublishedStation = useAppSelector(selectHasPublishedStation);
    const dispatch = useAppDispatch();


    return (
        <>
            <input
                className="toggle-switch-input "
                type="checkbox"
                id="switch"
                checked={hasPublishedStation}
                onChange={(e) => {
                    radio.gregPut('')
                    dispatch(setHasPublishedStation(e.target.checked));
                    radio.gregRequest();
                }}
            />
            <label className="toggle-switch-label " htmlFor="switch">Toggle</label>
        </>
    )
}