"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import React, { useState } from "react"
import { Toaster } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { formatCPF } from "@/app/utils/formart_cpf"
import { useConfetti } from "@/hooks/useConfetti"
import { useFormToast } from "@/hooks/useFormToast"
import { useSignUp } from "@/app/login/hooks/useCreate"
import { schema } from "@/DTO/user.dto"



export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const router = useRouter()
  const { celebrate } = useConfetti()
  const { showSuccess, showError } = useFormToast()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    password: "",
    confirmPassword: ""
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const { signUp } = useSignUp()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "cpf") {
      const formattedCPF = formatCPF(value);
      setFormData({...formData, [id]: formattedCPF});
    } else {
      setFormData({...formData, [id]: value});
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const result = schema.safeParse(formData)
    if (!result.success) {
       const fieldErrors: Record<string, string> = {}
         result.error.issues.forEach((err) => {
          const key = err.path[0] as string | undefined
                if (key) {
                  fieldErrors[key] = err.message
                  showError(err.message)
                }
             })
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    
    try {
      const cleanCPF = formData.cpf.replace(/\D/g, "");
      
      const userData = {
        name: formData.name,
        email: formData.email, 
        cpf: cleanCPF, 
        password: formData.password 
      }
      
      console.log("Dados sendo enviados:", userData)
      
      await signUp(userData)
      
      celebrate()
      
      showSuccess("Conta criada com sucesso!")
      
      console.log("Form data is valid:", result.data)

      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (error: unknown) {
      console.error("Erro ao criar conta:", error)
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } }
        console.error("Detalhes do erro:", axiosError.response?.data)
        
        const errorMessage = axiosError.response?.data?.message || "Erro ao criar conta. Tente novamente."
        showError(errorMessage)
      } else {
        showError("Erro ao criar conta. Tente novamente.")
      }
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Toaster />
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Crie sua conta</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Insira seu email abaixo para criar sua conta
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <FieldDescription className="text-red-500">
                    {errors.email}
                  </FieldDescription>
                )}
                {!errors.email && (
                  <FieldDescription>
                    Usaremos isso para entrar em contato com você. Não compartilharemos seu e-mail com ninguém.
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="name">Nome</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <FieldDescription className="text-red-500">
                    {errors.name}
                  </FieldDescription>
                )}
                
              </Field>
              <Field>
                <FieldLabel htmlFor="cpf">CPF</FieldLabel>
                <Input
                  id="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  required
                  value={formData.cpf}
                  onChange={handleChange}
                  className={errors.cpf ? "border-red-500" : ""}
                />
                {errors.cpf && (
                  <FieldDescription className="text-red-500">
                    {errors.cpf}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Senha</FieldLabel>
                    <Input 
                      id="password" 
                      type="password" 
                      required 
                      value={formData.password} 
                      onChange={handleChange}
                      className={errors.password ? "border-red-500" : ""}
                    />
                    {errors.password && (
                      <FieldDescription className="text-red-500 text-xs">
                        {errors.password}
                      </FieldDescription>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirme sua senha
                    </FieldLabel>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      required 
                      value={formData.confirmPassword} 
                      onChange={handleChange}
                      className={errors.confirmPassword ? "border-red-500" : ""}
                    />
                    {errors.confirmPassword && (
                      <FieldDescription className="text-red-500 text-xs">
                        {errors.confirmPassword}
                      </FieldDescription>
                    )}
                  </Field>
                </Field>
                {!errors.password && !errors.confirmPassword && (
                  <FieldDescription>
                    Deve ter pelo menos 8 caracteres.
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer transition-all duration-300 ease-in-out">Criar conta</Button>
              </Field>
              <FieldDescription className="text-center">
                Já tem uma conta? <a href="/login" className="hover:text-blue-400">Entrar</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block h-64 md:h-auto">
            <Image
              src="https://i.pinimg.com/1200x/9d/35/dc/9d35dc538ce5f3e9c347846e0d86c118.jpg"
              alt="Image"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
