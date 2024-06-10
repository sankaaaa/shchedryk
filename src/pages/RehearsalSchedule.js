import { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import '../styles/rehearsalSchedule.css';
import EditRehearsalModal from '../tableComponents/EditRehearsalModal';
import AddRehearsalModal from '../tableComponents/AddRehearsalModal';

const RehearsalSchedule = () => {
    const [rehearsals, setRehearsals] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedRehearsal, setSelectedRehearsal] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    const fetchRehearsals = async () => {
        try {
            const { data, error } = await supabase
                .from('rehearsal')
                .select('*')
                .gte('date', new Date().toISOString())
                .order('date', { ascending: true });

            if (error) {
                setFetchError('Could not fetch rehearsals');
                setRehearsals([]);
                console.error('Error fetching rehearsals:', error.message);
            } else {
                setRehearsals(data);
                setFetchError(null);
            }
        } catch (error) {
            setFetchError('Could not fetch rehearsals');
            setRehearsals([]);
            console.error('Error fetching rehearsals:', error.message);
        }
    };

    useEffect(() => {
        fetchRehearsals();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleString('en-GB', options);
    };

    const calculateEndTime = (startTime, duration) => {
        const date = new Date(startTime);
        const hours = parseInt(duration.split(' ')[0]);
        date.setHours(date.getHours() + hours);
        return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    };

    const groupRehearsalsByMonth = (rehearsals) => {
        return rehearsals.reduce((acc, rehearsal) => {
            const date = new Date(rehearsal.date);
            const monthYear = date.toLocaleString('en-GB', { month: 'long', year: 'numeric' });
            if (!acc[monthYear]) {
                acc[monthYear] = [];
            }
            acc[monthYear].push(rehearsal);
            return acc;
        }, {});
    };

    const deleteRehearsal = async (rehearsalId) => {
        const confirmation = window.confirm('Are you sure you want to delete this rehearsal from the schedule?');
        if (confirmation) {
            const { error } = await supabase.from('rehearsal').delete().eq('id_reh', rehearsalId);
            if (error) {
                console.error('Error deleting rehearsal:', error.message);
            } else {
                setRehearsals(rehearsals.filter(rehearsal => rehearsal.id !== rehearsalId));
            }
        }
    };

    const handleEdit = (rehearsal) => {
        setSelectedRehearsal(rehearsal);
        setShowEditModal(true);
    };

    const handleSave = async (updatedRehearsal) => {
        const { error } = await supabase
            .from('rehearsal')
            .update({
                date: updatedRehearsal.date,
                duration: updatedRehearsal.duration
            })
            .eq('id_reh', updatedRehearsal.id);

        if (error) {
            console.error('Error updating rehearsal:', error.message);
        } else {
            setRehearsals(prevRehearsals =>
                prevRehearsals.map((rehearsal) =>
                    rehearsal.id === updatedRehearsal.id ? updatedRehearsal : rehearsal
                )
            );
            setShowEditModal(false);
            setSelectedRehearsal(null);
        }
    };

    const groupedRehearsals = groupRehearsalsByMonth(rehearsals);

    return (
        <div className="rehearsal-schedule-page">
            <h1>Upcoming Rehearsals</h1>
            <button onClick={() => setShowAddModal(true)}>Add Rehearsal</button>
            {fetchError && <p>{fetchError}</p>}
            {Object.keys(groupedRehearsals).length === 0 && <p>There are no upcoming rehearsals.</p>}
            {Object.keys(groupedRehearsals).map((monthYear) => (
                <div key={monthYear} className="rehearsal-month-section">
                    <h2>{monthYear}</h2>
                    <div className="rehearsal-grid">
                        {groupedRehearsals[monthYear].map((rehearsal) => (
                            <div key={rehearsal.id_reh} className="rehearsal-card">
                                <div className="edit-delete-buttons">
                                    <div className="edit-button" onClick={() => handleEdit(rehearsal)}>✎</div>
                                    <div className="delete-button" onClick={() => deleteRehearsal(rehearsal.id_reh)}>❌</div>
                                </div>
                                <p><strong>Date of rehearsal:</strong> {formatDate(rehearsal.date)}</p>
                                <p><strong>Starts at:</strong> {new Date(rehearsal.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
                                <p><strong>Ends at:</strong> {calculateEndTime(rehearsal.date, rehearsal.duration)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {showEditModal && selectedRehearsal && (
                <EditRehearsalModal
                    rehearsal={selectedRehearsal}
                    onClose={() => setShowEditModal(false)}
                    onSave={handleSave}
                />
            )}
            {showAddModal && (
                <AddRehearsalModal
                    onClose={() => setShowAddModal(false)}
                    onSave={fetchRehearsals}
                />
            )}
        </div>
    );
};

export default RehearsalSchedule;