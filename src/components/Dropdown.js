import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";

export default function Dropdown({ selectedAlgo, setSelectedAlgo }) {
    const [isActive, setIsActive] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsActive((prev) => !prev);
    };

    const handleItemClick = (algorithm) => {
        setSelectedAlgo(algorithm);
        setIsActive(false);
    };

    // Close the dropdown when focus is lost
    useEffect(() => {
        const handleFocusOut = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
                setIsActive(false);
            }
        };

        document.addEventListener('focusout', handleFocusOut);

        return () => {
            document.removeEventListener('focusout', handleFocusOut);
        };
    }, []);

    return (
        <div
            className={`dropdown mt-4 ${isActive ? 'active' : ''}`}
            ref={dropdownRef}
            tabIndex={0}
        >
            <div className="select" onClick={toggleDropdown}>
                <span>{selectedAlgo}</span>
                <i><IoIosArrowDown fontSize={18}/></i>
            </div>

            <input type="hidden" name="algorithm" value={selectedAlgo.toLowerCase()} />

            <ul className="dropdown-menu" style={{ display: isActive ? 'block' : 'none' }}>
                <li onClick={() => handleItemClick('Insertion Sort')}>
                    Insertion Sort
                </li>
                <li onClick={() => handleItemClick('Selection Sort')}>
                    Selection Sort
                </li>
                <li onClick={() => handleItemClick('Bubble Sort')}>
                    Bubble Sort
                </li>
                <li onClick={() => handleItemClick('Heap Sort')}>
                    Heap Sort
                </li>
                <li onClick={() => handleItemClick('Merge Sort')}>
                    Merge Sort
                </li>
                <li onClick={() => handleItemClick('Quick Sort')}>
                    Quick Sort
                </li>
                <li onClick={() => handleItemClick('Count Sort')}>
                    Count Sort
                </li>
            </ul>
        </div>
    );
};

