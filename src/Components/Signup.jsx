import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Paper,
  Container,
  Box,
  Button,
  Typography,
  Alert,
} from "@mui/material";

const schema = z.object({
  firstName: z.string().min(3, "First Name is required"),
  lastName: z.string().min(3, "Last Name is required"),
  phone: z.string().min(8, "Phone number is too short"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm Password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function Signup() {
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const {...userData } = data;

    try {
      const response = await axios.post("http://localhost:3000/auth/register", userData);
      console.log("Success", response.data);

      setSuccessMessage("Data saved successfully. Redirecting to the login page.");
      reset();
    } catch (error) {
      console.error("Error", error.response?.data || error.message);
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
      <Paper elevation={3} sx={{ maxWidth: 500, padding: 2 }}>
        <Typography variant="h4" align="center" color="primary">
          Sign Up
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
          Create a new account
        </Typography>

        {successMessage && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {successMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <TextField
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            sx={{ mr: 2 }}
            margin="normal"
            label="First Name"
            variant="outlined"
          />
          <TextField
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            margin="normal"
            label="Last Name"
            variant="outlined"
          />
          <TextField
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            fullWidth
            margin="normal"
            label="Phone Number"
            type="tel"
            variant="outlined"
          />
          <TextField
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
          />
          <TextField
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            margin="normal"
            label="Password"
            variant="outlined"
            type="password"
          />
          <TextField
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            fullWidth
            margin="normal"
            label="Confirm Password"
            variant="outlined"
            type="password"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
