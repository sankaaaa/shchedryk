import React, { useState, useEffect } from 'react';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    const getFebDays = (year) => {
        return isLeapYear(year) ? 29 : 28;
    };

    const generateCalendar = () => {
        const daysOfMonth = [
            31,
            getFebDays(currentYear),
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31,
        ];

        const firstDay = new Date(currentYear, currentMonth);

        const days = [];
        for (let i = 0; i <= daysOfMonth[currentMonth] + firstDay.getDay() - 1; i++) {
            if (i >= firstDay.getDay()) {
                days.push(
                    <div
                        key={i}
                        className={i - firstDay.getDay() + 1 === currentDate.getDate() && currentYear === currentDate.getFullYear() && currentMonth === currentDate.getMonth() ? 'current-date' : ''}
                    >
                        {i - firstDay.getDay() + 1}
                    </div>
                );
            } else {
                days.push(<div key={i}></div>);
            }
        }
        return days;
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="container">
            <div className="calendar">
                <div className="calendar-header">
                    <span className="month-picker">{monthNames[currentMonth]}</span>
                    <div className="year-picker">
                        <span id="pre-year" onClick={() => setCurrentYear(currentYear - 1)}>
                            &lt;
                        </span>
                        <span id="year">{currentYear}</span>
                        <span id="next-year" onClick={() => setCurrentYear(currentYear + 1)}>
                            &gt;
                        </span>
                    </div>
                </div>
                <div className="calendar-body">
                    <div className="calendar-week-days">
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                    </div>
                    <div className="calendar-days">{generateCalendar()}</div>
                </div>
                <div className="calendar-footer"></div>
                <div className="date-time-formate">
                    <div className="day-text-formate">TODAY</div>
                    <div className="date-time-value">
                        <div className="time-formate">{currentDate.toLocaleTimeString()}</div>
                        <div className="date-formate">{currentDate.toLocaleDateString()}</div>
                    </div>
                </div>
                <div className="month-list"></div>
            </div>
        </div>
    );
};

export default Calendar;
