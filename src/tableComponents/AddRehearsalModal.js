import { useState } from 'react';
import supabase from '../config/supabaseClient';

const AddRehearsalModal = ({ onClose, onSave }) => {
    const [number, setNumber] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const now = new Date();
        const selectedDate = new Date(date);
        const selectedStartTime = new Date(`${date} ${startTime}`);
        const selectedEndTime = new Date(`${date} ${endTime}`);

        if (!number || !date || !startTime || !endTime) {
            alert('Please fill in all fields.');
            return;
        }

        if (selectedDate <= now) {
            alert('Date must be later than today.');
            return;
        }

        if (selectedStartTime >= selectedEndTime) {
            alert('Start time must be earlier than end time.');
            return;
        }

        const id_reh = `reh${number}`;

        const startDateTime = selectedStartTime.toISOString();
        const endDateTime = selectedEndTime.toISOString();

        const { data, error } = await supabase
            .from('rehearsal')
            .insert([
                {
                    id_reh,
                    date: startDateTime,
                    duration: `${(selectedEndTime - selectedStartTime) / (1000 * 60 * 60)} hours`
                }
            ]);

        if (error) {
            console.error('Error adding rehearsal:', error.message);
            alert('An error occurred while adding the rehearsal. Please try again.');
        } else {
            onSave();
            onClose();
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Add Rehearsal</h2>
                <form onSubmit={handleSubmit}>
                    <label>Number:</label>
                    <input
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                    />
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                    <label>Start Time:</label>
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                    <label>End Time:</label>
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddRehearsalModal;