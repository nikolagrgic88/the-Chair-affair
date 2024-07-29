import React from 'react';
import {
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
	FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type FormInputProps = {
	id: string;
	label: string;
	type: 'email' | 'text' | 'password';
	error: boolean;
	helperText: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: () => void;
	handleShowPassword?: () => void;
};

const FormInput: React.FC<FormInputProps> = ({
	id,
	label,
	type = 'text',
	error,
	helperText,
	onChange,
	onBlur,
	handleShowPassword,
}) => {
	return (
		<FormControl sx={{ m: 1, width: '25ch' }} variant='outlined' error={error}>
			<InputLabel htmlFor={id} required>
				{label}
			</InputLabel>
			<OutlinedInput
				id={id}
				type={type}
				label={label}
				onChange={onChange}
				onBlur={onBlur}
				style={{ backgroundColor: 'white' }}
				endAdornment={
					handleShowPassword ? (
						<InputAdornment position='end'>
							<IconButton
								aria-label='toggle password visibility'
								onClick={handleShowPassword}
								edge='end'
							>
								{type === 'password' ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					) : null
				}
			/>
			<FormHelperText style={{ color: 'red' }}>{helperText}</FormHelperText>
		</FormControl>
	);
};

export default FormInput;
