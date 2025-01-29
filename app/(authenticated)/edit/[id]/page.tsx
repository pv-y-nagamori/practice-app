'use client'
import {
  Button,
  Container,
  FormGroup,
  Paper,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, use } from "react";
import useSWR from 'swr';
type Memo = {
  id: number,
  title: string,
  content: string,
  createdAt: string,
  updatedAt: string
}

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json() as Promise<Memo | null>);
}

export default function Home( { params }: { params: Promise<{ id: string }> }) {
  
  const id = use(params).id

  const {data , error, isLoading} = useSWR(`/api/memo?id=${id}`,fetcher);

  const router = useRouter();

  let btnDisabled = false;

  const [title, setTitle] = useState(data?.title);
  let titleErr = false;

  const [content, setContent] = useState(data?.content);
  let contentErr = false;

  const onSubmit = async () => {
    if (!title) {
      titleErr = true;
      return
    } else if (!content) {
      contentErr = true;
    }

    btnDisabled = true

    await fetch('/api/memo',{
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id:id,
        title: title,
        content: content
      })
    }).then((response) => {
      if (response.status == 200) {
        router.push('/');
      }
    }).catch((err) => {
      console.log(err)
    }).finally(()=>{
      btnDisabled = false;
    })
    
  }

  if (error) return <div>エラーです</div>;
  if(isLoading) return <div>読み込み中...</div>;

  return (
    <Container>
      <Paper elevation={3} sx={{m: 1, p: 5 }}>
        <h1>edit</h1>
        <FormGroup>
          <TextField
            id="title"
            label="title"
            margin="normal"
            value={title}
            onChange={(event) => {setTitle(event.target.value)}}
            error={titleErr}
          />
          <TextField
            id="content"
            label="content"
            margin="normal"
            multiline
            rows={4}
            value={content}
            onChange={(event) => {setContent(event.target.value)}}
            error={contentErr}
        />
        </FormGroup>
        <hr />
        <Button variant="contained" color="primary" onClick={onSubmit} disabled={btnDisabled}>
          登録
        </Button>
      </Paper>
    </Container>
  );
}