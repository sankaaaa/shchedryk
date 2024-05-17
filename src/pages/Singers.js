import supabase from "../config/supabaseClient";
import {useEffect, useState} from "react";

const Singers = () => {
    const [fetchError, setFetchError] = useState(null);
    const [singers, setSingers] = useState(null);

    useEffect(() => {
        const fetchSingers = async () => {
            const {data, error} = await supabase
                .from('singer')
                .select()

            if(error) {
                setFetchError('Could not fetch singers');
                setSingers(null);
                console.log(error);
            }
            if(data) {
                setSingers(data);
                setFetchError(null);
            }
        }
        fetchSingers();
    }, [])
    return (
        <div className="page singers">
            {fetchError && (<p>{fetchError}</p>)}
            {singers && (
                <div className="singers">
                    {singers.map(singer => (
                        <p>{singer.singer_name}</p>
                    ))}
                </div>
            )}
        </div>
    )
}
export default Singers;