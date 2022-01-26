import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const Dashbord = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    useEffect(() => {
        console.log(localStorage.getItem('userData'));
        const headers = {
            Cookie: {
                "csrftoken": "q0FqcIRO1do5fs8c7A5xOA0tq9PwYicn24k7Ajv7AX0oVn9FUgUwI7WLtUwXxVXE",
                "sessionid": "wjtbes2w68vagjm123nj7jreughzpzhf",
                "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MjQxfQ.1w0W6g3HUBnWWrOaAbHsPqyNbAmzTUR9WX_dEDIgoCg",
                "tran": "satmis1000003"
            }
        }

        const Body = {
            "id": 1
        }
        axios.post('https://myphysio.digitaldarwin.in/api/get-patient/', Body, headers)
            .then((res) => {
                console.log(res.data);
                console.log(res.data.length)
                if (res.data) {
                    setData(res.data);
                    setIsLoading(false);
                } else {
                    console.log("Can not get data!")
                }
            })
            .catch((err) => {
                console.log("error: ", err)
            })
    }, [])
    return (
        <div>
            {isLoading ? "isLoading..."
                :
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {['Patient Code', 'Name', 'Date of Birth', 'Mobile No'].map((column, i) => (
                                        <TableCell
                                            key={i}
                                        style={{ textAlign:'center'}}
                                        >
                                            {column}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {data
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((patientData, i) => {
                                        console.log(patientData);
                                        return (
                                            <TableRow key={i}>
                                                <TableCell style={{textAlign:'center'}}>
                                                    {patientData.patient_code}
                                                </TableCell>
                                                <TableCell style={{textAlign:'center'}}>
                                                    {patientData.first_name} {patientData.middle_name} {patientData.last_name}
                                                </TableCell>
                                                <TableCell style={{textAlign:'center'}}>
                                                    {patientData.dob}
                                                </TableCell>
                                                <TableCell style={{textAlign:'center'}}>
                                                    {patientData.mobile_no}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            }

        </div>
    )
}

export default Dashbord;