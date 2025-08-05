import type {
	FieldValues,
	Path,
	UseFormRegister,
	UseFormReset,
	UseFormWatch,
} from "react-hook-form";
import { LuX } from "react-icons/lu";

type SearchFieldProps<T extends FieldValues> = {
	/** Name for the register, should be the same as the watch, same as one of the keys from the default values */
	name: Path<T>;
	register: UseFormRegister<T>;
	watch: UseFormWatch<T>;
	reset?: UseFormReset<T>;
	/** In order to reset properly */
	defaultValues: T;
	/** The PlaceHolder text for the Input Field */
	placeholder?: string;
};

export const SearchField = <T extends FieldValues>({
	register,
	reset,
	watch,
	name,
	defaultValues,
	placeholder,
}: SearchFieldProps<T>) => {
	const value = watch(name);
	const resetValue = defaultValues[name];

	return (
		<>
			<input
				type="text"
				id={name}
				{...register(name)}
				placeholder={placeholder}
				className="flex px-[1rem] w-full py-[1rem] max-md:py-0.5 max-md:w-full justify-start bg-bg-secondary text-text backdrop-opacity-40 font-medium rounded-lg"
			/>
			{value && reset && (
				<button
					onClick={
						() =>
							reset({
								...defaultValues,
								[name]: resetValue,
							}) /* Copia todo y modifica el especifico, pa que pueda mirar mas vainas a la vez */
					}
				>
					<LuX className="text-text w-auto h-[1.5rem] rounded-4xl hover:border-1" />
				</button>
			)}
		</>
	);
};
