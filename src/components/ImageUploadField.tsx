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
};

export const ImageUploadField = <T extends FieldValues>({
	name,
	register,
	watch,
}: ImageUploadFieldProps<T>) => {
	const files = watch(name); // FileList | undefined
	const fileName =
		files && files.length > 0 ? files[0].name : "No image selected";

	return (
		<div className="flex flex-row justify-center items-center w-full h-auto">
			<div className="flex flex-col space-y-2 w-full h-auto items-center justify-center">
				{/* label styled as a button */}
				<label
					htmlFor="image-upload"
					className="cursor-pointer flex justify-center w-full h-auto items-center px-[1rem] py-[0.5rem] bg-bg-secondary rounded-2xl hover:bg-accent transition"
				>
					<LuImageUp className="mr-2 h-[2rem] w-auto" />
					{fileName}
				</label>

				{/* the real file input is visually hidden but still accessible */}
				<input
					id="image-upload"
					type="file"
					accept="image/*"
					className="sr-only w-full h-auto"
					{...register(name, { required: true })}
				/>
			</div>
		</div>
	);
};
