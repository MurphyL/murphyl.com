import React from 'react';

import './sudoku.css';

const x9 = (x) => ([
    [ 
        { index: x - 9 - 1, x, value: (x - 9 - 1 - x), }, 
        { index: x - 9 - 0, x, value: (x - 9 - 0 - x), }, 
        { index: x - 9 + 1, x, value: (x - 9 + 1 - x), }  ], [ 
        { index: x - 1 - 0, x, value: (x - 1 - 0 - x), }, 
        { index: x - 0 - 0, x, value: (x - 0 - 0 - x), }, 
        { index: x - 0 + 1, x, value: (x - 0 + 1 - x), }  ], [ 
        { index: x + 9 - 1, x, value: (x + 9 - 1 - x), }, 
        { index: x + 9 - 0, x, value: (x + 9 - 0 - x), }, 
        { index: x + 9 + 1, x, value: (x + 9 + 1 - x), } 
    ],
]);

const Board = ({ count = 81, step = 3 }) => {
    const x = (count - 1) / 2;
    const t = x - count / step;
    const m = x + count / step;
    const grid = [
        [ x9(t - step), x9(t), x9(t + step) ],
        [ x9(x - step), x9(x), x9(x + step) ],
        [ x9(m - step), x9(m), x9(m + step) ],
    ];
    console.log(JSON.stringify(grid, null, '\t'));
    return (
        <div className="board">
            { grid.map((gridRow, gi) => (
                <div className="row" key={ gi }>
                    { gridRow.map((gridCell, gri) => (
                        <div className="cell" key={ gri }>
                            { gridCell.map((innerRow, iri) => (
                                <div className="row" key={ iri }>
                                    { innerRow.map((innerCell, ici) => (
                                        <div className="cell" key={ ici }>
                                            <div className="x-val">
                                                <div className="row"></div>
                                                <div className="row">
                                                    <div>{ innerCell.value }</div>
                                                </div>
                                                <div className="row"></div>
                                            </div>
                                        </div>
                                    )) }
                                </div>
                            )) }
                        </div>
                    )) }
                </div>
            )) }
        </div>
    );
};

const Sudoku = () => {
    return (
        <div className="sudoku">
            <Board count={ 81 } step = { 3 } />
        </div>
    );
};

export default Sudoku;