import React from 'react';

import { Tooltip } from 'antd';

import emojis from 'gemoji/name-to-emoji';

import './issue_reactions.css';

const GH_MAPPING = {
	'laugh': 'laughing',
	'thumbs_up': 'thumbsup',
	'thumbs_down': 'thumbsdown',
};

const GH_IGNORE = [ 'EYES', 'CONFUSED', 'ROCKET', 'HOORAY' ];

const filter = (reaction) => {
	return reaction && reaction.users && reaction.createdAt && GH_IGNORE.indexOf(reaction.content) === -1;
}

const IssueEmoji = ({ name = '', count = 1 }) => {
	const local = name.toLowerCase();
	const alias = GH_MAPPING[local] || local;
	return (
		<Tooltip title={ count } placement="top">
			<b name={ local } alias={ alias }>{ emojis[alias] }</b>
		</Tooltip>
	);
};

const IssueReactions = ({ group }) => {
	const items = (group || []).filter(filter);
	if(!items.length) {
		return [];
	}
	return (
		<div className="issue-reactions">
			{ items.map(({ content, users }, index) => (
				<IssueEmoji key={ index } name={ content } count={ users.totalCount } />
			)) }
		</div>
	);
};

export default IssueReactions;