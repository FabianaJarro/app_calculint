
package br.edu.ifsp.calculint.service;

import br.edu.ifsp.calculint.dto.ExercicioGeradoDTO;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class GeradorIntermediario {

    private final Random random = new Random();

    private int numero(int minimo, int maximo) {
        return random.nextInt(maximo - minimo + 1) + minimo;
    }

    // Exemplo: 25 representa 2,5.
    private String decimal(int valor) {
        return String.format(
                Locale.forLanguageTag("pt-BR"),
                "%.1f",
                valor / 10.0
        );
    }

    // Exemplo: 550 representa R$ 5,50.
    private String dinheiro(int centavos) {
        return String.format(
                Locale.forLanguageTag("pt-BR"),
                "R$ %.2f",
                centavos / 100.0
        );
    }

    private List<Integer> alternativas(
            int correta,
            int passo
    ) {
        Set<Integer> opcoes = new LinkedHashSet<>();
        opcoes.add(correta);

        int distancia = 1;

        while (opcoes.size() < 4) {
            int menor = correta - distancia * passo;
            int maior = correta + distancia * passo;

            if (menor >= 0) {
                opcoes.add(menor);
            }

            opcoes.add(maior);
            distancia++;
        }

        List<Integer> lista = new ArrayList<>(opcoes);
        Collections.shuffle(lista);

        return lista;
    }

    public List<ExercicioGeradoDTO> gerar(String operacao) {

        if (!operacao.equals("adicao")
                && !operacao.equals("subtracao")) {
            throw new IllegalArgumentException(
                    "Operação intermediária inválida"
            );
        }

        List<ExercicioGeradoDTO> lista = new ArrayList<>();

        // Duas questões com uma casa decimal
        lista.add(gerarDecimal(operacao));
        lista.add(gerarDecimal(operacao));

        // Duas questões com valores monetários
        lista.add(gerarDinheiro(operacao));
        lista.add(gerarDinheiro(operacao));

        return lista;
    }

    private ExercicioGeradoDTO gerarDecimal(
            String operacao
    ) {
        int a;
        int b;
        int resposta;
        String simbolo;
        String enunciado;

        if (operacao.equals("adicao")) {
            a = numero(12, 75);
            b = numero(11, 49);

            resposta = a + b;
            simbolo = "+";

            enunciado = "Quanto é " + decimal(a)
                    + " + " + decimal(b) + "?";

        } else {
            a = numero(40, 95);
            b = numero(11, a - 10);

            resposta = a - b;
            simbolo = "-";

            enunciado = "Quanto é " + decimal(a)
                    + " − " + decimal(b) + "?";
        }

        return new ExercicioGeradoDTO(
                enunciado,
                a,
                b,
                simbolo,
                "DECIMAL",
                alternativas(resposta, 5),
                resposta
        );
    }

    private ExercicioGeradoDTO gerarDinheiro(
            String operacao
    ) {
        int a;
        int b;
        int resposta;
        String simbolo;
        String enunciado;

        if (operacao.equals("adicao")) {

            a = numero(4, 15) * 100
                    + numero(0, 3) * 25;

            b = numero(2, 9) * 100
                    + numero(0, 3) * 25;

            resposta = a + b;
            simbolo = "+";

            enunciado =
                    "Um caderno custa " + dinheiro(a)
                            + " e uma caneta custa " + dinheiro(b)
                            + ". Quanto custam juntos?";

        } else {

            a = numero(2, 5) * 1000;

            b = numero(5, 15) * 100
                    + numero(0, 3) * 25;

            resposta = a - b;
            simbolo = "-";

            enunciado =
                    "Você tem " + dinheiro(a)
                            + " e compra um produto de "
                            + dinheiro(b)
                            + ". Quanto dinheiro sobra?";
        }

        return new ExercicioGeradoDTO(
                enunciado,
                a,
                b,
                simbolo,
                "DINHEIRO_DECIMAL",
                alternativas(resposta, 25),
                resposta
        );
    }
}
