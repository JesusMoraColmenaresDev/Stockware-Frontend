import { useNavigate } from "react-router-dom";

type CreateButtonProps = {
	path: string;
	name: string;
};
export const CreateButton = ({ name, path }: CreateButtonProps) => {
	const navigate = useNavigate();

	return (
		<button
			className="flex px-[2rem] py-[1rem] justify-start rounded-lg bg-bg-button-primary text-bg-secondary font-bold hover:bg-bg-button-secondary text-lg"
			onClick={() => navigate(path)}
		>
			Create {name}
		</button>
	);
};
