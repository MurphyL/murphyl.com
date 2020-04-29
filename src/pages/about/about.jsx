import React from 'react';

import { useParams } from "react-router-dom";

function About() {
    const prams = useParams();
    return (
        <div className="about">
            <div style={{ padding: '20vh 0 100px', textAlign: 'center' }}>about</div>
        </div>
    );
}

export default About;