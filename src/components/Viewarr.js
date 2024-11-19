import React from 'react'

export default function Viewarr({ arr }) {
    return (
        <div className="h-[210px] rounded flex items-end justify-center">
            {arr.map((ele, index) => {
                return (
                    <div key={index} className="flex items-end">
                        <div
                            className="mr-[2px] rounded-t border-orange-400 border-[1px] transition-all duration-500 ease-in-out"
                            style={{ height: `${ele}px` }}
                        ></div>
                    </div>
                );
            })}
        </div>
    )
}
