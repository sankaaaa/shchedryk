import React, {useEffect, useState} from 'react';
import supabase from "../config/supabaseClient";
import "../styles/my-page.css";

const MyPage = () => {
    //state variables
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');

    //fetch user data from supabase on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('userId');
            const userRole = localStorage.getItem('userRole');

            if (!userId || !userRole) {
                setError('User is not logged in.');
                setLoading(false);
                return;
            }

            try {
                let table;
                let column;

                //determine table and column based on user role
                if (userRole === 'conductor' || userRole === 'pianist' || userRole === 'teacher') {
                    table = 'director';
                    column = 'id_dir';
                } else {
                    table = 'administrator';
                    column = 'id_admin';
                }

                //fetch user data from supabase
                const {data, error} = await supabase
                    .from(table)
                    .select()
                    .eq(column, userId)
                    .single();

                if (error || !data) {
                    setError('Could not fetch user data');
                    console.log(error);
                } else {
                    setUserData(data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('An error occurred. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    //password change form submission
    const handleChangePassword = async (e) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');

        //check if new passwords match
        if (newPassword !== confirmPassword) {
            setPasswordError('New passwords do not match.');
            return;
        }

        try {
            const userId = localStorage.getItem('userId');
            const userRole = localStorage.getItem('userRole');
            let table;
            let column;

            if (userRole === 'conductor' || userRole === 'pianist' || userRole === 'teacher') {
                table = 'director';
                column = 'id_dir';
            } else {
                table = 'administrator';
                column = 'id_admin';
            }

            const {error: updateError} = await supabase
                .from(table)
                .update({password: newPassword})
                .eq(column, userId);

            if (updateError) {
                setPasswordError('Error updating password. Please try again.');
            } else {
                setPasswordSuccess('Password updated successfully.');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            console.error('Error changing password:', error);
            setPasswordError('An error occurred. Please try again.');
        }
    };

//render loading message while data is being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="my-page">
            <div className="user-info">
                {userData && (
                    <>
                        <p>{userData.dir_lastname || userData.admin_lastname} {userData.dir_name || userData.admin_name} {userData.dir_patron || userData.admin_patron}</p>
                        <p><span className="label">ID:</span> {userData.id_dir || userData.id_admin}</p>
                        <p><span className="label">Login:</span> {userData.login}</p>
                        <p><span className="label">Role:</span> {userData.role || 'Administrator'}</p>
                        <p><span className="label">Birth date:</span> {userData.date_birth}</p>
                        {userData.date_start && <p><span className="label">Date start:</span> {userData.date_start}</p>}
                        {userData.study && <p><span className="label">Education:</span> {userData.study}</p>}
                        <p><span className="label">Phone number:</span> {userData.phone_number}</p>
                        <p><span className="label">Email:</span> {userData.email}</p>
                        <p><span className="label">Address:</span> {userData.city}, {userData.street}</p>
                        {userData.bio && <p><span id="info" className="label">My info:</span> {userData.bio}</p>}
                        <div className="change-password">
                            <h2>Change Password</h2>
                            <form onSubmit={handleChangePassword}>
                                <div>
                                    <label>New Password:</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Confirm New Password:</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit">Change Password</button>
                            </form>
                            {passwordError && <p className="error">{passwordError}</p>}
                            {passwordSuccess && <p className="success">{passwordSuccess}</p>}
                        </div>
                    </>
                )}
            </div>
            <div className="user-photo">
                {userData && <img src={userData.image_url} alt="photo"/>}
            </div>
        </div>
    );
};

export default MyPage;
