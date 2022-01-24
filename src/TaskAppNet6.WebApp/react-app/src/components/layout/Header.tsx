import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

const BaseContainer = styled.nav`
    display: flex;
    align-items: center;
    gap: 24px;
    
    padding: 24px 16px;
    margin-bottom: 24px;
    
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.5);
`;

const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    text-transform: uppercase;
    color: dimgray;
    cursor: pointer;
    
    &:hover{
        color: darkorange;
    }
    
    &.active{
        color: darkorange;
    }
`;

export const Header: React.FC = () => {
    return <BaseContainer>
        <StyledNavLink to="/" end>List Tasks</StyledNavLink>
        <StyledNavLink to="/create">Create New</StyledNavLink>
    </BaseContainer>;
};