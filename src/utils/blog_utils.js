import axios from 'axios';

const genPostUnique = (filename) => {
	if(!filename) {
		return '';
	}
	return filename.replace(/\.md$/, '.json');
};


export const getPost = (filename) => {
	const unique = genPostUnique(filename);
    return axios.get(`${process.env.PUBLIC_URL}/post/${unique}`)
    .then(res => {
    	if(res.status === 200){
    		return Object.assign(res.data, { code: 0 });	
    	} else {
			return { code: 1, message: '读取数据失败' }    		
    	}
        
    })
}