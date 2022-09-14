import { BrowserRouter, Routes, Route, } from "react-router-dom";

import BlogLayout from "../plug/layout/blog-layout/blog-layout.module";

import PostList from "../view/post-list/post-list.module";

import PostDetails from "../view/post-details/post-details.module";

import './app.css';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BlogLayout />}>
                    <Route index={true} element={<PostList />} />
                    <Route path="/posts/:postId" element={<PostDetails />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}