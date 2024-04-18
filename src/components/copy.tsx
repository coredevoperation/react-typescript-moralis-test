import { IconButton, Tooltip } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import CheckIcon from '@mui/icons-material/Check';
import copy from 'copy-to-clipboard';
import { useEffect, useState } from 'react';

const Copy = ({ value }: { value: string; }) => {

    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClicked = () => {
        copy(value);
        setIsCopied(true);
    }

    useEffect(() => {
        if (isCopied) {
            setTimeout(() => {
                setIsCopied(false);
            }, 500)
        }
    }, [isCopied])

    return (
        <Tooltip title={isCopied ? "Copied" : "Copy Address"} placement="top" arrow>
            <IconButton aria-label="copy" size='small' onClick={handleCopyClicked}>
                {isCopied ? <CheckIcon fontSize='small' /> : <FileCopyIcon fontSize='small' />}
            </IconButton>
        </Tooltip>
    )
}

export default Copy;