
package br.edu.ifsp.calculint.service;

import br.edu.ifsp.calculint.dto.ExercicioGeradoDTO;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class GeradorBasico {

    private final Random random = new Random();

    private int numero(int minimo, int maximo) {
        return random.nextInt(maximo - minimo + 1) + minimo;
    }

    // Cria quatro alternativas diferentes
    private List<Integer> alternativas(int correta) {
        List<Integer> possibilidades = new ArrayList<>();

        for (int n = Math.max(0, correta - 5);
             n <= correta + 5; n++) {
            if (n != correta) {
                possibilidades.add(n);
            }
        }

        Collections.shuffle(possibilidades);

        List<Integer> opcoes = new ArrayList<>();
        opcoes.add(correta);
        opcoes.addAll(possibilidades.subList(0, 3));

        Collections.shuffle(opcoes);
        return opcoes;
    }

    // 1. ADIÇÃO COM OBJETOS
    public List<ExercicioGeradoDTO> adicaoObjetos() {
        String[] objetos = {
                "MACA", "LAPIS", "FLOR", "BOLINHA"
        };

        String[] perguntas = {
                "Quantas maçãs há ao todo?",
                "Quantos lápis há ao todo?",
                "Quantas flores há ao todo?",
                "Quantas bolinhas há ao todo?"
        };

        List<ExercicioGeradoDTO> lista = new ArrayList<>();

        for (int i = 0; i < objetos.length; i++) {
            int a = numero(1, 4);
            int b = numero(1, 4);
            int resposta = a + b;

            lista.add(new ExercicioGeradoDTO(
                    perguntas[i],
                    a, b, "+", objetos[i],
                    alternativas(resposta),
                    resposta
            ));
        }

        return lista;
    }

    // 2. ADIÇÃO NA RETA NUMÉRICA
    public List<ExercicioGeradoDTO> adicaoReta() {
        List<ExercicioGeradoDTO> lista = new ArrayList<>();

        for (int i = 0; i < 4; i++) {
            int inicio = numero(1, 5);
            int passos = numero(1, 4);
            int resposta = inicio + passos;

            String pergunta =
                    "Comece no " + inicio +
                            " e avance " + passos +
                            " casas. Onde você chega?";

            lista.add(new ExercicioGeradoDTO(
                    pergunta,
                    inicio, passos, "+", "RETA",
                    alternativas(resposta),
                    resposta
            ));
        }

        return lista;
    }


    public List<ExercicioGeradoDTO> completarDez() {

        List<ExercicioGeradoDTO> lista = new ArrayList<>();

        List<Integer> quantidades = new ArrayList<>(
                List.of(1, 2, 3, 4, 5, 6, 7, 8, 9)
        );

        Collections.shuffle(quantidades);

        for (int i = 0; i < 4; i++) {

            int preenchidos = quantidades.get(i);
            int faltam = 10 - preenchidos;

            lista.add(new ExercicioGeradoDTO(
                    "Quantas bolinhas faltam para completar 10?",
                    preenchidos,
                    faltam,
                    "+",
                    "QUADRO10",
                    alternativas(faltam),
                    faltam
            ));
        }

        return lista;
    }


    // 3. SUBTRAÇÃO COM OBJETOS
    public List<ExercicioGeradoDTO> subtracaoObjetos() {
        String[] objetos = {
                "MACA", "LAPIS", "FLOR", "BOLINHA"
        };

        String[] nomes = {
                "maçãs", "lápis", "flores", "bolinhas"
        };

        String[] perguntas = {
                "Quantas sobraram?",
                "Quantos sobraram?",
                "Quantas sobraram?",
                "Quantas sobraram?"
        };

        List<ExercicioGeradoDTO> lista = new ArrayList<>();

        for (int i = 0; i < objetos.length; i++) {
            int total = numero(4, 9);
            int retirados = numero(1, Math.min(4, total - 1));
            int resposta = total - retirados;

            String pergunta =
                    "Havia " + total + " " + nomes[i] +
                            ". Tiramos " + retirados + ". " +
                            perguntas[i];

            lista.add(new ExercicioGeradoDTO(
                    pergunta,
                    total, retirados, "-", objetos[i],
                    alternativas(resposta),
                    resposta
            ));
        }

        return lista;
    }


    // 4. ADIÇÃO COM DEZENAS E UNIDADES
    public List<ExercicioGeradoDTO> adicaoDezenas() {

        List<ExercicioGeradoDTO> lista = new ArrayList<>();

        // Progressão de dificuldade baseada no Figma
        int[] dezenasA = {1, 1, 2, 3};
        int[] dezenasB = {0, 1, 1, 2};

        for (int i = 0; i < 4; i++) {


            int unidadesA = numero(1, 4);
            int unidadesB = numero(
                    1,
                    Math.min(5, 9 - unidadesA)
            );

            int a = dezenasA[i] * 10 + unidadesA;
            int b = dezenasB[i] * 10 + unidadesB;

            //aqui calcula o resultado
            int resposta = a + b;

            String enunciado =
                    "Quanto é " + a + " + " + b + "?";

            lista.add(new ExercicioGeradoDTO(
                    enunciado,
                    a,
                    b,
                    "+",
                    "DEZENAS",
                    alternativas(resposta),
                    resposta
            ));
        }

        return lista;
    }


    // MULTIPLICAÇÃO - 1/4: GRUPOS IGUAIS
    public List<ExercicioGeradoDTO> multiplicacaoGrupos() {

        List<ExercicioGeradoDTO> lista = new ArrayList<>();

        for (int i = 0; i < 4; i++) {

            int grupos = numero(2, 4);
            int objetosPorGrupo = numero(2, 4);

            int resposta = grupos * objetosPorGrupo;

            String pergunta =
                    "Há " + grupos + " grupos com " +
                            objetosPorGrupo + " objetos em cada. " +
                            "Quantos objetos existem ao todo?";

            lista.add(new ExercicioGeradoDTO(
                    pergunta,
                    grupos,
                    objetosPorGrupo,
                    "×",
                    "MULT_GRUPOS",
                    alternativas(resposta),
                    resposta
            ));
        }

        return lista;
    }


}
