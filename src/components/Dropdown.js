import { useState } from "react";

export default function Dropdown(props) {

    const [showOptions, setShowOptions] = useState(false);
    const [optionChosen, setOption] = useState(props.defaultText);

    const handleDropdown = () => {
        setShowOptions(!showOptions);
    }

    const handleOption = (optionText) => {
        setOption(optionText);
    }

    return (
        // <div className="mt-20 w-screen flex justify-center items-center">
        //     <div className="relative inline-block text-left">
        //         <div>
        //             <button type="button" onClick={handleDropdown} className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
        //                 {optionChosen}
        //                 <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        //                     <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        //                 </svg>
        //             </button>
        //         </div>
        //         {showOptions && 
        //             <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
        //                 {props.options.map(optionText => {
        //                     return <div onClick={() => {setOption(optionText); handleDropdown()}} className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-200" role="menuitem" tabindex="-1">{optionText}</div>
        //                 })}
        //             </div>
        //         }
        //     </div>
        // </div>
        <select className="block mt-5 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
            {props.options.map(optionText => {
                return <option value={optionText}>{optionText}</option>
            })}
        </select>
    )
}