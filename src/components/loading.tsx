import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './loading.css';
import { useAtom } from 'jotai';
import { Typography } from '@mui/material';
import { loadingAtom } from '../store';

export default function Loading() {
    const [loading] = useAtom(loadingAtom);

    return (
        <Box className={`loading-container ${loading ? "" : "hide"}`}>
            <div className='cursor'>
                <CircularProgress />
                <Typography className='loading-text'>Loading...</Typography>
            </div>
        </Box>
    );
}