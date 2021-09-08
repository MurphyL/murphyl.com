export default [{
    label: '文档',
    group: 'docs',
}, {
    label: '数据库',
    group: 'data',
    page: true,
    children: []
    
}, {
    label: 'Blog',
    group: 'blog',
}, {
    label: '工具',
    group: 'kits',
    children: [{
        label: 'HTTP 状态码',
        link: '/extra/http/status_code'
    }, {
        label: '常用加密工具',
        link: '/extra/crypto'
    }, {
        label: 'Windows 常用软件',
        link: '/extra/windows/apps'
    }]
}];