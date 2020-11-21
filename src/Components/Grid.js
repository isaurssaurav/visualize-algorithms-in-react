import React, { useEffect, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';

function Grid(props) {
    useEffect(() => {
        if (props.visited.length > 0) {
            for (let i = 0; i < props.visited.length; i++) {
                setTimeout(() => {
                    let targets = ".grid-item .gItem" + (props.visited[i])
                    anime({
                        targets,

                        scale: [
                            { value: .5, easing: 'easeOutSine', duration: 500 },
                            { value: 1, easing: 'easeInOutQuad', duration: 1000 }
                        ],
                        easing: "easeOutSine",
                        backgroundColor: '#57bb66',
                        duration: 800
                    });
                }, 50 * i)
            }
        }
    }, [props.visited])

    let GridStyle = {
        "display": "grid",
        "grid-column-gap": "5px",
        "grid-row-gap": "5px",
        "grid-template-columns": (() => {
            let temp = ""
            for (let i = 0; i < props.columns; i++) {
                temp += "auto "
            }
            return temp
        })()
    }

    let result = []
    for (let i = 0; i < props.rows; i++) {
        for (let j = 0; j < props.columns; j++) {
            result.push(<div className={"grid-item"}>
                <div className={"gridStyle" + " gItem" + i + j}>

                </div>
            </div >)
        }

    }
    return <div className="grid-container" style={GridStyle}>
        {
            result.map((val, index) => {
                return val
            })
        }
    </div>
}


export default Grid;
