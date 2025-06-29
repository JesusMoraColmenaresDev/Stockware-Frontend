import { useEffect } from "react"
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "./api/productsApi";
import { useForm } from "react-hook-form";

function App() {

  useEffect(() => {
  const obtenerProductos = async() => {
      try{
        const response = await getProducts();
        console.log(response);
      }catch(error){
        console.log(error);
      }
    }
    obtenerProductos()
  },[])


  const {register, handleSubmit, reset,  formState: {errors}} = useForm() 

  const onSubmit = async(data : any) => {
    const formData = new FormData()
    formData.append("product[name]", data.name);
    formData.append("product[price]", data.price);
    formData.append("product[description]", data.description);
    formData.append("product[category_id]", data.category_id);
    formData.append("product[stock]", data.stock);
    formData.append("product[image]", data.image[0]);
    formData.append("product[minimumQuantity]", data.minimumQuantity);

    try{
      //const response = await updateProduct(formData, 5)
      const response = await createProduct(formData)
      console.log(response)
      reset()
    }catch(error){
      console.log(error)
    }
  }

  return (
    
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Nombre del producto</label>
          <input 
            id = "name"
            type="text"
            {...register('name', {required : 'El nombre es Obligatorio'})} 
          />
          {errors.name?.message && <p>{errors.name.message as string}</p>}
        </div>

        <div>
          <label htmlFor="price">Precio del producto</label>
          <input 
            id = "price"
            type="number"
            {...register('price', {required : 'El precio es obligatorio'})} 
          />
          {errors.price?.message && <p>{errors.price.message as string}</p>}
        </div>

        <div>
          <label htmlFor="stock">stock del producto</label>
          <input 
            id = "stock"
            type="number"
            {...register('stock', {required : 'El stock es obligatorio'})} 
          />
          {errors.stock?.message && <p>{errors.stock.message as string}</p>}
        </div>

        <div>
          <label htmlFor="description">Descripcion del producto</label>
          <input 
            id = "description"
            type="text"
            {...register('description', {required : 'La descripcion es obligatoria'})} 
          />
          {errors.description?.message && <p>{errors.description.message as string}</p>}
        </div>

        <div>
          <label htmlFor="category_id">Categoria del producto</label>
          <input 
            id = "category_id"
            type="number"
            {...register('category_id', {required : 'La categoria es obligatoria'})} 
          />
          {errors.category?.message && <p>{errors.category.message as string}</p>}
        </div>

        <div>
          <label htmlFor="minimumQuantity">Cantidad minima</label>
          <input 
            id = "minimumQuantity"
            type="number"
            {...register('minimumQuantity', {required : 'La cantidad minima de stock es obligatoria'})} 
          />
          {errors.category?.message && <p>{errors.category.message as string}</p>}
        </div>

        <div>
          <label htmlFor="image">Imagen del producto</label>
          <input 
            id = "image"
            type="file"
            accept="image/*"
            {...register('image', {required : 'La imagen es obligatoria'})} 
          />
          {errors.image?.message && <p>{errors.image.message as string}</p>}
        </div>

        <input type="submit" />

      </form>
    </>
  )
}

export default App
