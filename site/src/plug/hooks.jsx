import { useEffect } from 'react'


export const useDocumentTitle = (title) => {
    useEffect(() => { 
        document.title = (title ? (title.trim() + ' - ') : '') + process.env.REACT_APP_TITLE;
        return () => document.title = process.env.REACT_APP_TITLE;
    }, [title]);
};