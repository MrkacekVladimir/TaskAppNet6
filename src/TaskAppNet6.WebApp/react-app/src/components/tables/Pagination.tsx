import styled from "styled-components";
import React, {useMemo} from "react";

const BaseContainer = styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;
    padding: 12px 16px
`;

const ButtonsContainer = styled.div`
    display: flex;
    gap: 16px;
`;
const PageSwitchButton = styled.button`
    padding: 4px 12px;
    background-color: transparent;
    border-radius: 4px;

    &:not(:disabled):hover {
        cursor: pointer;
        background-color: slategray;
        color: white;
    }
`;

const PageInformationContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const PageInformation = styled.div``;
const PageSizeSelector = styled.select``;


export interface PaginationProps {
    totalCount: number;
    pageNumber: number;
    pageSize: number;

    setPageNumber(page: number): void;

    setPageSize(size: number): void;
}

export const Pagination: React.FC<PaginationProps> = (props) => {
    const {totalCount, pageNumber, setPageNumber, pageSize, setPageSize} = props;
    const totalPages = useMemo(() => totalCount > 0 ? Math.ceil(totalCount / pageSize) : 1, [totalCount, pageSize]);

    return <BaseContainer>
        <ButtonsContainer>
            <PageSwitchButton disabled={pageNumber === 1} onClick={() => setPageNumber(pageNumber - 1)}>Previous</PageSwitchButton>
            <PageSwitchButton disabled={pageNumber === totalPages} onClick={() => setPageNumber(pageNumber + 1)}>Next</PageSwitchButton>
        </ButtonsContainer>
        <PageInformationContainer>
            <PageInformation>
                Stránka {pageNumber} z {totalPages}
            </PageInformation>
            <PageSizeSelector value={pageSize} onChange={(e) => {
                setPageSize(parseInt(e.currentTarget.value));
                setPageNumber(1);
            }}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="40">40</option>
                <option value="100">100</option>
            </PageSizeSelector>
        </PageInformationContainer>
    </BaseContainer>
};