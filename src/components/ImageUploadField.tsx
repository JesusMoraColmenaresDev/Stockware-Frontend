import {
	type FieldValues,
	type Path,
	type UseFormRegister,
	type UseFormWatch,
} from "react-hook-form";
import { LuImageUp } from "react-icons/lu";

type ImageUploadFieldProps<T extends FieldValues> = {
	name: Path<T>;
	register: UseFormRegister<T>;
	watch: UseFormWatch<T>;
	noImageText?: string;
	required?: boolean; // <-- add this
};

export const ImageUploadField = <T extends FieldValues>({
	name,
	register,
	watch,
	noImageText = "No image selected",
	required = false, // <-- default false
}: ImageUploadFieldProps<T>) => {
	const files = watch(name);
	const fileName = files && files.length > 0 ? files[0].name : noImageText;

	return (
		<div className="flex flex-row justify-center items-center w-full h-auto">
			<div className="flex flex-col space-y-2 w-full h-auto items-center justify-center">
				<label
					htmlFor="image-upload"
					className="cursor-pointer flex justify-center w-full h-auto items-center px-[1rem] py-[0.5rem] bg-bg-secondary rounded-2xl hover:bg-accent transition"
				>
					<LuImageUp className="mr-2 h-[2rem] w-auto" />
					{fileName}
				</label>
				<input
					id="image-upload"
					type="file"
					accept="image/*"
					className="sr-only w-full h-auto"
					{...register(name, required ? { required: true } : {})}
				/>
			</div>
		</div>
	);
};
