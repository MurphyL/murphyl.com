import React from 'react';

const WechatPostEditor = () => {
    return (
        <div className="wmp writer">
        	<div>
        		<input type="text" />
        	</div>
        	<div style={{ height: '100px' }} contentEditable="true">

        	</div>
        </div>
    );
}

export default WechatPostEditor;