import React, { useEffect, useState } from "react";
import styled from 'styled-components';

const yAxis = [];
for (let i=100; i>=0; i-=10)
    yAxis.push(i);

const xAxis = [];
for (let i=0; i<=24; i++) 
    xAxis.push(i);

const Graph = () => {

    const [cellHeight, setCellHeight] = useState(0);
    const [selectedCell, setSelectedCell] = useState(Array.from({length: 24}, (v, k) => 0))

    useEffect(() => {
        //convert from px to vh and set cell height
        setCellHeight(document.getElementById('column-1-cell-1').offsetHeight * (100/document.documentElement.clientHeight));
    }, [])

    const drawBar = (column, cell) => {
        const maxBarCell = yAxis.length - 1;
        var colors = ['#d9534f', '#5bc0de', '#5cb85c', '#66b2b2', '#c9c9ff', '#f1cbff'];
        const randomColorIndex = (Math.floor(Math.random() * colors.length))
        var element = document.querySelector('#bar-column-'+column);
        element.style.setProperty('--after-height', cellHeight*((maxBarCell - cell)+1)+'vh');
        element.style.setProperty('--after-background', colors[randomColorIndex]);
        element.style.setProperty('--after-border', '1px solid '+ colors[randomColorIndex]);
    }

    const setBarColumnHeight = (indexColumn, indexCell) => {
        const maxBarCell = yAxis.length - 1;
        var newSelectedCell = [];
        selectedCell.map((val, index) => {
            if (index === indexColumn) 
                newSelectedCell.push(maxBarCell - indexCell);
            else 
                newSelectedCell.push(val);
        });
        drawBar(indexColumn, indexCell);
        setSelectedCell(newSelectedCell);
    }


    return (
        <GraphContainer>
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
                                                    <div key={index2} id={'column-'+index1+'-cell-'+index2} onClick={() => setBarColumnHeight(index1, index2)}></div>
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
            </div>
        </GraphContainer>
    );
}

export default Graph;

const GraphContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #14207a;

    .y-marker {
        height: 70vh;
        display: flex;
        flex-direction: column;

        span {
            height: 100%;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            color: #fff;

            span {
                margin-bottom: -1.2vh;
                margin-right: 0.5vw;
            }

            hr {
                width: 1vw;
                height: 0;
            }
        }
    }

    .bar-container {
        display: flex:
        flex-direction: column;
        width: 80vw;
        height: 71vh;

        .graphView {
            border: 3px solid #fff;
            border-top: none;
            border-right: none;
            display: flex;
            flex-direction: column;
    
            .bar-marker {
                height: 70vh;
                cursor: pointer;
                display: flex;
                flex-direction: row;
                overflow: hidden;
                --after-height: 0vh;
                --after-background: #fff;
                --after-border: 0px solid transparent;

                .bar-column {
                    width: 100%;
                    border: 1px solid #424949;
                    border-top: none;
                    border-bottom: none;
                    border-right: none;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-end;
                    height: 100%;

                    div {
                        width: 100%;
                        height: 100%;
                        border: 1px solid gray;
                        border-left: none;
                        border-right: none;
                        border-top: none;
                        border-bottom: none;
                        z-index: 1;
                    }

                    div:nth-child(1) {
                        border-top: none;
                    }
                    
                }

                .bar-column::after {
                    position: absolute;
                    content: "";
                    background-color: var(--after-background);
                    height: var(--after-height);
                    width: 2vw;
                    transition: 2s;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    border: var(--after-border);
                }
            }
        }

        .x-marker {
            width: 100%;
            display: flex;

            span {
                width: 100%;
                display: flex;
                flex-direction: column;
                color: #fff;

                hr {
                    width: 0;
                    height: 2vh
                }

                span {
                    margin-left: -0.2vw;
                    margin-top: 1vh;
                }
            }
        }
    }
`;