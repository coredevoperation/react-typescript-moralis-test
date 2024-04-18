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
import { Box } from '@mui/material';

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
            {transactions.map((row: any) => (
              <TableRow
                key={row.hash}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {row && console.log(row.summary.split(' '))}
                <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', textWrap: 'wrap', color: '#2222aa' }} onClick={() => handleTableClicked(row)}>{row.hash}</TableCell>
                <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', textWrap: 'wrap' }}>{row.method_label}</TableCell>
                <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', textWrap: 'wrap', color: '#2222aa' }}>{row.block_number}</TableCell>
                <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', textWrap: 'wrap' }}>{row.block_timestamp}</TableCell>
                <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', textWrap: 'wrap' }}>{row.from_address_label ? row.from_address_label + ': ' : ''}{row.from_address}</TableCell>
                <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', textWrap: 'wrap', color: '#2222aa' }}>{row.to_address_label ? row.to_address_label + ': ' : ''}{row.to_address}</TableCell>
                <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', textWrap: 'wrap' }}>{row.summary.split(' ')[1]} {row.summary.split(' ')[2]}</TableCell>
                <TableCell style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', textWrap: 'wrap' }}>{row.gas_price}</TableCell>
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