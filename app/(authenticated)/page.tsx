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

export default function Home() {

  

  return (
    <Container>
      <Paper elevation={3}>
        <List>
          <ListItem>
              <IconButton edge="start" aria-label="delete">
                <BorderColorIcon />
              </IconButton>
                <ListItemText
                primary="Single-line item"
                secondary='test'
              />
              <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
              </IconButton>
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
}