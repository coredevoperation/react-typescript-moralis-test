import { Box, Button, TextField } from "@mui/material";
import { FC, useRef, useState } from "react";

interface AddressInputProps {
    setAddress: (val: string) => void;
}

const validateEthereumAddress = (address: string): boolean => {
    const ethereumAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;

    return ethereumAddressRegex.test(address);
};

const AddressInput: FC<AddressInputProps> = ({ setAddress }) => {

    const [addr, setAddr] = useState('');
    const [isValid, setIsValid] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setAddr(inputValue);
        setIsValid(validateEthereumAddress(inputValue));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(addr)
        setAddress(addr);
    }

    return (
        <Box>
            <Box
                component={'form'}
                sx={{
                    display: 'flex',
                    flexDirection: {
                        xs: 'column',
                        md: 'row',
                    },
                    gap: '20px',
                    width: {
                        xs: '100%',
                        lg: '50%',
                    }
                }}
                onSubmit={handleSubmit}
            >
                <TextField id="address-basic" onChange={handleChange} label="Public Address" variant="outlined" required sx={{ flexGrow: '1' }} />
                <Button type="submit" variant="contained">Submit</Button>

            </Box>
            {addr == '' ? <p style={{color: 'transparent'}}>Blank</p> :
                isValid ? (
                    <p style={{ color: 'green' }}>Valid Ethereum Address</p>
                ) : (
                    <p style={{ color: 'red' }}>Invalid Ethereum Address</p>
                )}
        </Box>
    )
}

export default AddressInput;