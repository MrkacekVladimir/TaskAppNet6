import styled, {css} from "styled-components";

export const TableWrapper = styled.div`
    box-shadow: 0 2px 8px rgba( 0, 0, 0, 0.2 );
`;

export interface TableProps {
    hoverable?: boolean;
}

export const Table = styled.table<TableProps>`
    border-radius: 5px;
    font-size: 16px;
    font-weight: normal;
    border: none;
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    white-space: nowrap;
    background-color: white;
    
    & td, & th{
        text-align: center;
        padding: 8px;
    }

    & td {
        border-right: 1px solid #f8f8f8;
        font-size: 14px;
    }

    & thead th {
        color: #ffffff;
        background: #4FC3A1;
    }


    & thead th:nth-child(odd) {
        color: #ffffff;
        background: #324960;
    }

    & tr:nth-child(even) {
        background: #F8F8F8;
    }

    ${({hoverable}) => hoverable && css`
        & tbody tr:hover {
            cursor: pointer;
            background: rgba(169, 169, 169, 0.4);
            
            & > td, & > th{
                border-right-color: transparent;
            }
        }
    `}

    @media (max-width: 767px) {
        .fl-table {
            display: block;
            width: 100%;
        }
        .table-wrapper:before{
            content: "Scroll horizontally >";
            display: block;
            text-align: right;
            font-size: 11px;
            color: white;
            padding: 0 0 10px;
        }
        .fl-table thead, .fl-table tbody, .fl-table thead th {
            display: block;
        }
        .fl-table thead th:last-child{
            border-bottom: none;
        }
        .fl-table thead {
            float: left;
        }
        .fl-table tbody {
            width: auto;
            position: relative;
            overflow-x: auto;
        }
        .fl-table td, .fl-table th {
            padding: 20px .625em .625em .625em;
            height: 60px;
            vertical-align: middle;
            box-sizing: border-box;
            overflow-x: hidden;
            overflow-y: auto;
            width: 120px;
            font-size: 13px;
            text-overflow: ellipsis;
        }
        .fl-table thead th {
            text-align: left;
            border-bottom: 1px solid #f7f7f9;
        }
        .fl-table tbody tr {
            display: table-cell;
        }
        .fl-table tbody tr:nth-child(odd) {
            background: none;
        }
        .fl-table tr:nth-child(even) {
            background: transparent;
        }
        .fl-table tr td:nth-child(odd) {
            background: #F8F8F8;
            border-right: 1px solid #E6E4E4;
        }
        .fl-table tr td:nth-child(even) {
            border-right: 1px solid #E6E4E4;
        }
        .fl-table tbody td {
            display: block;
            text-align: center;
        }
    }
`