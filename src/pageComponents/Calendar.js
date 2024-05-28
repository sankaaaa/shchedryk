import React, {useState, useEffect} from 'react';
import supabase from "../config/supabaseClient";

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const [rehearsalDates, setRehearsalDates] = useState([]);
    const [loading, setLoading] = useState(false);

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    const getFebDays = (year) => {
        return isLeapYear(year) ? 29 : 28;
    };

    const generateCalendar = () => {
        const daysOfMonth = [
            31, getFebDays(currentYear), 31, 30, 31, 30,
            31, 31, 30, 31, 30, 31
        ];

        const firstDay = new Date(currentYear, currentMonth);

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

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

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