import React from "react";
import styled from 'styled-components';

const yAxis = [];
for (let i=100; i>=0; i-=10)
    yAxis.push(i);

const xAxis = [];
for (let i=0; i<=24; i++) 
    xAxis.push(i);

const Graph = () => {
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
                            Array.from({length: 24}).map(index => {
                                return (
                                    <span></span>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="x-marker">
                    {
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

    .y-marker {
        height: 70vh;
        display: flex;
        flex-direction: column;

        span {
            height: 100%;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;

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
        height: 70vh;

        .graphView {
            border: 3px solid #000;
            border-top-width: 0px;
            border-right-width: 0px;
            display: flex;
            flex-direction: column;
    
            .bar-marker {
                height: 70vh;
            }
        }

        .x-marker {
            width: 100%;
            display: flex;

            span {
                width: 100%;
                display: flex;
                flex-direction: column;

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