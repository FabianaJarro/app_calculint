package br.edu.ifsp.calculint.service;

import org.springframework.stereotype.Service;
import java.util.Random;

@Service
public class ExercicioService {

    private final Random random = new Random();

    public int gerarNumero(int minimo, int maximo) {
        return random.nextInt(maximo - minimo + 1) + minimo; //
    }

    public String gerarAdicao() {
        int numero1 = gerarNumero(1, 10);
        int numero2 = gerarNumero(1, 10);

        return "Quanto é " + numero1 + " + " + numero2 + "?";
    }
}
