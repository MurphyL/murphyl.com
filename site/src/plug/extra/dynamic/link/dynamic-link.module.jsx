import React from "react";

export default function DynamicLink({ children, link }) {
    return <a href={link} target="_blank" rel="noopener noreferrer">{children}</a>;
}