import axios from "axios";
import { useEffect, useState } from "react";
import Input from "./ui/input/Input";
import Button from "./ui/button/Button";
import scss from "./CounterTodo.module.scss";

interface Render {
	_id: number;
	title: string;
	password: string;
	isAuth: boolean;
}
const url = import.meta.env.VITE_BACAND_URL;

const Counter: React.FC = () => {
	//! Sostoanie
	const [state, setState] = useState<Render[]>([]);
	const [titleValue, setTitleValue] = useState<string>("");
	const [passwordValue, setPasswordValue] = useState<string>("");
	const [nameInput, setNameInput] = useState<string>("");
	const [passwordInput, setPasswordInput] = useState<string>("");
	const [isEditId, setIsEditId] = useState<number>(0);

	//! Post Todo
	const postTodo = async () => {
		if (titleValue.trim() === "" && passwordValue.trim() === "") return;
		const newTodo = {
			title: titleValue,
			password: passwordValue,
			isAuth: false,
		};
		setTitleValue("");
		setPasswordValue("");

		const response = (await axios.post(url, newTodo)).data;
		setState(response);
		getTodo();
	};
	//!! Get Todo
	const getTodo = async () => {
		const response = (await axios.get(url)).data;
		setState(response);
	};
	//! Delete Todo
	const deleteTodo = async (id: number) => {
		const response = (await axios.delete(`${url}/${id}`)).data;
		setState(response);
	};
	//! PATCH Todo
	const patchTodo = async (id: number) => {
		const putData = {
			title: nameInput,
			password: passwordInput,
		};
		const response = (await axios.patch(`${url}/${id}`, putData)).data;
		setState(response);
		setIsEditId(0);
		getTodo();
	};

	//!uesEffect
	useEffect(() => {
		getTodo();
	}, []);
	//!Return
	return (
		<div>
			<div className={scss.container1}>
				<Input type="text" value={titleValue} setData={setTitleValue} />
				<Input
					type="password"
					value={passwordValue}
					setData={setPasswordValue}
				/>
				<Button onClick={postTodo}>add</Button>
			</div>
			{state.map((item) => (
				<div className={scss.content} key={item._id}>
					{isEditId === item._id ? (
						<>
							<input
								className={scss.input1}
								type="text"
								value={nameInput}
								onChange={(e) => setNameInput(e.target.value)}
							/>
							<br />
							<input
								className={scss.input2}
								type="text"
								value={passwordInput}
								onChange={(e) => setPasswordInput(e.target.value)}
							/>
							<Button onClick={() => patchTodo(item._id)}>update</Button>
							<Button onClick={() => setIsEditId(0)}>сancel</Button>
						</>
					) : (
						<>
							<p>{item.title}</p>
							<p>{item.password}</p>
							<Button onClick={() => deleteTodo(item._id)}>delete</Button>
							<Button
								onClick={() => {
									setIsEditId(item._id);
									setNameInput(item.title);
									setPasswordInput(item.password);
								}}>
								edit
							</Button>
						</>
					)}
				</div>
			))}
		</div>
	);
};

export default Counter;
