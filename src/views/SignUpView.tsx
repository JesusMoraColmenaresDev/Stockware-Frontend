import { useForm } from "react-hook-form";
import { UserSchemaAuth, type typeUser } from "../types";
import { zodResolver } from '@hookform/resolvers/zod';
import { register as registerUser } from "../api/authService";
import AuthenticationForm from "../components/AuthenticationForm";
import { useNavigate } from "react-router-dom";

export default function SignUpView() {
    const {register, handleSubmit, reset,  formState: {errors}} = useForm<typeUser>({
    resolver: zodResolver(UserSchemaAuth),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }) 

  const navigate = useNavigate()

  const onSubmit = async (data : typeUser) => {

    try{
      await registerUser(data)
      reset();
      navigate("/login");
    }catch(error){
      console.log(error)
    }

  }
  
  return (
    <>
      <div className="bg-bg-secondary h-screen w-screen flex items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-bg-main min-w-1/3 flex flex-col px-[36px] py-[48px] gap-[48px] rounded-lg">
          <AuthenticationForm errors = {errors} register={register} isSignUp = {true}></AuthenticationForm>
        </form>
      </div>
    </>

  )
}
