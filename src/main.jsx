import React from 'react'
import { createRoot } from 'react-dom/client'

import { RecoilRoot } from 'recoil';

import App from './core/app';

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RecoilRoot>
            <React.Suspense fallback={<div>Loading...</div>}>
                <App />
            </React.Suspense>
        </RecoilRoot>
    </React.StrictMode>
)
