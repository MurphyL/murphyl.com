import * as matter from 'gray-matter';

const MORE_PATTERN = /<!(-{2,5})( *)more( *)(-{2,5})>/;

const DEFAULT_SEP = '<!-- more -->';

export const revisePost = (post) => {
    if(!MORE_PATTERN.test(post.body || '')) {
        return false;
    }
    const x = MORE_PATTERN.exec(post.body || '');
    const [ separator = DEFAULT_SEP ]= x;
    const parsed = matter(post.body, { 
        excerpt: true, 
        delims: '```',
        excerpt_separator: separator
    });
    const { title, databaseId } = post;
    return Object.assign(parsed, { 
        title, databaseId 
    });
};
