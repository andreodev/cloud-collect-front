import apiService from "@/service/api.service";

export const useSignUp = () => {
    const signUp = async (body: { name: string; email: string; cpf: string; password: string }) => {
        console.log("Criando usuário:", body)
        const response = await apiService.post("/user", body);
        console.log("Resposta da API:", response)
        return response;
    }

    return { signUp };
}