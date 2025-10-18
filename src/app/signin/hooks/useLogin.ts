import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser, fetchCurrentUser, clearError } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { isLoading, error, isAuthenticated, user } = useAppSelector((state) => state.auth);

    const signIn = async (credentials: { email: string; password: string }) => {
        try {
            // Faz o login e armazena o token no cookie
            const result = await dispatch(loginUser(credentials)).unwrap();
            
            console.log('Login bem-sucedido:', result);
            
            // Busca os dados completos do usuário na rota /user/me
            await dispatch(fetchCurrentUser()).unwrap();
            
            console.log('Dados do usuário carregados com sucesso');
            
            // Redireciona para o dashboard após login bem-sucedido
            router.push('/');
            
            return result;
        } catch (error) {
            console.error('Erro no login:', error);
            // O erro já está sendo tratado no Redux state
            throw error;
        }
    };

    const clearLoginError = () => {
        dispatch(clearError());
    };

    return {
        signIn,
        isLoading,
        error,
        isAuthenticated,
        user,
        clearLoginError,
    };
};

