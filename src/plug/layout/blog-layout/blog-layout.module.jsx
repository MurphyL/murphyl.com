import React from "react";
import { Outlet } from "react-router-dom";

export default function BlogLayout() {
    return (
        <React.Fragment>
            <header></header>
            <main>
                <Outlet />
            </main>
            <footer>

            </footer>
        </React.Fragment>
    );
}