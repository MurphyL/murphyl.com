import React, { useEffect } from 'react';

const renderSudokuGame = () => {
	const canvas = document.getElementById('sudoku');
	const ctx = canvas.getContext('2d');
	const offset = 10;
	const width = 540;
	const unit = width / 9;
	ctx.font = '20px serif';
	ctx.beginPath();
	ctx.lineWidth = 3;
	ctx.moveTo(offset, offset);
	ctx.lineTo(width + offset, offset); 
	ctx.lineTo(width + offset, width + offset); 
	ctx.lineTo(offset, width + offset); 
	ctx.lineTo(offset, offset);
	ctx.closePath();
	ctx.stroke();
	ctx.lineWidth = 1;
	for(let i = 1; i < 9; i++) {
		ctx.moveTo(unit * i + offset, offset);
		ctx.lineTo(unit * i + offset, width + offset);
		ctx.moveTo(offset, unit * i + offset);
		ctx.lineTo(width + offset, unit * i + offset);
		ctx.closePath();
	}
	ctx.stroke();
};

const itemClick = function(e){
	console.log(e);
};

const Sudoku = () => {
	useEffect(() => {
		renderSudokuGame();
	}, []);
	const settings = {
		id: 'sudoku',
		className: 'custom',
		height: '560px',
		width: '560px',
		style: { margin: '10px' },
		onClick: itemClick
	};
    return (
        <canvas { ...settings }></canvas>
    );
};

export default Sudoku;