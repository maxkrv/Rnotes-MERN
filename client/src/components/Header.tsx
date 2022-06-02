import React, { FC } from "react";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header: FC = () => {
	const navigate = useNavigate();

	return (
		<AppBar position="fixed">
			<Container>
				<Toolbar
					sx={{ display: "flex", justifyContent: "space-between" }}
				>
					<Typography
						variant="h6"
						component="h1"
						sx={{
							cursor: "pointer",
						}}
						onClick={() => navigate("/")}
					>
						Rnotes
					</Typography>
					<div>
						<Button
							color="inherit"
							onClick={() => navigate("login")}
						>
							Login
						</Button>
						<Button
							color="inherit"
							onClick={() => navigate("register")}
						>
							Register
						</Button>
					</div>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Header;
