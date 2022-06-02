import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import AppPage from "./pages/AppPage";
import RegisterPage from "./pages/RegisterPage";
import NoteList from "./components/NoteList";
import TodoList from "./components/TodoList";

const App: FC = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Navigate to="app/notes" />} />
					<Route path="app" element={<Navigate to="/" />} />
					<Route path="app/:page" element={<AppPage />} />
					<Route path="login" element={<LoginPage />} />
					<Route path="register" element={<RegisterPage />} />
					<Route path="notes" element={<NoteList />} />
					<Route path="todos" element={<TodoList />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</>
	);
};

export default App;
