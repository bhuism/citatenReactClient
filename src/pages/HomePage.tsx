import {Table} from "../components/Table";
import React from "react";
import BasePage from "./BasePage";

const HomePage: React.FC = () => {
    return (
        <BasePage>
            <Table name={'testtable'}/>
        </BasePage>
    );
};

export default HomePage;

