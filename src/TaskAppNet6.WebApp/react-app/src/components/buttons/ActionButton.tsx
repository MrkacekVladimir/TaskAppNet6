import React, {useState} from "react";
import styled from "styled-components";
import {LoadingSpinner} from "../layout/LoadingSpinner";


const StyledButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 8px;
    font-size: 16px;
    background-color: transparent;
    text-decoration: none;
    color: royalblue;
    border: 1px solid royalblue;
    border-radius: 4px;
    text-align: center;

    &:hover {
        cursor: pointer;
        background-color: royalblue;
        color: white;
    }
`;


export interface ActionButtonProps {
    text: string;

    action(): void | Promise<any>;
}

export const ActionButton: React.FC<ActionButtonProps> = (props) => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleOnClick = async () => {
        setLoading(true);
        await props.action();
        setLoading(false);
    };

    return <StyledButton onClick={handleOnClick}>
        {props.text}
        {loading && <LoadingSpinner/>}
    </StyledButton>;
};