import { z } from "zod";

export const categorySchema = z.object({
	id: z.number(),
	name: z.string(),
	products_count: z.number().int().min(0), // Verificar que sea un int
	created_at: z.string().datetime(),
	updated_at: z.string().datetime(),
});

export const productSchema = z.object({
	id: z.number(),
	name: z.string(),
	price: z.number().min(0),
	description: z.string(),
	category_id: z.number().int().min(1),
	stock: z.number().int().min(0),
	minimumQuantity: z.number().int().min(1),
	image_url: z.string().url(),
	created_at: z.string().datetime(),
	updated_at: z.string().datetime(),
});

export const UserSchemaAuth = z.object({
	name: z.string().optional(),
	email: z.string().email(),
  	password: z.string().min(6),
  	confirmPassword: z.string().optional()
});

export type typeUser = z.infer<typeof UserSchemaAuth>

export const productsSchema = z.array(productSchema);
export const categoriesSchema = z.array(categorySchema);

export type CategoryType = z.infer<typeof categorySchema>;
export type ProductType = z.infer<typeof productSchema>;

export const createProductSchema = productSchema
	.pick({
		name: true,
		price: true,
		description: true,
		category_id: true,
		stock: true,
		minimumQuantity: true,
	})
	.extend({
		image: z.instanceof(FileList),
	});

export type createProductType = z.infer<typeof createProductSchema>;

export type User = {
	id: number | string;
	name: string;
	email: string;
	role: string;
	date_added: string;
};

// 2. Definimos las props que recibirá el componente.
