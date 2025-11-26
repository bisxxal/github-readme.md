import React from 'react'
const Loading = ({ boxes, child, parent }: { boxes: number, child?: string, parent?: string }) => {
  return (
    <div className={` w-full items-center justify-center flex flex-col  gap-4 !${parent} `}>
      {Array.from({ length: boxes }).map((_, index) => (
        <div key={index} className={`${child}  grid grid-cols-4  backdrop-blur-[10px] relative overflow-hidden`}>
          <div className={` w-full h-full absolute top-0 left-0 bg-gradient-to-r from-[#87878700] via-[#E4D1DE] to-[#87878700] backdrop-saturate-[180%] animate-[pulseShimmer_12s_infinite_linear]`}></div>
        </div>
      ))}
    </div>
  );
};

export default Loading;