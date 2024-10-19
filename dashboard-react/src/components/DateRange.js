import React from 'react';
import { useEffect, useRef, useState } from "react";
import { addDays } from "date-fns";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function DateRange1() {
    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: "selection",
        },
      ]);
    
      const [showDatePicker, setShowDatePicker] = useState(false);
      // ???
      const dateRangeRef = useRef(null);
    
      function handleInputClick() {
        setShowDatePicker(true);
      };

      function handleClickOutside(e) {
        if (dateRangeRef.current && !dateRangeRef.current.contains(e.target)) {
            setShowDatePicker(false);
          }
      }
    
      useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

  return (
    <>
    
            <div className="area-top-r">
              <div
                ref={dateRangeRef}
                className={`date-range-wrapper ${
                  !showDatePicker ? "hide-date-range" : ""
                }`}
                onClick={handleInputClick}
              >
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setState([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                  showMonthAndYearPickers={false}
                />
              </div>
            </div>
    </>
  )
}
