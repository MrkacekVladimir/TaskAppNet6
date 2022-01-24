import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import {LoadingSpinner} from "../../components/layout/LoadingSpinner";
import {fetchDetailToDoTask, ToDoTaskDetailData, ToDoTaskDetailInitialData} from "./api/fetchDetailToDoTask";
import {toast} from "react-hot-toast";
import {formatDateTime} from "../../utils/time";
import {ActionButton} from "../../components/buttons/ActionButton";
import {updateToDoTaskStatus} from "./api/updateToDoTaskStatus";
import {ToDoTaskStatusHelper} from "./api/types/taskStatus";
import {deleteToDoTask} from "./api/deleteToDoTask";

const BaseContainer = styled.div``;

const Heading = styled.h1`
    font-size: 24px;
    line-height: 32px;
    font-weight: 600;

    margin-bottom: 24px;
`;

const InformationList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const InformationListItem = styled.li<{ columnOrientation?: boolean }>`
    display: flex;
    gap: 8px;
    justify-content: ${({columnOrientation}) => columnOrientation ? "center" : "flex-start"};
    align-items: ${({columnOrientation}) => columnOrientation ? "flex-start" : "center"};
    flex-direction: ${({columnOrientation}) => columnOrientation ? "column" : "row"};
`;

const InformationTitle = styled.span`
    font-size: 18px;
    line-height: 24px;
    font-weight: 500;
`;
const InformationValue = styled.span`
    font-size: 16px;
    line-height: 20px;
`;

const ButtonsContainer = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 16px;
`;

type DetailPageParams = {
    id: string;
}

export const DetailToDoTaskPage: React.FC = () => {
    const [data, setData] = useState<ToDoTaskDetailData>(ToDoTaskDetailInitialData);
    const [loading, setLoading] = useState<boolean>();
    const {id} = useParams<DetailPageParams>();
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetchDetailToDoTask(id!);
            setData(res.data);
            setLoading(false);
        } catch (e) {
            toast.error("ToDo task was not found.");
        }
    }

    useEffect(() => {
        fetchData();
    }, [id]);

    const setStatus = async (status: number) => {
        const response = await updateToDoTaskStatus(id!, status);
        const success = response.data;
        if (success) {
            toast.success("Succesfully changed task status.");
            await fetchData();
        } else {
            toast.error("Task status could not be changed.");
        }
    }


    const handleDelete = async () => {
        if (window.confirm("Do you want to delete the task?")) {
            try {
                const response = await deleteToDoTask(id!);
                toast.success("Succesfully deleted the task.");
                navigate("/");
            } catch (e) {
                toast.error("Failed to delete the task.");
            }
        }
    }

    if (loading) {
        return <LoadingSpinner/>;
    }

    return <BaseContainer>
        <Heading>#{data.id} - {data.name}</Heading>
        <InformationList>
            <InformationListItem>
                <InformationTitle>Task Identifier:</InformationTitle>
                <InformationValue>{data.id}</InformationValue>
            </InformationListItem>
            <InformationListItem>
                <InformationTitle>Name:</InformationTitle>
                <InformationValue>{data.name}</InformationValue>
            </InformationListItem>
            <InformationListItem columnOrientation>
                <InformationTitle>Description</InformationTitle>
                <InformationValue>{data.description}</InformationValue>
            </InformationListItem>
            <InformationListItem>
                <InformationTitle>Priority:</InformationTitle>
                <InformationValue>{data.priority}</InformationValue>
            </InformationListItem>
            <InformationListItem>
                <InformationTitle>Status:</InformationTitle>
                <InformationValue>{ToDoTaskStatusHelper.getName(data.status)}</InformationValue>
            </InformationListItem>
            <InformationListItem>
                <InformationTitle>Created on:</InformationTitle>
                <InformationValue>{formatDateTime(data.createdOn)}</InformationValue>
            </InformationListItem>
            <InformationListItem>
                <InformationTitle>Last modified on:</InformationTitle>
                <InformationValue>{data.lastModifiedOn ? formatDateTime(data.lastModifiedOn) : "-"}</InformationValue>
            </InformationListItem>
        </InformationList>
        <ButtonsContainer>
            {data.status !== 1 && <ActionButton text="Mark as Initial" action={() => setStatus(1)}/>}
            {data.status !== 2 && <ActionButton text="Mark as In Progress" action={() => setStatus(2)}/>}
            {data.status !== 3 && <ActionButton text="Mark as Completed" action={() => setStatus(3)}/>}
            {data.status !== 3 && <ActionButton text="Edit" action={() => navigate(`/edit/${data.id}`)}/>}
            <ActionButton text="Delete" action={handleDelete}/>
        </ButtonsContainer>

    </BaseContainer>;
};