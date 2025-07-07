import { z } from "zod";

export const categorySchema = z.object({
	id: z.number(),
	name: z.string(),
	created_at: z.string().datetime(),
	updated_at: z.string().datetime(),
});

export const productSchema = z.object({
	id: z.number(),
	name: z.string(),
	price: z.number(),
	description: z.string(),
	category_id: z.number(),
	stock: z.number(),
	minimumQuantity: z.number(),
	image_url: z.string().url(),
	created_at: z.string().datetime(),
	updated_at: z.string().datetime(),
});

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
