import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Fab from '@mui/material/Fab';
import { GraphContainer } from "./GraphStyles";

const yAxis = [];
for (let i=100; i>=0; i-=10)
    yAxis.push(i);

const xAxis = [];
for (let i=0; i<=23; i++) 
    xAxis.push(String(i));

const Graph = () => {

    const [cellHeight, setCellHeight] = useState(0);
    const [lockedColumn, setLockedColumn] = useState(Array.from({length: 24}, (v, k) => 0));
    const [previousData, setPreviousData] = useState(Array.from({length: 24}, (v, k) => 0));
    // const [disableSubmit, setDisableSubmit] = useState(true);

    useEffect(() => {
        //convert from px to vh and set cell height
        setCellHeight(document.getElementById('column-1-cell-1').offsetHeight * (100/document.documentElement.clientHeight));
    }, [])

    const drawBar = (column, cell) => {
        const maxBarCell = yAxis.length - 1;
        //if top cell is clicked then return
        if (cell === 0)
            return;
        var colors = ['#d9534f', '#5bc0de', '#5cb85c', '#66b2b2', '#c9c9ff', '#f1cbff'];
        const randomColorIndex = (Math.floor(Math.random() * colors.length))
        var element = document.querySelector('#bar-column-'+column);
        element.style.setProperty('--after-height', (cellHeight*((maxBarCell - cell)+1))-0.4+'vh');
        element.style.setProperty('--after-background', colors[randomColorIndex]);
        element.style.setProperty('--after-border', '1px solid '+ colors[randomColorIndex]);
        element.setAttribute('value', ((maxBarCell-cell)+1)*10);
    }

    const setBarColumnHeight = (indexColumn, indexCell) => {
        drawBar(indexColumn, indexCell);
    }

    const removeBar = (column, cell) => {
        var element = document.querySelector('#bar-column-'+column);
        element.style.setProperty('--after-height', '0');
        element.style.setProperty('--after-border', '0px solid transparent');
        element.setAttribute('value', '');
    }

    const lockBar = (column, cell) => {
        var element = document.querySelector('#bar-column-'+column);
        const maxBarCell = yAxis.length - 1;
        var temp = [];
        if (!lockedColumn[column]) {
            lockedColumn.map((val, index) => {
                return (
                    (index === column) ?
                    temp.push(((maxBarCell-cell)+1)*10)
                    :
                    temp.push(val)
                )
            });
            setLockedColumn(temp);
            element.style.setProperty('--after-height', cellHeight*((maxBarCell - cell)+1)+'vh');
        } else {
            lockedColumn.map((val, index) => {
                return (
                    (index === column) ?
                    temp.push(0)
                    :
                    temp.push(val)
                )
            });
            setLockedColumn(temp);
        }
    }

    const checkZero = (arr) => {
        return arr.every(element => element === 0);
    }

    const submitHandler = () => {
        // setDisableSubmit(false);
        if(checkZero(lockedColumn)) {
            return;
        }
        alert(lockedColumn);
        resetHandler();
        setPreviousData(lockedColumn);
    }

    const resetHandler = () => {
        setLockedColumn(Array.from({length: 24}, (v, k) => 0));
        for (let i=0; i<24; i++) {
            let element = document.querySelector('#bar-column-'+i);
            element.style.setProperty('--after-height', '0vh');
            element.style.setProperty('--after-border', 'none');
            element.setAttribute('value', '');
        }
    }

    const undoHandler = () => {
        for (let column=0; column<24; column++) {
            //if top cell is clicked then return
            if (previousData[column] === 0)
                continue;
            console.log(previousData[column]/10)
            var colors = ['#d9534f', '#5bc0de', '#5cb85c', '#66b2b2', '#c9c9ff', '#f1cbff'];
            const randomColorIndex = (Math.floor(Math.random() * colors.length))
            var element = document.querySelector('#bar-column-'+column);
            element.style.setProperty('--after-height', ((cellHeight)*(previousData[column]/10)+1)-1.3+'vh');
            element.style.setProperty('--after-background', colors[randomColorIndex]);
            element.style.setProperty('--after-border', '1px solid '+ colors[randomColorIndex]);
            element.setAttribute('value', previousData[column]);
        }
        setLockedColumn(previousData);
    }


    return (
        <GraphContainer>
            <div className="yaxis-label"><ArrowRightAltIcon style={{transform: 'rotate(-90deg)'}}/><span className="yaxis-label-text">Y-Axis</span><ArrowRightAltIcon style={{transform: 'rotate(90deg)'}}/></div>
            <div className="y-marker">
                {
                    yAxis.map((yaxis, index) => {
                        return (
                            <>
                                {yaxis === 0 ? <span></span>:
                                <span key={index}><span>{yaxis}</span><hr/></span>
                                }
                            </>
                        )
                    })
                }
            </div>
            <div className="bar-container">
                <div className="graphView">
                    <div className="bar-marker">
                        {
                            xAxis.map((xval, index1) => {
                                return (
                                    <div key={index1} className="bar-column" id={'bar-column-'+index1}>
                                        {
                                            yAxis.map((yval, index2) => {
                                                return (
                                                    <>
                                                    <Tooltip title={(index2===0) ? "":(10-index2+1)*10} arrow followCursor>
                                                    <div key={index2} id={'column-'+index1+'-cell-'+index2} 
                                                    
                                                    onMouseOver={() => lockedColumn[index1]===0 ? setBarColumnHeight(index1, index2) : null} 
                                                    
                                                    onMouseOut={() => lockedColumn[index1]===0 ? removeBar(index1, index2) : null} 
                                                    
                                                    onClick={() => lockBar(index1, index2)}></div>
                                                    </Tooltip>
                                                    </>
                                                    
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="x-marker">{
                        xAxis.map((xval, index) => {
                            return (
                                <>
                                    {xval === 0 ? <span></span> : (
                                        <span key={index}><hr/><span>{xval}</span></span>
                                    )}
                                </>
                            )
                        })
                    }
                </div>
                <div className="xaxis-label"><ArrowRightAltIcon style={{ transform: 'rotate(180deg)'}}/><span className="xaxis-label-text">Hour</span><ArrowRightAltIcon/></div>
            </div>
            <div className="float-btns">
            <Fab className="submit-btn" onClick={submitHandler} variant="extended" color="primary">
                SUBMIT
            </Fab>
            <Fab className="undo-btn" onClick={undoHandler} variant="extended" color="secondary">
                UNDO
            </Fab>
            <Fab className="reset-btn" onClick={resetHandler} variant="extended">
                RESET
            </Fab>
            </div>
        </GraphContainer>
    );
}

export default Graph;
