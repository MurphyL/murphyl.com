import { BrowserRouter, Routes, Route, } from "react-router-dom";

import PostList from "../view/post-list/post-list.module";

import PostDetails from "../view/post-details/post-details.module";

import './app.css';

export default function App() {
    return (
        <BrowserRouter basename="/blog">
            <Routes>
                <Route index={true} element={<PostList />} />
                <Route path="/posts/:pageNum" element={<PostDetails />} />
            </Routes>
        </BrowserRouter>
    );
}