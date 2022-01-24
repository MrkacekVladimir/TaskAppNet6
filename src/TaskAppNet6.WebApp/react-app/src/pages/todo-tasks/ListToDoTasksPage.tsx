import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {LoadingSpinner} from "../../components/layout/LoadingSpinner";
import {fetchListToDoTasks, ListToDoTasksResponse} from "./api/fetchListToDoTasks";
import {Pagination} from "../../components/tables/Pagination";
import {Table, TableWrapper} from "../../components/tables/tables.styled";
import {useNavigate} from "react-router-dom";
import {ToDoTaskStatusHelper} from "./api/types/taskStatus";
import {formatDateTime} from "../../utils/time";

const Heading = styled.h1`
    font-size: 32px;
    line-height: 38px;
    font-weight: 500;

    margin-bottom: 24px;
`;

export const ListToDoTasksPage: React.FC = () => {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<ListToDoTasksResponse>({totalCount: 1, items: []});
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetchListToDoTasks(pageNumber, pageSize)
            .then(res => {
                setData(res.data)
                setLoading(false);
            });
    }, [pageNumber, pageSize]);

    return <main>
        <Heading>List of all ToDo tasks</Heading>
        <TableWrapper>
            <Table hoverable>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Created On</th>
                </tr>
                </thead>
                <tbody>
                {loading && <tr>
                    <td colSpan={5}><LoadingSpinner/></td>
                </tr>}
                {!loading && data.items.map((task, i: number) =>
                    <tr onClick={() => navigate(`/detail/${task.id}`)} key={i}>
                        <td>{task.id}</td>
                        <td>{task.name}</td>
                        <td>{task.description}</td>
                        <td>{task.priority}</td>
                        <td>{ToDoTaskStatusHelper.getName(task.status)}</td>
                        <td>{formatDateTime(task.createdOn)}</td>
                    </tr>)}
                </tbody>
            </Table>
            <Pagination totalCount={data.totalCount} pageNumber={pageNumber} pageSize={pageSize} setPageNumber={setPageNumber} setPageSize={setPageSize}/>
        </TableWrapper>
    </main>;
};