import React from 'react';

function Loading() {
    return (
        <div style={{ padding: '25vh 0 100px', textAlign: 'center' }}>loading...</div>
    );
}


function Loaded({ target }) {
    const Child = React.lazy(() => import(`../../pages/${target}/${target}`));
    return (
        <React.Suspense fallback={<Loading />}>
            <Child />
        </React.Suspense>
    );
}

export default Loaded;