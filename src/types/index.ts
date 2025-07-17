import { z } from "zod";

// +
// + Products
// +

export const productSchema = z.object({
	id: z.number().int(),
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

export const productsSchema = z.array(productSchema);

export type ProductType = z.infer<typeof productSchema>;

// export const createProductSchema = productSchema
// 	.pick({
// 		name: true,
// 		price: true,
// 		description: true,
// 		category_id: true,
// 		stock: true,
// 		minimumQuantity: true,
// 	})
// 	.extend({
// 		image: z.instanceof(FileList),
// 	});

// export type createProductType = z.infer<typeof createProductSchema>;

// +
// + Categories
// +

export const categorySchema = z.object({
	id: z.number().int(),
	name: z.string(),
	products_count: z.number().int().min(0), // Verificar que sea un int
	created_at: z.string().datetime(),
	updated_at: z.string().datetime(),
});

export const categoriesSchema = z.array(categorySchema);

export type CategoryType = z.infer<typeof categorySchema>;

// +
// + Users
// +

export const UserSchemaAuth = z.object({
	name: z.string().optional(),
	email: z.string().email(),
	password: z.string().min(6),
	confirmPassword: z.string().optional(),
});

export type typeUser = z.infer<typeof UserSchemaAuth>;

export const userSchema = z.object({
	id: z.union([z.string(), z.number()]),
	name: z.string(),
	email: z.string().email(),
	role: z.string().optional(),
	is_enabled: z.boolean(),
	created_at: z.string(),
});

export const usersSchema = z.array(userSchema);

export type UserType = z.infer<typeof userSchema>;

// +
// + Movements
// +
export const stockMovementSchema = z.object({
	id: z.number().int(),
	product_id: z.number().int(),
	user_id: z.number().int(),
	movement: z.number().int(),
	// created_at: z.string().refine((s) => !isNaN(Date.parse(s)), {
	// 	message: "Invalid ISO date",
	// }),
	created_at: z.string().datetime(),
	updated_at: z.string().datetime(),
});

export type StockMovementType = z.infer<typeof stockMovementSchema>;
export const stockMovementsSchema = z.array(stockMovementSchema);
