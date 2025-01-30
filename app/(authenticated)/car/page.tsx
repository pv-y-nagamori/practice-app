"use client"
import {
    Button,
    Container,
    FormGroup,
    Paper,
    TextField,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from "react";
import Link from "next/link";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

type Data = {
    car_model_id : string; 					
    car_model_name : string;					
    car_model_name_kana	: string;				
    delete_flg : boolean;					
    entry_date_time	: string;				
    entry_user : string;					
    upd_date_time : string;					
    upd_user : string;					
}
export default function CarList() {

    const [data, setData] = useState([[]]);

    const [pageData, setPageData] = useState<Data[]>([])

    const [name, setName] = useState('');

    const [kana, setKana] = useState('');

    const [page, setPage] = useState(1)

    const onClear = () => {
        setKana('');
        setName('');
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        setPageData(data[value-1]);
    };

    function sliceArray(arr : [], size : number){
        return arr.flatMap((_, i) => i % size ? [] : [arr.slice(i, i + size)]);
    }

    const  setDatas  = (res : any) => {
        setData(sliceArray(res, 30));
        setPageData(data[0]);
    }

    const onSearch = async () => {
        fetch('http://localhost:3001/searchItems',{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "accept": "application/json" 
            },
            body: JSON.stringify({
                car_model_name:name,
                car_model_name_kana:kana
            })
        }).then((res) => {
            return res.json();
        }).then((res) => {
            setDatas(res.response)
         })
        
    }

    return (
        <>
            <Container sx={{ m: 3 }}>
                <Paper sx={{ m: 3 }}>
                    <FormGroup>
                        <TextField
                            id="name"
                            label="name"
                            margin="normal"
                            value={name}
                            onChange={(event) => {setName(event.target.value)}}
                            sx={{ m: 3 }}
                        />
                        <TextField
                            id="kana"
                            label="kana"
                            margin="normal"
                            value={kana}
                            onChange={(event) => {setKana(event.target.value)}}
                            sx={{ m: 3}}
                        />
                    </FormGroup>
                    <Button variant="contained" color="primary" sx={{ m: 3 }} onClick={onSearch}>
                        検索
                    </Button>
                    <Button variant="contained" color="primary" sx={{ m: 3 }} onClick={onClear}>
                        条件クリア
                    </Button>
                    <Button variant="contained" color="primary" sx={{ m: 3 }} href='car/create'>
                        新規登録
                    </Button>
                </Paper>
            </Container>
            <Container sx={{ m: 3 }}>
                <Paper>
                    <TableContainer>
                        <Table aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>編集</StyledTableCell>
                                <StyledTableCell>コード</StyledTableCell>
                                <StyledTableCell align="right">名称</StyledTableCell>
                                <StyledTableCell align="right">カナ</StyledTableCell>
                                <StyledTableCell align="right">最終更新日時</StyledTableCell>
                                <StyledTableCell align="right">最終更新者</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {pageData.map((row) =>  { 
                                return (
                                    <StyledTableRow key={row.car_model_id}>
                                        <StyledTableCell >
                                            <Link href={`/car/${row.car_model_id}`}><EditIcon /></Link>
                                        </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {row.car_model_id}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.car_model_name}</StyledTableCell>
                                        <StyledTableCell align="right">{row.car_model_name_kana}</StyledTableCell>
                                        <StyledTableCell align="right">{row.upd_date_time}</StyledTableCell>
                                        <StyledTableCell align="right">{row.upd_user}</StyledTableCell>
                                    </StyledTableRow>
                                )
                            })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <Stack spacing={2} alignItems="center" sx={{ m: 3 }}>
                    <Pagination count={data.length} page={page} onChange={handleChange} showFirstButton showLastButton variant="outlined" />
                </Stack>
            </Container>
        </>

    );
}