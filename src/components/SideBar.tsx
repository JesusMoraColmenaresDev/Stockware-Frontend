import { Outlet } from "react-router-dom";
import type { ProductType } from "../types";
import { getProducts } from "../api/productsApi";
import { useEffect, useState } from "react";
import { ProductList } from "./ProductList";

export const SideBar = () => {
	const [productos, setProductos] = useState<ProductType[]>([]);

	useEffect(() => {
		const idk = async () => {
			const test = await getProducts();
			setProductos(test!);
		};
		idk();
	}, []);

	return (
		<>
			<div className="flex">
				<aside className="h-dvh w-3xs bg-bg-nav"></aside>

				<main className="flex-1">
					<Outlet />
					{productos ? (
						productos.map((prod) => (
							<div className="flex pl-[2rem] bg-bg-main" key={prod.id}>
								<div>{prod.name}</div>
								<img src={prod.image_url} className="h-[2rem] w-auto" />
							</div>
						))
					) : (
						<p className="">Error</p>
					)}
					<div>
						<ProductList />
					</div>
				</main>
			</div>
		</>
	);
};
