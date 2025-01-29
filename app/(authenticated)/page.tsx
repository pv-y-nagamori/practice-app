'use client'
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Container,
  Paper,
} from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import useSWR from 'swr';
import { preload } from 'swr';
import { useRouter } from "next/navigation";

type Memo = {
  id: number,
  title: string,
  content: string,
  createdAt: string,
  updatedAt: string
}

async function fetcher(key: string) {　// keyはuseSWR()の第１引数で渡されたURL
  return fetch(key).then((res) => res.json() as Promise<Memo[] | null>);
}

preload('/api/memo', fetcher);

export default function Home() {

  const router = useRouter();
  const {data , error, isLoading} = useSWR('/api/memo',fetcher);

  const onDelete = async (id :number) => {
    await fetch(`/api/memo?id=${id}`, {
      method:"DELETE"
    }).then((res)=>{
      if(res.status == 200) {
        router.refresh()
      }
    })
  }


  if (error) return <div>エラーです</div>;
  if(isLoading) return <div>読み込み中...</div>;

  return (
    <Container>
      <Paper elevation={3}>
        <List>
          {data?.map((item : Memo) => {
            return (
              <ListItem key={item.id}>
                <IconButton edge="start" aria-label="delete" href={`/edit/${item.id}`}>
                  <BorderColorIcon />
                </IconButton>
                  <ListItemText
                  primary={item.title}
                  secondary={item.content}
                />
                <IconButton edge="end" aria-label="delete" onClick={()=>{onDelete(item.id)}}>
                    <DeleteIcon />
                </IconButton>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </Container>
  );
}