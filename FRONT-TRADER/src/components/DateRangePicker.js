// src/components/DateRangePicker.js
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = ({ onChange }) => {
  const [startDateState, setStartDateState] = useState(null);
  const [endDateState, setEndDateState] = useState(null);

  useEffect(() => {
    if (startDateState && endDateState) {
      console.log('Dates changed:', { startDate: startDateState, endDate: endDateState });
      onChange({ startDate: startDateState, endDate: endDateState });
    }
  }, [startDateState, endDateState, onChange]);

  const handleStartDateChange = (date) => {
    console.log('Start date selected:', date);
    setStartDateState(date);
  };

  const handleEndDateChange = (date) => {
    console.log('End date selected:', date);
    setEndDateState(date);
  };

  return (
    <div className="date-range-picker">
      <DatePicker
        selected={startDateState}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDateState}
        endDate={endDateState}
        dateFormat="dd/MM/yyyy"
        placeholderText="Data Início"
      />
      <DatePicker
        selected={endDateState}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDateState}
        endDate={endDateState}
        dateFormat="dd/MM/yyyy"
        placeholderText="Data Fim"
        minDate={startDateState}
      />
    </div>
  );
};

export default DateRangePicker;
