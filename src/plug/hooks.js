import React from "react";

const BLOG_TITLE = import.meta.env.VITE_BLOG_TITLE;

export const useDocumentTitle = (title) => {
    const oldTitle = React.useMemo(() => document.title, []);
    React.useEffect(() => {
        document.title = title ? `${title} - ${BLOG_TITLE}` : BLOG_TITLE;
        return () => document.title = oldTitle
    }, [title, oldTitle]);
};
