const postions = {
    t: 'top',
    r: 'right',
    b: 'bottom',
    l: 'left',
};

export function resolvePostion(flags = 'lb') {
    return flags.split('').map(flag => postions[flag]).filter(flag => flag);
};