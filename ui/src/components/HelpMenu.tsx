import React, { useState } from 'react';

export const HelpMenu = () => {

  return (
    <div
    className="bg-white mt-2 rounded w-full flex-none relative p-3 mr-3 overflow-wrap font-mono bg-opacity-70 mb-2 text-sm"
    style={{
        backdropFilter: 'blur(32px)'
    }}
    >
<p className='italic mb-2'>
NAVIGATION:
</p>

<p className="font-bold">

!tune ~nodmyn-dosrux
</p>
<div className="ml-4 mb-4">

<p>the !tune command is for changing radio stations.</p>
<p> enter the patp of your desired radio station.</p>
</div>
<p>
-----------
</p>

<p className='italic mb-2'>

DJ COMMANDS:
</p>
<p className="font-bold">
!play https://www.youtube.com/watch?v=3vLHelBuTRM

</p>

<div className="ml-4 mb-4">
<p>the !play command changes the current song / video / livestream</p>
<p>
.... (!play supports youtube, soundcloud, twitch, vimeo, or arbitrary audio/video links)
</p>
</div>


<p className="font-bold">
!talk hello world
</p>
<div className="ml-4 mb-4">

<p>the !talk command broadcasts text-to-speech</p>
{/* <p>everyone in the audience will hear this text spoken from their device</p> */}
</div>

<p className="font-bold">
!background https://wallpapercave.com/wp/5w05B2R.jpg

</p>
<div className="ml-4 mb-4">

<p>the !background command changes the background image</p>
</div>
<p>
-----------
</p>

<p className='italic mb-2'>

ADMIN COMMANDS:
</p>
{/* <p className="mb-4">only the radio station host can use these commands</p> */}

<p className="font-bold">
  !public
</p>
<div className="ml-4 mb-4">

<p>anyone can use DJ commands</p>
</div>
<p className="font-bold">
  !private
</p>
<div className="ml-4 mb-4">

<p>only the host can use DJ commands</p>
</div>

<p>
-----------
</p>
<p className='italic mb-2'>
OTHER COMMANDS:
</p>

<p className="font-bold">
!time

</p>
<div className="ml-4 mb-4">

<p>the !time command sets your player to the shared timestamp in case you go out of sync</p>
</div>

      </div>
  );
};
