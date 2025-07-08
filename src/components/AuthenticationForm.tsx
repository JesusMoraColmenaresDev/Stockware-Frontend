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
        {isSignUp && (
            <div>
                <label htmlFor="name">Nombre completo</label>
                <input 
                    id="name"
                    type="text"
                    {...register('name', { required: isSignUp && 'El nombre es obligatorio' })} 
                />
                {errors.name?.message && <p>{errors.name.message as string}</p>}
            </div>
        )}

        <div>
            <label htmlFor="email">Correo electrónico</label>
            <input 
                id="email"
                type="email"
                {...register('email', { required: 'El email es obligatorio' })} 
            />
            {errors.email?.message && <p>{errors.email.message as string}</p>}
        </div>

        <div>
            <label htmlFor="password">Contraseña</label>
            <input 
                id="password"
                type="password"
                {...register('password', { required: 'La contraseña es obligatoria' })} 
            />
            {errors.password?.message && <p>{errors.password.message as string}</p>}
        </div>

        {isSignUp && (
            <div>
                <label htmlFor="confirmPassword">Confirmar contraseña</label>
                <input 
                    id="confirmPassword"
                    type="password"
                    {...register('confirmPassword', { 
                        required: isSignUp && 'La confirmación es obligatoria' 
                    })} 
                />
                {errors.confirmPassword?.message && <p>{errors.confirmPassword.message as string}</p>}
            </div>
        )}
        
        <input type="submit" />
    </>
  )
}
