import React, { useEffect, useState } from 'react';

import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

import moment from 'moment';

import { fetched } from '../../../utils/murph_store';

import { BlogItems } from '../list/blog_list.jsx';

import './blog_author.css';

const BlogAuthor = () => {
	const { unique } = useParams();
	const [ local, setLocal ] = useState({ loading: true});
    useEffect(() => {
        fetched.then((db) => {
        	const query = db.get('blog').filter({ release: true, author: unique });
        	const tags = query.map('tags').flatMap().filter(o => o).uniq().value();
        	const author = db.get('author').find({ id: unique }).value();
        	const last = moment().subtract(13, 'month').format('YYYYMMDD');;
        	const recents = query.filter(({ date }) => date >= last).value();
        	console.log(recents);
        	setLocal({ items: query.value(), recents, tags, author, loading: false })
        });
    }, [ unique ]);
    if(local.loading) {
    	return (
    		<div>数据加载中……</div>
    	);
    }
    const { items, recents, tags, author } = local;
	return (
		<div className="author">
			<div className="article-list">
				<BlogItems posts={ items } />
			</div>
			<div className="sidebar">
				<div className="group">
					<div className="user-info">
						<div className="avatar">
						</div>
						<div className="meta">
							<div className="user-name">
								<Link to={ `/author/${unique}` }>{ author.name }</Link>
							</div>
							<div className="user-desc">{ author.desc }</div>
						</div>
					</div>
					<div className="blog-info">
						<div className="blog-meta">
							<div className="value">{ items.length }</div>
							<div className="label">文章</div>
						</div>
						<div className="blog-meta">
							<div className="value">{ tags.length }</div>
							<div className="label">标签</div>
						</div>
						<div className="blog-meta">
							<div className="value">{ items.length }</div>
							<div className="label">文章</div>
						</div>
					</div>
				</div>
				<div className="group">
					<h3>标签</h3>
					<div className="user-tags">
						{ (tags || []).map((tag, index) => (
							<Link key={ index } to={ `/tag/${tag}` }>
								<span className="tag">{ tag }</span>
							</Link>
						)) }
					</div>
				</div>
				<div className="group">
					<h3>最近发布的文章</h3>
					<ul className="recent-posts">
						{ (recents || []).map((post, index) => (
							<Link key={ index } to={ `/post/${post.filename}` }>
								<li className="tag">{ post.title }</li>
							</Link>
						)) }
					</ul>
				</div>
			</div>
		</div>
	);
};

export default BlogAuthor;