'use client'
import {
  Button,
  Container,
  FormGroup,
  Paper,
  TextField,
  TextareaAutosize
} from "@mui/material";
import { useState } from "react";

export default function Home() {

  const [title, setTitle] = useState('');
  let titleErr = false;

  const [content, setContent] = useState('');
  let contentErr = false;

  const onSubmit = async () => {
    if (!title) {
      titleErr = true;
      return
    } else if (!content) {
      contentErr = true;
    }

    await fetch('/api/memo',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        content: content
      })
    }).then((response) => {
      console.log(response)
    }).catch((err) => {
      console.log(err)
    })
    
  }

  return (
    <Container>
      <Paper elevation={3} sx={{m: 1, p: 5 }}>
        <h1>create</h1>
        <FormGroup>
          <TextField
            id="title"
            label="title"
            margin="normal"
            value={title}
            onChange={(event) => {setTitle(event.target.value), titleErr = false;}}
            error={titleErr}
          />
          <TextField
            id="content"
            label="content"
            margin="normal"
            multiline
            rows={4}
            value={content}
            onChange={(event) => {setContent(event.target.value), contentErr = false;}}
            error={contentErr}
        />
        </FormGroup>
        <hr />
        <Button variant="contained" color="primary" onClick={onSubmit}>
          登録
        </Button>
      </Paper>
    </Container>
  );
}