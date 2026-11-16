export type Nivel = "BASICO" | "INTERMEDIARIO" | "AVANCADO";

export interface LoginResponse{
    name: string,
    token: string, 
    nivelAtual: Nivel | null
    
}