import styled from "styled-components";

export const GraphContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
background-color: #131324;

.yaxis-label {
    display: flex;
    flex-direction: column;
    width: auto;
    color: #fff;
    font-size: 1.2rem;
    align-items: center;

    .yaxis-label-text {
        text-transform: uppercase;
        writing-mode: vertical-rl;
        transform: rotate(180deg);
        margin: 2rem 2rem;
    }
}

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
    width: 80%;
    height: 71%;

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
                    color: #fff;
                }

                div:nth-child(1) {
                    border-top: none;
                }
                
            }

            .bar-column::after {
                position: absolute;
                content: attr(value);
                color: #fff;
                background-color: var(--after-background);
                height: var(--after-height);
                width: 2vw;
                transition: 0.5s ease-out;
                display: flex;
                align-items: center;
                justify-content: center;
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
            align-items: center;

            hr {
                width: 0;
                height: 2vh;
            }

            span {
                margin-left: -0.2vw;
                margin-top: 1vh;
            }
        }
    }

    .xaxis-label {
        color: #fff;
        display: flex;
        justify-content: center;
        margin: 20px;
        font-size: 1.2rem;
        text-transform: uppercase;

        .xaxis-label-text {
            margin: 0 2rem;
        }
    }
}
.float-btns {
    display: flex;
    flex-direction: column;
    margin-left: 1rem;

    .submit-btn {
        margin-bottom: 1rem;
    }

    .undo-btn {
        margin-bottom: 1rem;
    }
}
`;
