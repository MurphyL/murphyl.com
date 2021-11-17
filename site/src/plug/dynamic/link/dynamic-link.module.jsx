import React from "react";

import classNames from 'classnames';

export default function DynamicLink({ className, children, link }) {
    return <a className={classNames(className)} href={link} target="_blank" rel="noopener noreferrer">{children}</a>;
}