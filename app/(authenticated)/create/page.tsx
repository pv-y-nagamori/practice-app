'use client'
import {
  Button,
  Container,
  FormGroup,
  Paper,
  TextField,
  TextareaAutosize
} from "@mui/material";



export default function Home() {
  return (
    <Container>
      <Paper elevation={3} sx={{m: 1, p: 5 }}>
        <h1>create</h1>
        <FormGroup>
          <TextField
            id="title"
            label="title"
            margin="normal"
          />
          <TextField
            id="content"
            label="content"
            margin="normal"
            multiline
            rows={4}
        />
        </FormGroup>
        <hr />
        <Button variant="contained" color="primary">
          ボタン
        </Button>
      </Paper>
    </Container>
  );
}