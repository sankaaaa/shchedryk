import React, {useEffect, useState} from "react";
import supabase from "../config/supabaseClient";
import {Link} from "react-router-dom";
//import DirectorsTable component for displaying director data
import DirectorsTable from "../tableComponents/DirectorsTable";

const Directors = () => {
    const [fetchError, setFetchError] = useState(null);
    const [directors, setDirectors] = useState(null);
    const [userRole, setUserRole] = useState(null);

    //fetch directors data from the supabase
    useEffect(() => {
        const fetchDirectors = async () => {
            const {data, error} = await supabase
                .from('director')
                .select();

            if (error) {
                setFetchError('Could not fetch directors');
                setDirectors(null);
                console.log(error);
            }
            if (data) {
                setDirectors(data);
                setFetchError(null);
            }
        };
        fetchDirectors();

        //get user role from local storage
        const storedUserRole = localStorage.getItem('userRole');
        setUserRole(storedUserRole);
    }, [userRole]);
    console.log(userRole);

    return (
        <div className="page directors">
            <div className="background-image"></div>
            <div className="overlay-dir"></div>
            {fetchError && (<p>{fetchError}</p>)}
            <div className="top-director-block">
                <h1>Our directors</h1>
                <div className="button-group">
                    {userRole && (
                        <Link to="/add-director" className="link-add">Add Director</Link>
                    )}
                </div>
            </div>
            {directors && (
                <div className="directors">
                    <div className="director-grid">
                        {directors.map(director => (
                            <DirectorsTable key={director.id_dir} director={director}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
export default Directors;
