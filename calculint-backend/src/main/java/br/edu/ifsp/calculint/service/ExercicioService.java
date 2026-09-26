package br.edu.ifsp.calculint.service;

import br.edu.ifsp.calculint.model.Exercicio;
import br.edu.ifsp.calculint.repository.ExercicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExercicioService {

    private ExercicioRepository exercicioRepository;

    @Autowired
    public void setExercicioRepository(ExercicioRepository exercicioRepository) {
        this.exercicioRepository = exercicioRepository;
    }

    public void salvar(Exercicio exercicio){
        if(exercicio.naoTemResposta()){
            throw new IllegalArgumentException("exercio sem resposta");
        }
        if(exercicio.isValido()){
            exercicioRepository.sa
        }
    }
}
