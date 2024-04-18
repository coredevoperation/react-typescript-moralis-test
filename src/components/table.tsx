import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAtom } from 'jotai';
import { transactionsAtom } from '../store';
import { Box, TablePagination } from '@mui/material';
import Copy from './copy';

const BasicTable: React.FC<{ address: string }> = ({ address }) => {

  const [transactions] = useAtom(transactionsAtom);
  const [selectedRow, setSelectedRow] = React.useState();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTableClicked = (item: any) => {
    console.log(item)
    setSelectedRow(item);
  }

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Transaction Hash</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Method</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Block</TableCell>
              <TableCell style={{ color: '#2222aa', fontWeight: 'bold' }}>TimeStamp</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>From</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>To</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Value</TableCell>
              <TableCell style={{ color: '#2222aa', fontWeight: 'bold' }}>Txn Fee</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row: any, index: number) => (
              index >= rowsPerPage * (page) && index < rowsPerPage * (page + 1) &&
              <TableRow
                key={row.hash}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', textWrap: 'wrap', color: '#2222aa' }} onClick={() => handleTableClicked(row)}>{row.hash}</TableCell>
                <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', textWrap: 'wrap' }}>{row.method_label}</TableCell>
                <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', textWrap: 'wrap', color: '#2222aa' }}>{row.block_number}</TableCell>
                <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', textWrap: 'wrap' }}>{row.block_timestamp}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', textWrap: 'wrap' }}>{row.from_address_label ? row.from_address_label + ': ' : ''}{row.from_address}</span>
                    <span><Copy value={row.from_address} /></span>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', textWrap: 'wrap', color: '#2222aa' }}>{row.to_address_label ? row.to_address_label + ': ' : ''}{row.to_address}</span>
                    <span><Copy value={row.to_address} /></span>
                  </Box>
                </TableCell>
                <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', textWrap: 'wrap' }}>{row.summary.split(' ')[1]} {row.summary.split(' ')[2]}</TableCell>
                <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', textWrap: 'wrap' }}>{row.gas_price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={transactions.length > 0 ? transactions.length : 100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {
        selectedRow && <Box>

        </Box>
      }
    </Box>
  );
}

export default BasicTable;