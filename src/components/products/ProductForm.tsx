import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { createProductType } from "../../types";

type ProductFormProps = {
	errors: FieldErrors<createProductType>;
	register: UseFormRegister<createProductType>;
};

export default function ProductForm({ errors, register }: ProductFormProps) {
	return (
		<>
			<div>
				<label htmlFor="name">Nombre del producto</label>
				<input
					id="name"
					type="text"
					{...register("name", { required: "El nombre es Obligatorio" })}
				/>
				{errors.name?.message && <p>{errors.name.message as string}</p>}
			</div>

			<div>
				<label htmlFor="price">Precio del producto</label>
				<input
					id="price"
					type="number"
					{...register("price", { required: "El precio es obligatorio" })}
				/>
				{errors.price?.message && <p>{errors.price.message as string}</p>}
			</div>

			<div>
				<label htmlFor="stock">stock del producto</label>
				<input
					id="stock"
					type="number"
					{...register("stock", { required: "El stock es obligatorio" })}
				/>
				{errors.stock?.message && <p>{errors.stock.message as string}</p>}
			</div>

			<div>
				<label htmlFor="description">Descripcion del producto</label>
				<input
					id="description"
					type="text"
					{...register("description", {
						required: "La descripcion es obligatoria",
					})}
				/>
				{errors.description?.message && (
					<p>{errors.description.message as string}</p>
				)}
			</div>

			<div>
				<label htmlFor="category_id">Categoria del producto</label>
				<input
					id="category_id"
					type="number"
					{...register("category_id", {
						required: "La categoria es obligatoria",
					})}
				/>
				{errors.category_id?.message && (
					<p>{errors.category_id.message as string}</p>
				)}
			</div>

			<div>
				<label htmlFor="minimumQuantity">Cantidad minima</label>
				<input
					id="minimumQuantity"
					type="number"
					{...register("minimumQuantity", {
						required: "La cantidad minima de stock es obligatoria",
					})}
				/>
				{errors.minimumQuantity?.message && (
					<p>{errors.minimumQuantity.message as string}</p>
				)}
			</div>

			<div>
				<label htmlFor="image">Imagen del producto</label>
				<input
					id="image"
					type="file"
					accept="image/*"
					{...register("image", { required: "La imagen es obligatoria" })}
				/>
				{errors.image?.message && <p>{errors.image.message as string}</p>}
			</div>

			<input type="submit" />
		</>
	);
}
