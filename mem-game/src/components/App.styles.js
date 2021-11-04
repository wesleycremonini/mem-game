import styled from "styled-components";

export const Grid = styled.div`
    margin: 0 auto;
    padding: 0 20px;
    width: 630px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;
`;

export const Wrapper = styled.div`
    text-align: center;
    .finished {
        font-size: 2em;
        color: red;
    }
`;

export const Dashboard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 40%;
    margin: 25px auto;
    border-radius: 10px;
    background-color: black;
    padding: 20px;
    color: white;
    .result {
        border: 3px red solid;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 1.3em;
        color: white;
    }
`;