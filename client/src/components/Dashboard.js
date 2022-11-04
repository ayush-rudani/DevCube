import { Helmet } from 'react-helmet';
import { useEffect } from 'react';

function Dashboard() {

    useEffect(() => {
        <Helmet><title>Dashboard</title></Helmet>
    }, []);

    return (
        <>
            <h1>Dashboard</h1>
        </>
    );
}

export default Dashboard;