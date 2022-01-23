import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {ListToDoTasksPage} from "./pages/todo-tasks/ListToDoTasksPage";
import {CreateToDoTaskPage} from "./pages/todo-tasks/CreateToDoTaskPage";
import {EditToDoTaskPage} from "./pages/todo-tasks/EditToDoTaskPage";
import {DetailToDoTaskPage} from "./pages/todo-tasks/DetailToDoTaskPage";
import styled from "styled-components";
import {Header} from "./components/layout/Header";


const BaseContainer = styled.div`
    display: flex;
    justify-content: center;

`;
const WidthRestrictionContainer = styled.div`
    width: 100%;
    max-width: 1248px;
    
    margin-top: 64px;
`;

function App() {
    return (<BaseContainer>
        <WidthRestrictionContainer>
            <Header />
            <Routes>
                <Route path="/" element={<ListToDoTasksPage/>}/>
                <Route path="/create" element={<CreateToDoTaskPage/>}/>
                <Route path="/edit/:id" element={<EditToDoTaskPage/>}/>
                <Route path="/detail/:id" element={<DetailToDoTaskPage/>}/>
            </Routes>
        </WidthRestrictionContainer>
    </BaseContainer>);
}

export default App;