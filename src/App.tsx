import { useEffect } from "react"
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "./api/productsApi";
import { useForm } from "react-hook-form";

function App() {

  useEffect(() => {
  const obtenerProductos = async() => {
      try{
        const response = await getProduct(7);
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
    formData.append("product[category]", data.category);
    formData.append("product[image]", data.image[0]);

    try{
      //const response = await updateProduct(formData, 5)
      const response = await deleteProduct(4)
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
          <label htmlFor="description">Descripcion del producto</label>
          <input 
            id = "description"
            type="text"
            {...register('description', {required : 'La descripcion es obligatoria'})} 
          />
          {errors.description?.message && <p>{errors.description.message as string}</p>}
        </div>

        <div>
          <label htmlFor="category">Categoria del producto</label>
          <input 
            id = "category"
            type="text"
            {...register('category', {required : 'La categoria es obligatoria'})} 
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
