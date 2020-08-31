import React from 'react';

function About() {
    return (
		<div style={{ padding: '20vh 0 30vh', textAlign: 'center' }}>
			<a href={ `https://github.com/${process.env.REACT_APP_GITHUB}` } rel="noopener noreferrer" target="_blank">
				<img src={ `https://github-readme-stats.vercel.app/api/top-langs/?username=${process.env.REACT_APP_GITHUB}&hide=html&layout=compact` } alt="Top Languages" />
			</a>
		</div>
    );
}

export default About;