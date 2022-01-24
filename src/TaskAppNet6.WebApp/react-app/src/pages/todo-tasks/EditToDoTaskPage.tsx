import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Form, FormInputErrorMessage, FormLabel, FormSubmitButton, SelectInput, TextAreaInput, TextInput} from "../../components/forms/inputs.styled";
import styled from "styled-components";
import {sleepPromise} from "../../utils/promise";
import {LoadingSpinner} from "../../components/layout/LoadingSpinner";
import {toast} from "react-hot-toast";
import {useNavigate, useParams} from "react-router-dom";
import {editToDoTask, EditToDoTask} from "./api/editToDoTask";
import {fetchDetailToDoTask, ToDoTaskDetailData, ToDoTaskDetailInitialData} from "./api/fetchDetailToDoTask";

export const BaseContainer = styled.div`
    max-width: 767px;
    width: 100%;
`;

const Heading = styled.h1`
    font-size: 24px;
    line-height: 32px;
    font-weight: 600;

    margin-bottom: 24px;
`;

export const SubmitButtonWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 8px;
`;

type DetailPageParams = {
    id: string;
}

export const EditToDoTaskPage: React.FC = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<EditToDoTask>();
    const [loading, setLoading] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [data, setData] = useState<ToDoTaskDetailData>(ToDoTaskDetailInitialData);
    const {id} = useParams<DetailPageParams>();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetchDetailToDoTask(id!).then(res => {
            if (res.status !== 200) {
                toast.error("ToDo task was not found.")
            } else {
                if(res.data.status === 3){
                    toast.error("Completed task cannot be modified.")
                    navigate(`/detail/${id}`);
                }

                setData(res.data);
                setLoading(false);
                reset();
            }
        });
    }, [id]);

    const onSubmit = async (data: EditToDoTask) => {
        setSubmitting(true);
        try{
            const response = await editToDoTask(id!, data);
            const success = response.data;
            if(!success){
                toast.error("Task could not be updated. Please try again later.");
            } else {
                toast.success(`Successfully updated task #${id}.`);
                await sleepPromise(1000)(null);
                navigate(`/detail/${id}`);
            }
        } catch (e){
            toast.error("An error occured. Please try again later.");
        }
        finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return <LoadingSpinner/>;
    }

    return <BaseContainer>
        <Heading>Updating task #{data.id} - {data.name}</Heading>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel>
                Name
                <TextInput {...register("name", {required: true})} defaultValue={data.name}/>
                { errors.name && <FormInputErrorMessage>{errors.name.message}</FormInputErrorMessage> }
            </FormLabel>
            <FormLabel>
                Description
                <TextAreaInput {...register("description", {required: true})} defaultValue={data.description}/>
                { errors.description && <FormInputErrorMessage>{errors.description.message}</FormInputErrorMessage> }
            </FormLabel>
            <FormLabel>
                Priority
                <SelectInput {...register("priority", {required: true, valueAsNumber: true})} defaultValue={data.priority}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </SelectInput>
                { errors.priority && <FormInputErrorMessage>{errors.priority.message}</FormInputErrorMessage> }
            </FormLabel>
            <SubmitButtonWrapper>
                <FormSubmitButton type="submit" disabled={submitting}>Submit</FormSubmitButton>
                <FormSubmitButton onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                }}>Cancel</FormSubmitButton>
                {submitting && <LoadingSpinner/>}
            </SubmitButtonWrapper>
        </Form>
    </BaseContainer>;
};