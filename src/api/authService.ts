import { isAxiosError } from "axios";
import type { typeUser } from "../types";
import api from "./axiosConfig";

export const register = async(data : typeUser) => {
    
    try{
        const response = await api.post("/users", 
        {
            user: {
                name: data.name,
                email: data.email,
                password: data.password,
                password_confirmation: data.confirmPassword
            } 
        })
        if(response.status === 201){
            console.log("successful registration", response.data)
        }else{
            console.log("unexpected error in the registry", response.status)
        }
    } catch (error) {
        if (isAxiosError(error)) {
          console.error('Error en registro:', error.response?.data);
        } else {
          console.error('Error inesperado:', error);
        }
    }
}

export const login = async(data : typeUser) => {
    try{
        const response = await api.post("/users/sign_in", {
            user: {
                email: data.email,
                password: data.password
            }
        },{headers: { 'Content-Type': 'application/json' }})

        if(response.status === 200){
            if (response.headers['authorization']) {
                const token = response.headers['authorization'].split(' ')[1];
                localStorage.setItem('jwt', token);
                console.log("successful loginnnnnnnnnnnn", response.data)
            }  
            
            console.log("successful login", response)
        }else{
                console.log("unexpected error in the login", response.status)
        }

    } catch (error) {
        if (isAxiosError(error)) {
          console.error('Error en login: ', error.response?.data);
        } else {
          console.error('Error inesperado:', error);
        }
    }
}

export const logout = async() => {

    try {
        const token = localStorage.getItem("jwt");
        const response = await api.delete("/users/sign_out", {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        if(response.status === 200){
            localStorage.removeItem('jwt');
        }

    }catch(error){
        console.log("error in closing session")
    }

}