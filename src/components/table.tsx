import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useWalletAPI from '../api/wallet';
import { useAtom } from 'jotai';
import { transactionsAtom } from '../store';
import { Box } from '@mui/material';

function createData(
  hash: string,
  summary: string
) {
  return { hash, summary };
}

const rows = [
  createData('Frozen yoghurt', '159'),
  createData('Ice cream sandwich', '237'),
  createData('Eclair', '262'),
  createData('Cupcake', '305'),
  createData('Gingerbread', '356'),
];

const BasicTable: React.FC<{ address: string }> = ({ address }) => {

  const [transactions] = useAtom(transactionsAtom);
  const [selectedRow, setSelectedRow] = React.useState();

  const handleTableClicked = (item: any) => {
    console.log(item)
    setSelectedRow(item);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ color: 'blue' }}>Transaction Hash</TableCell>
              <TableCell sx={{ display: { xs: 'none', lg: 'block' }, color: 'blue' }}>Block TimeStamp</TableCell>
              <TableCell style={{ color: 'blue' }}>Summary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row: any) => (
              <TableRow
                key={row.hash}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left" style={{ maxWidth: '50vw', overflow: 'hidden', textOverflow: 'ellipsis', textWrap: 'wrap', textDecoration: 'underline' }} onClick={() => handleTableClicked(row)}>{row.hash}</TableCell>
                <TableCell sx={{ display: { xs: 'none', lg: 'block' } }}>{row.block_timestamp}</TableCell>
                <TableCell align="left" style={{ maxWidth: '30vw', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.summary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {
        selectedRow && <Box>

        </Box>
      }
    </>
  );
}

export default BasicTable;