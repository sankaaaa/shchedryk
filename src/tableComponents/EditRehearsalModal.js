import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import '../styles/editRehearsalModal.css';

const EditRehearsalModal = ({ rehearsal, onClose, onSave, setRehearsals }) => {
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [duration, setDuration] = useState('');

    useEffect(() => {
        const startDate = new Date(rehearsal.date);
        setDate(startDate.toISOString().split('T')[0]);
        setStartTime(startDate.toTimeString().slice(0, 5));

        const hours = parseInt(rehearsal.duration.split(' ')[0]);
        const endDate = new Date(startDate);
        endDate.setHours(endDate.getHours() + hours);
        setEndTime(endDate.toTimeString().slice(0, 5));

        setDuration(rehearsal.duration);
    }, [rehearsal]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newStartDate = new Date(`${date}T${startTime}`);
        const newEndDate = new Date(`${date}T${endTime}`);
        const currentDate = new Date();

        if (newStartDate < currentDate) {
            alert("The rehearsal date cannot be in the past.");
            return;
        }

        if (newStartDate >= newEndDate) {
            alert("The start time cannot be later than or equal to the end time.");
            return;
        }

        const updatedRehearsal = {
            ...rehearsal,
            date: newStartDate.toISOString(),
            duration: `${(newEndDate - newStartDate) / 3600000} hours`
        };
        onSave(updatedRehearsal);
    };

    const handleDelete = async () => {
        const confirmation = window.confirm('Are you sure you want to delete this rehearsal?');
        if (confirmation) {
            const { error } = await supabase.from('rehearsal').delete().eq('id', rehearsal.id);
            if (error) {
                console.error('Error deleting rehearsal:', error.message);
            } else {
                onClose();
                setRehearsals(prevRehearsals =>
                    prevRehearsals.filter(prevRehearsal => prevRehearsal.id !== rehearsal.id)
                );
            }
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Edit Rehearsal</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Date:
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Start Time:
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        End Time:
                        <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                    <button type="button" onClick={handleDelete} className="delete-button">Delete</button>
                </form>
            </div>
        </div>
    );
};

export default EditRehearsalModal;