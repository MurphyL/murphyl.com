import { ajaxGet } from './rest_client';

const genPostUnique = (filename) => {
	if(!filename) {
		return '';
	}
	return filename.replace(/\.md$/, '.json');
};

export const getByUnique = (filename) => {
    return ajaxGet(`post/${genPostUnique(filename)}`)
        .then(res => {
        	if(res.status === 200){
        		return Object.assign(res.data, { code: 0 });	
        	} else {
    			return { code: 1, message: '读取数据失败' }    		
        	}
            
        })
}