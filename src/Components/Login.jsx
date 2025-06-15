import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Paper,
  Container,
  Box,
  Button,
  Typography,
} from "@mui/material";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Invalid password"),
});

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/login", data);
      const { accessToken, user } = response.data;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("success", user);

      onLogin(); 

      navigate("/home");
    } catch (error) {
      console.error("Error", error);
      setServerError("Invalid email or password. Please try again.");
    }
  };

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={3} sx={{ maxWidth: 500, padding: 2, marginTop: 8 }}>
        <Typography variant="h4" align="center" color="primary">
          Log In
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <TextField
            {...register("email")}
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            {...register("password")}
            fullWidth
            margin="normal"
            label="Password"
            variant="outlined"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          {serverError && (
            <Typography color="error" sx={{ mt: 1 }}>
              {serverError}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, mb: 1 }}
            type="submit"
          >
            Sign in
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}