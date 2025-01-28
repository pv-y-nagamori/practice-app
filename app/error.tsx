"use client"
import ErrorIcon from '@mui/icons-material/Error';
import { Box, Toolbar } from "@mui/material";

export default function ErrorPage() {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <Toolbar />
    <span>
        <h1><ErrorIcon/>500 - Page Not Found</h1>
    </span>
    </Box>

  );
}