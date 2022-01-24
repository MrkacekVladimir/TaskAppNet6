import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {createToDoTask, CreateToDoTaskData} from "./api/createToDoTask";
import {Form, FormInputErrorMessage, FormLabel, FormSubmitButton, SelectInput, TextAreaInput, TextInput} from "../../components/forms/inputs.styled";
import styled from "styled-components";
import {sleepPromise} from "../../utils/promise";
import {LoadingSpinner} from "../../components/layout/LoadingSpinner";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {ToDoTaskStatus, ToDoTaskStatusHelper} from "./api/types/taskStatus";

export const BaseContainer = styled.div`
    max-width: 767px;
    width: 100%;
`;

export const SubmitButtonWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 8px;
`;


export const CreateToDoTaskPage: React.FC = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<CreateToDoTaskData>();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const onSubmit = async (data: CreateToDoTaskData) => {
        setLoading(true);

        try{
            const response = await createToDoTask(data);
            if(response.status !== 201){
                toast.error("Task could not be created. Please try again later.");
            } else {
                toast.success("Successfully created new task!");
                await sleepPromise(1000)(null);
                navigate(`/detail/${response.data}`);
            }
        } catch (e){
            toast.error("An error occured. Please try again later.");
        }
        finally {
            setLoading(false)
        }
    }

    return <BaseContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel>
                Name
                <TextInput {...register("name", {required: true})}/>
                { errors.name && <FormInputErrorMessage>{errors.name.message}</FormInputErrorMessage> }
            </FormLabel>
            <FormLabel>
                Description
                <TextAreaInput {...register("description", {required: true})}/>
                { errors.description && <FormInputErrorMessage>{errors.description.message}</FormInputErrorMessage> }
            </FormLabel>
            <FormLabel>
                Priority
                <SelectInput {...register("priority", {required: true, valueAsNumber: true})}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </SelectInput>
                { errors.priority && <FormInputErrorMessage>{errors.priority.message}</FormInputErrorMessage> }
            </FormLabel>
            <FormLabel>
                Status
                <SelectInput {...register("status", {required: true, valueAsNumber: true})}>
                    <option value={ToDoTaskStatus.Initial}>{ToDoTaskStatusHelper.getName(ToDoTaskStatus.Initial)}</option>
                    <option value={ToDoTaskStatus.InProgress}>{ToDoTaskStatusHelper.getName(ToDoTaskStatus.InProgress)}</option>
                    <option value={ToDoTaskStatus.Completed}>{ToDoTaskStatusHelper.getName(ToDoTaskStatus.Completed)}</option>
                </SelectInput>
                { errors.status && <FormInputErrorMessage>{errors.status.message}</FormInputErrorMessage> }
            </FormLabel>
            <SubmitButtonWrapper>
                <FormSubmitButton type="submit" disabled={loading}>Submit</FormSubmitButton>
                {loading && <LoadingSpinner/>}
            </SubmitButtonWrapper>
        </Form>
    </BaseContainer>;
};