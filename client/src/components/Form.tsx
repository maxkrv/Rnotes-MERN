import React, { FC } from "react";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormProps {
	title: string;
}

const schema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required().min(6).max(20),
});

const Form: FC<FormProps> = ({ title }) => {
	const {
		formState: { errors },
		handleSubmit,
		control,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = () => {
		console.log(errors.email);
	};

	return (
		<Paper variant="elevation" elevation={3}>
			<form
				style={{
					padding: "5rem",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
				onSubmit={handleSubmit(onSubmit)}
			>
				<Typography variant="h5" component="label">
					{title}
				</Typography>
				<Controller
					name="email"
					control={control}
					render={({ field }) => (
						<TextField
							variant="outlined"
							label="Your email"
							sx={{ marginTop: "1.2rem" }}
							{...field}
							error={!!errors.email}
							helperText={
								errors.email ? errors.email?.message : ""
							}
						/>
					)}
				/>

				<Controller
					name="password"
					control={control}
					render={({ field }) => (
						<TextField
							variant="outlined"
							label="Your password"
							type="password"
							sx={{ marginTop: "1.2rem", maxWidth: "222.4px" }}
							{...field}
							error={!!errors.password}
							helperText={
								errors.password ? errors.password?.message : ""
							}
						/>
					)}
				/>
				<Button
					variant="contained"
					size="large"
					sx={{ marginTop: "1.2rem" }}
					type="submit"
				>
					{title}
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
