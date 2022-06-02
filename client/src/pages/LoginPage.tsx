import React, { FC } from "react";
import { Container } from "@mui/material";
import Form from "../components/Form";

const LoginPage: FC = () => {
	return (
		<>
			<Container
				sx={{
					height: "100vh",
					width: "100vw",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Form title="Login" />
			</Container>
		</>
	);
};

export default LoginPage;
