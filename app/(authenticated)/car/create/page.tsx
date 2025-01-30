'use client'
import {
  Button,
  Container,
  FormGroup,
  Paper,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState  } from 'react'

export default function Home() {

    const router = useRouter();

    const [name, setName] = useState('');
    const [invalidName, setInvalidName] = useState(false);
    const [kana, setKana] = useState('');
    const [invalidKana, setInvalidKana] = useState(false);
    const [company, setCompany] = useState('');
    const [invalidCompany, setInvalidCompany] = useState(false);

    const onCreate = async () => {
        if (!name || name.length > 40) {
            setInvalidName(true);
            return;
        } else if (!kana || kana.length > 40) {
            setInvalidKana(true);
            return;
        } else if (!company || company.length > 40) {
            setInvalidCompany(true);
            return;
        }

        fetch('http://localhost:3001/createItem',{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "accept": "application/json" 
            },
            body: JSON.stringify({
                car_model_name: name,
                car_model_name_kana: kana,
                car_company_name: company
            })
        }).then((res) => {
            return res.json()
        }).then((res) => {
            if (res.response.status == 200) {
                router.push('/car')
            }
        })
    }


    return (
        <Container>
            <Paper elevation={3} sx={{m: 1, p: 5 }}>
                <h1>create</h1>
                <FormGroup>
                <TextField
                    error={invalidName}
                    id="name"
                    label="name"
                    margin="normal"
                    value={name}
                    onChange={(event) => {setName(event.target.value)}}
                />
                <TextField
                    error={invalidKana}
                    id="kana"
                    label="kana"
                    margin="normal"
                    value={kana}
                    onChange={(event) => {setKana(event.target.value)}}
                />
                <TextField
                    error={invalidCompany}
                    id="company"
                    label="company"
                    margin="normal"
                    value={company}
                    onChange={(event) => {setCompany(event.target.value)}}
                />
                </FormGroup>
                <hr />
                <Button variant="contained" color="primary" sx={{ m: 3 }} onClick={router.back}>
                    戻る
                </Button>
                <Button variant="contained" color="primary" sx={{ m: 3 }} onClick={onCreate}>
                    登録
                </Button>
            </Paper>
        </Container>
    );
}