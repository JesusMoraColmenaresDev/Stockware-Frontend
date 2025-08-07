import type { FieldErrors, UseFormRegister } from "react-hook-form"
import type { typeUser } from "../types"

type AuthenticationFormProps = {
    errors: FieldErrors<typeUser>
    register: UseFormRegister<typeUser>
    isSignUp?: boolean
}


export default function AuthenticationForm({errors, register, isSignUp = true} : AuthenticationFormProps) {
    return (
    <>  
            <div className="text-text text-[32px] max-md:text-2xl font-bold text-center">
                {isSignUp ? 'Create Account' : ' Login'}
            </div>
            
            {isSignUp && (
                <div className="flex flex-col">
                    <label className="text-text text-[32px] max-md:text-2xl"  htmlFor="name">Full name</label>
                    <input 
                        id="name"
                        type="text"
                        {...register('name', { required: isSignUp && 'El nombre es obligatorio' })} 
                    className="bg-bg-secondary h-[36px] rounded-lg p-2"
                    />
                    {errors.name?.message && <p>{errors.name.message as string}</p>}
                </div>
            )}

            <div className="flex flex-col">
                <label className="text-text text-[32px] max-md:text-2xl" htmlFor="email">Email</label>
                <input 
                    id="email"
                    type="email"
                    {...register('email', { required: 'El email es obligatorio' })} 
                    className="bg-bg-secondary h-[36px] rounded-lg p-2"
                />
                {errors.email?.message && <p>{errors.email.message as string}</p>}
            </div>

            <div className="flex flex-col">
                <label className="text-text text-[32px] max-md:text-2xl"  htmlFor="password">Password</label>
                <input 
                    id="password"
                    type="password"
                    {...register('password', { required: 'La contraseña es obligatoria' })} 
                    className="bg-bg-secondary h-[36px] rounded-lg p-2"
                />
                {errors.password?.message && <p>{errors.password.message as string}</p>}
            </div>

            {isSignUp && (
                <div className="flex flex-col">
                    <label className="text-text text-[32px] max-md:text-2xl" htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        id="confirmPassword"
                        type="password"
                        {...register('confirmPassword', { 
                            required: isSignUp && 'La confirmación es obligatoria' 
                        })} 
                    className="bg-bg-secondary h-[36px] rounded-lg p-2"
                    />
                    {errors.confirmPassword?.message && <p>{errors.confirmPassword.message as string}</p>}
                </div>
            )}
            <div className="flex justify-center">
                <input 	className="px-[3rem] py-[2px] rounded-lg bg-bg-button-primary  text-bg-secondary font-bold hover:bg-bg-button-secondary text-lg w-fit"  type="submit" value={isSignUp ? 'Sign Up' : 'Login'}/>
            </div>
        
        
    </>
  )
}
