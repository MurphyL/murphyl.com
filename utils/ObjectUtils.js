const renameObjectKey = function(target, oldName, newName) {
	if(target === null || target === undefined) {
		return;
	}
	target[newName] = target[oldName];
	delete target[oldName];
};

const fillEmptyValue = function(target, field, value) {
	if(target === null || target === undefined || field === null || field === undefined) {
		return;
	}
	if(target[field] === null || target[field] === undefined) {
		target[field] = value;	
	}
};


export default {
	fillEmptyValue,
	renameObjectKey,
};
