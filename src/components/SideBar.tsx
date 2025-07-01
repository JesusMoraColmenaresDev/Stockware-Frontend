import { Outlet } from "react-router-dom";
import type { ProductType } from "../types";
import { getProducts } from "../api/productsApi";
import { useEffect, useState } from "react";

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
				<aside className="h-dvh w-3xs bg-[#2C3E50]"></aside>

				<main className="flex-1">
					<Outlet />
					{productos ? (
						productos.map((prod) => (
							<div className="flex pl-[2rem]">
								<div>{prod.name}</div>
								<img src={prod.image_url} className="h-[5rem] w-auto" />
							</div>
						))
					) : (
						<p className="">Error</p>
					)}
				</main>
			</div>
		</>
	);
};
