import React, { FC, useEffect } from 'react';

interface ISplash {
  onClick: () => void;
}

export const InitialSplash: FC<ISplash> = (props: ISplash) => {

  const {onClick} = props;

  useEffect(()=>{
    document.addEventListener("keydown", onClick, false);
    return () => {
      document.removeEventListener("keydown", onClick, false);
    }
  }, []);

  return(
    <main className="flex justify-center overflow-scroll items-center">
      <div className="bg-white mt-2 rounded p-2 lg:w-1/2 mx-6 content-center">
        <h1 className="text-lg font-bold m-2">urbit radio</h1>
        <p className="m-2">first, interact with the webpage so we can autoplay videos</p>
        <p className="m-2">
          press any key to continue, or
          <button
            className="button border-black border p-1 text-center m-2"
            onClick={() => onClick()}
          >
            click here
          </button> 
        </p>
      </div>
    </main>
  );
};
