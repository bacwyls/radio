import { Question } from 'phosphor-react';
import React, { FC, useEffect, useState } from 'react';
import { MdOutlineHelpOutline } from 'react-icons/md';
import { isPhone } from '../../../util';
import './Help.css';

interface IHelp {
}

export const Help: FC<IHelp> = (props: IHelp) => {

  const [helpMenuOpen, setHelpMenuOpen] = useState(false);

  useEffect(() => {
    document.addEventListener(
      "click",
      handleOutsideHelpMenuClick
    )

    return () => document.removeEventListener('click', handleOutsideHelpMenuClick)
  }, []);

  const handleOutsideHelpMenuClick = (event: any) => {
    var clicked = event.target as Element;
    var helpMenu = document.getElementById('help-menu');
    var helpButton = document.getElementById('help-button');

    if (
      clicked != helpMenu
      && !helpMenu?.contains(clicked)
      && clicked != helpButton
      && !helpButton?.contains(clicked)
    ) {
      setHelpMenuOpen(false);
    }
  }

  return (
    <>
      <Question
        id='help-button'
        size={20}
        weight="bold"
        className='ml-0.5 cursor-pointer hover:bg-gray-100 rounded'
        style={{ marginTop: '0.1em' }}
        onClick={(e) => {
          setHelpMenuOpen(!helpMenuOpen);
        }}
      />
      {helpMenuOpen &&
        <div
          id='help-menu'
          className={`p-4 bg-white rounded overflow-y-auto
          ${isPhone() ? 'help-menu-phone' : 'help-menu'} 
          `}
          style={{
            boxShadow: 'rgba(50, 50, 93, 0.25) \
         0px 2px 5px - 1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
          }}
        >
          <p className="mb-4">to interact with radio, enter commands in chat</p>
          <p className='italic mb-2'>NAVIGATION:</p>
          <p className="font-bold">!tune ~sampel-palnet</p>
          <div className="ml-4 mb-4">
            <p> change radio stations. try ~nodmyn-dosrux </p>
          </div>
          <p className="font-bold">!tune</p>
          <div className="ml-4 mb-4">
            <p>(no argument) brings you to your home station</p>
          </div>
          <p>-----------</p>
          <p className='italic mb-2'>DJ COMMANDS:</p>
          <p className="font-bold">!play https://www.youtube.com/watch?v=3vLHelBuTRM</p>
          <div className="ml-4 mb-4">
            <p>change the current song / video / livestream</p>
            <p>(youtube, soundcloud, twitch, vimeo, audio/video URLs)</p>
          </div>
          <p className="font-bold">!talk hello world</p>
          <div className="ml-4 mb-4">
            <p>broadcast text-to-speech</p>
          </div>
          <p>-----------</p>
          <p className='italic mb-2'>ADMIN COMMANDS:</p>
          {/* <p className="mb-4">only the radio station host can use these commands</p> */}
          <p className="font-bold">!public</p>
          <div className="ml-4 mb-4">
            <p>anyone can use DJ commands</p>
          </div>
          <p className="font-bold">!private</p>
          <div className="ml-4 mb-4">
            <p>only the host can use DJ commands</p>
          </div>
          <p className="font-bold mb-4">!ban ~zod</p>
          <p className="font-bold">!unban ~zod</p>

          {/* <p className="font-bold">
      !set-time
      </p>
      <div className="ml-4 mb-4">

      <p>set the shared timestamp to your current timestamp</p>
      </div> */}
          {/* <p>
      -----------
      </p>
      <p className='italic mb-2'>
      OTHER COMMANDS:
      </p>

      <p className="font-bold">
      !time

      </p>
      <div className="ml-4 mb-4">

      <p>auto scrub to the shared timestamp</p>
      </div> */}
        </div>
      }
    </>
  );
};
