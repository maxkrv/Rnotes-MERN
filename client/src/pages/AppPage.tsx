import React, { FC, useState } from "react";
import { Box, Container, Tab, Tabs } from "@mui/material";
import NoteList from "../components/NoteList";
import TodoList from "../components/TodoList";
import { useNavigate, useParams } from "react-router-dom";

const AppPage: FC = () => {
	const params = useParams();
	const navigate = useNavigate();
	const { page } = params;

	console.log(page);

	const tabNameToIndex = {
		0: "notes",
		1: "todos",
	};

	const indexToTabName = {
		notes: 0,
		todos: 1,
	};

	// @ts-ignore
	const [tab, setTab] = useState(indexToTabName[page]);

	const handleChange = (event: any, value: React.SetStateAction<number>) => {
		// @ts-ignore
		navigate(`/app/${tabNameToIndex[value]}`);
		setTab(value);
	};

	return (
		<Container sx={{ marginTop: "90px" }}>
			<Tabs value={tab} onChange={handleChange} variant="fullWidth">
				<Tab label="Notes" />
				<Tab label="ToDos" />
			</Tabs>
			<Box sx={{ marginTop: "1.5rem", textAlign: "center" }}>
				{tab === 0 && <NoteList />}
				{tab === 1 && <TodoList />}
			</Box>
		</Container>
	);
};

export default AppPage;
