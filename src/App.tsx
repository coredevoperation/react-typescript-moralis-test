import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import AddressInput from './components/addressInput';
import BasicTable from './components/table';
import useWalletAPI from './api/wallet';
import { useAsync } from './hooks/useAsync';

function App() {

  const [address, setAddress] = useState('');
  const call = useAsync();
  const { getTransactions } = useWalletAPI();

  useEffect(() => {
    if (address != '') {
      call(() => getTransactions(address));
    }
  }, [address])

  return (
    <Box>
      <Box sx={{
        padding: {
          xs: '20px',
          md: '60px'
        }
      }}>
        <AddressInput setAddress={setAddress} />
        <BasicTable address={address} />
      </Box>
    </Box>
  );
}

export default App;
