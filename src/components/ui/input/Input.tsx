import React, { ChangeEvent } from "react";
import scss from "./Input.module.scss";

interface InputProps {
	type: string;
	value: string;
	setData: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ type, value, setData }) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setData(e.target.value);
	};

	return (
		<input
			className={scss.input}
			type={type}
			value={value}
			onChange={handleChange}
		/>
	);
};

export default Input;
