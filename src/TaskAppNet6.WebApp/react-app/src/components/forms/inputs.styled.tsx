import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const FormLabel = styled.label`
    font-size: 16px;
    margin-bottom: 8px;
`;

export const FormInputErrorMessage = styled.div`
    text-transform: uppercase;
    background-color: rgba(255, 0, 0, 0.5);;
    color: white;
    border-radius: 8px;
`;

export const TextInput = styled.input`
    display: block;
    min-width: 50%;
    font-size: 16px;
    margin-top: 4px;
    padding: 4px 8px;
    border-width: 1px;
    border-radius: 4px;
`;

export const TextAreaInput = styled.textarea`
    display: block;
    min-width: 50%;
    font-size: 16px;
    margin-top: 4px;
    padding: 4px 8px;
    border-width: 1px;
    border-radius: 4px;
`;


export const SelectInput = styled.select`
    display: block;
    margin-top: 4px;
    font-size: 16px;
    padding: 4px 8px;
    border-radius: 4px;
`;

export const FormSubmitButton = styled.button`
    width: fit-content;
    padding: 4px 24px;
    font-size: 16px;
    background-color: transparent;
    border-radius: 4px;
    border: 1px solid rgb(0, 100, 0);
    color: rgb(0, 100, 0);
    margin-top: 16px;

    &:disabled {
        border-color: dimgray;
        color: dimgray;
    }

    &:not(:disabled):hover {
        cursor: pointer;
        background-color: rgba(0, 100, 0, 0.7);
        color: white;
    }
`;