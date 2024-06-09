
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/supabaseClient';
import TrialRehearsalTable from '../tableComponents/TrialRehearsalTable';
import '../styles/rehearsal-signups.css';

const TrialRehearsalList = () => {
    const [signups, setSignups] = useState([]);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        const fetchSignups = async () => {
            //fetch all signups data
            try {
                const {data: signupsData, error} = await supabase
                    .from('rehearsal_signings')
                    .select('*')
                    .order('chosen_rehearsal', { ascending: true });

                if (error) {
                    setFetchError('Could not fetch signups');
                    setSignups([]);
                    console.error('Error fetching signups:', error.message);
                } else {
                    setFetchError(null);
                    setSignups(signupsData);
                }
            } catch (error) {
                console.error('Error fetching signups:', error.message);
            }
        };

        const removeExpiredSignups = async () => {
            try {
                const currentDate = new Date();
                const {data: expiredSignups, error} = await supabase
                    .from('rehearsal_signings')
                    .delete()
                    .lt('chosen_rehearsal', currentDate.toISOString()); //delete expired signups

                if (error) {
                    console.error('Error removing expired signups:', error.message);
                } else if (expiredSignups && expiredSignups.length > 0) {
                    console.log('Expired signups removed:', expiredSignups);
                }
            } catch (error) {
                console.error('Error removing expired signups:', error.message);
            }
        };

        fetchSignups(); //fetch signups data on component mount
        removeExpiredSignups();
    }, []);

    return (
        <div className="rehearsal-signups-page">
            <h1>Trial Rehearsal Signups</h1>
            {fetchError && <p>{fetchError}</p>}
            {signups.length === 0 && <p>No signups available.</p>}
            <div className="signups-grid">
                {signups.map((signup) => (
                    <TrialRehearsalTable key={signup.id} signup={signup}/>
                ))}
            </div>
        </div>
    );
}

export default TrialRehearsalList;