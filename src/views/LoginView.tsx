import { useForm } from "react-hook-form";
import { UserSchemaAuth, type typeUser } from "../types";
import { zodResolver } from '@hookform/resolvers/zod';
import api from "../api/axiosConfig";
import { isAxiosError } from "axios";
import AuthenticationForm from "../components/AuthenticationForm";
import { login } from "../api/authService";
import { useNavigate } from "react-router-dom";

export default function LoginView() {
    const {register, handleSubmit, reset,  formState: {errors}} = useForm<typeUser>({
    resolver: zodResolver(UserSchemaAuth),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }) 
  
  const navigate = useNavigate();
  const onSubmit = async (data : typeUser) => {

    try{
      await login(data)
      reset()
      navigate("/");
    }catch(error){
      console.log(error)
    }

  }
  
  return (
    <>
      <div className="bg-bg-secondary h-screen w-screen flex items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-bg-main min-w-1/3 flex flex-col px-[36px] py-[48px] gap-[48px] rounded-lg ">
          <AuthenticationForm errors = {errors} register={register} isSignUp = {false}></AuthenticationForm>
        </form>
      </div>
    </>

  )
}
