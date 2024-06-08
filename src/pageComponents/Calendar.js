//importing supabase for db connection and React states for methods realization
import React, {useState, useEffect} from 'react';
import supabase from "../config/supabaseClient";

const Calendar = () => {
    //setting state variables to manage the current date, month, year, rehearsal dates, and loading state
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const [rehearsalDates, setRehearsalDates] = useState([]);
    const [loading, setLoading] = useState(false);

    //array to hold month names
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    //function to check if a year is a leap year
    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    //function to get the number of days in February for a given year
    const getFebDays = (year) => {
        return isLeapYear(year) ? 29 : 28;
    };

    //generate the calendar for the current month and year
    const generateCalendar = () => {
        const daysOfMonth = [
            31, getFebDays(currentYear), 31, 30, 31, 30,
            31, 31, 30, 31, 30, 31
        ];

        const firstDay = new Date(currentYear, currentMonth);

        //generate calendar with checking if rehearsal day
        const days = [];
        for (let i = 0; i <= daysOfMonth[currentMonth] + firstDay.getDay() - 1; i++) {
            if (i >= firstDay.getDay()) {
                const day = i - firstDay.getDay() + 1;
                const isRehearsal = rehearsalDates.includes(day);
                days.push(
                    <div
                        key={i}
                        className={`
                            ${day === currentDate.getDate() && currentYear === currentDate.getFullYear() && currentMonth === currentDate.getMonth() ? 'current-date' : ''}
                            ${isRehearsal ? 'rehearsal-date' : ''}
                        `}
                    >
                        {day}
                    </div>
                );
            } else {
                days.push(<div key={i}></div>);
            }
        }
        return days;
    };

    //update the current date every second
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    //fetch rehearsal dates when the month or year changes
    useEffect(() => {
        const fetchRehearsalDates = async () => {
            setLoading(true);
            const startDate = new Date(currentYear, currentMonth, 1).toISOString();
            const endDate = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59).toISOString();

            const {data, error} = await supabase
                .from('rehearsal')
                .select('date')
                .gte('date', startDate)
                .lte('date', endDate);

            if (error) {
                console.error('Error fetching rehearsal dates:', error);
                return;
            }

            const dates = data.map(rehearsal => new Date(rehearsal.date).getDate());
            setRehearsalDates(dates);
            setLoading(false);
        };

        fetchRehearsalDates();
    }, [currentMonth, currentYear]);

    //change the month when the user clicks the prev/next buttons
    const changeMonth = (direction) => {
        setLoading(true);
        if (direction === 'prev') {
            setCurrentMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
            setCurrentYear(prevMonth => (prevMonth === 0 ? currentYear - 1 : currentYear));
        } else {
            setCurrentMonth(prevMonth => (prevMonth === 11 ? 0 : prevMonth + 1));
            setCurrentYear(prevMonth => (prevMonth === 11 ? currentYear + 1 : currentYear));
        }
    };

    return (
        <div className="container">
            <div className="calendar">
                <div className="calendar-header">
                    <span className="month-picker">{currentYear}</span>
                    <div className="year-picker">
                        <span id="pre-month" style={{cursor: 'pointer'}} onClick={() => changeMonth('prev')}>&lt;</span>
                        <span id="month" style={{cursor: 'pointer', margin: '0 10px'}}>{monthNames[currentMonth]}</span>
                        <span id="next-month" style={{cursor: 'pointer'}}
                              onClick={() => changeMonth('next')}>&gt;</span>
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
                    <div className="calendar-days">
                        {loading ? <div>Loading...</div> : generateCalendar()}
                    </div>
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