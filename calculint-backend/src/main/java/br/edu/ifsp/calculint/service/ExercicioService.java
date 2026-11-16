
package br.edu.ifsp.calculint.service;

import br.edu.ifsp.calculint.dto.ExercicioGeradoDTO;
import br.edu.ifsp.calculint.model.Nivel;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
public class ExercicioService {

    private final Random random = new Random();

    public int gerarNumero(int minimo, int maximo) {
        return random.nextInt(maximo - minimo + 1) + minimo;
    }

    public List<ExercicioGeradoDTO> gerarLista(
            Nivel nivel,
            String operacao,
            String modulo
    ) {
        String op = operacao.toLowerCase(Locale.ROOT);

        if (!Set.of(
                "adicao", "subtracao",
                "multiplicacao", "divisao"
        ).contains(op)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Operação inválida"
            );
        }

        if (nivel == Nivel.BASICO && op.equals("adicao")) {
            return switch (modulo) {
                case "objetos" -> exerciciosObjetosAdicao();
                case "reta" -> exerciciosRetaNumerica();

                default -> throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Módulo inválido"
                );
            };
        }

        List<ExercicioGeradoDTO> exercicios = new ArrayList<>();

        for (int i = 0; i < 4; i++) {
            exercicios.add(gerarExercicio(nivel, op));
        }

        return exercicios;
    }

    private ExercicioGeradoDTO gerarExercicio(
            Nivel nivel,
            String operacao
    ) {
        int a, b, resposta;
        String simbolo;

        switch (operacao) {
            case "adicao" -> {
                a = gerarNumero(
                        nivel == Nivel.BASICO ? 1 : 10,
                        nivel == Nivel.AVANCADO ? 150 :
                                nivel == Nivel.INTERMEDIARIO ? 40 : 4
                );
                b = gerarNumero(
                        nivel == Nivel.BASICO ? 1 : 10,
                        nivel == Nivel.AVANCADO ? 150 :
                                nivel == Nivel.INTERMEDIARIO ? 40 : 4
                );

                resposta = a + b;
                simbolo = "+";
            }

            case "subtracao" -> {
                a = gerarNumero(
                        nivel == Nivel.BASICO ? 2 : 30,
                        nivel == Nivel.AVANCADO ? 200 : 60
                );
                b = gerarNumero(1, a);

                resposta = a - b;
                simbolo = "-";
            }

            case "multiplicacao" -> {
                a = gerarNumero(
                        nivel == Nivel.BASICO ? 1 : 2,
                        nivel == Nivel.AVANCADO ? 15 :
                                nivel == Nivel.INTERMEDIARIO ? 9 : 5
                );
                b = gerarNumero(
                        nivel == Nivel.BASICO ? 1 : 2,
                        nivel == Nivel.AVANCADO ? 20 :
                                nivel == Nivel.INTERMEDIARIO ? 9 : 5
                );

                resposta = a * b;
                simbolo = "×";
            }

            case "divisao" -> {
                b = gerarNumero(
                        2,
                        nivel == Nivel.BASICO ? 5 :
                                nivel == Nivel.INTERMEDIARIO ? 9 : 12
                );

                int quociente = gerarNumero(
                        nivel == Nivel.BASICO ? 1 : 2,
                        nivel == Nivel.BASICO ? 5 :
                                nivel == Nivel.INTERMEDIARIO ? 12 : 25
                );

                a = b * quociente;
                resposta = quociente;
                simbolo = "÷";
            }

            default -> throw new IllegalArgumentException(
                    "Operação inválida"
            );
        }

        String enunciado = criarEnunciado(
                nivel, operacao, a, b
        );

        String objeto =
                nivel == Nivel.BASICO &&
                        operacao.equals("adicao")
                        ? "MACA"
                        : null;

        List<Integer> alternativas =
                gerarAlternativas(resposta);

        return new ExercicioGeradoDTO(
                enunciado,
                a,
                b,
                simbolo,
                objeto,
                alternativas,
                resposta
        );
    }

    private String criarEnunciado(
            Nivel nivel,
            String operacao,
            int a,
            int b
    ) {
        if (nivel == Nivel.BASICO) {
            return switch (operacao) {
                case "adicao" ->
                        "Quantas maçãs há ao todo?";
                case "subtracao" ->
                        "Você tem " + a + " objetos e retira "
                                + b + ". Quantos sobram?";
                case "multiplicacao" ->
                        "Quanto é " + a + " × " + b + "?";
                case "divisao" ->
                        "Divida " + a + " objetos igualmente "
                                + "em " + b + " grupos. Quantos em cada?";
                default -> throw new IllegalArgumentException();
            };
        }

        if (nivel == Nivel.INTERMEDIARIO) {
            return switch (operacao) {
                case "adicao" ->
                        "Uma caixa tem " + a + " lápis e outra tem "
                                + b + ". Quantos lápis há ao todo?";
                case "subtracao" ->
                        "Você tinha " + a + " figurinhas e deu "
                                + b + ". Quantas sobraram?";
                case "multiplicacao" ->
                        "Há " + a + " caixas com " + b
                                + " objetos em cada. Quantos objetos há?";
                case "divisao" ->
                        a + " objetos serão divididos igualmente "
                                + "entre " + b + " pessoas. Quantos cada uma recebe?";
                default -> throw new IllegalArgumentException();
            };
        }

        return switch (operacao) {
            case "adicao" ->
                    "Uma pessoa gastou R$ " + a + " e depois R$ "
                            + b + ". Quanto gastou ao todo?";
            case "subtracao" ->
                    "Você tinha R$ " + a + " e gastou R$ "
                            + b + ". Quanto restou?";
            case "multiplicacao" ->
                    "Um ingresso custa R$ " + b + ". Quanto custam "
                            + a + " ingressos?";
            case "divisao" ->
                    "Uma compra de R$ " + a + " foi dividida em "
                            + b + " parcelas iguais. Quanto vale cada parcela?";
            default -> throw new IllegalArgumentException();
        };
    }

    private List<Integer> gerarAlternativas(int correta) {
        Set<Integer> opcoes = new HashSet<>();
        opcoes.add(correta);

        while (opcoes.size() < 4) {
            int variacao = gerarNumero(-4, 4);
            int alternativa = correta + variacao;

            if (alternativa >= 0) {
                opcoes.add(alternativa);
            }
        }

        List<Integer> alternativas = new ArrayList<>(opcoes);
        Collections.shuffle(alternativas);

        return alternativas;
    }


    private List<ExercicioGeradoDTO> exerciciosObjetosAdicao() {
        return List.of(
                new ExercicioGeradoDTO(
                        "Quantas maçãs há ao todo?",
                        2,
                        3,
                        "+",
                        "MACA",
                        List.of(4, 5, 6, 7),
                        5
                ),

                new ExercicioGeradoDTO(
                        "Quantos lápis há ao todo?",
                        3,
                        1,
                        "+",
                        "LAPIS",
                        List.of(3, 4, 5, 6),
                        4
                ),

                new ExercicioGeradoDTO(
                        "Quantas flores há ao todo?",
                        2,
                        2,
                        "+",
                        "FLOR",
                        List.of(3, 4, 5, 6),
                        4
                ),

                new ExercicioGeradoDTO(
                        "Quantas bolinhas há ao todo?",
                        4,
                        1,
                        "+",
                        "BOLINHA",
                        List.of(3, 4, 5, 6),
                        5
                )
        );
    }


    private List<ExercicioGeradoDTO> exerciciosRetaNumerica() {
        return List.of(
                new ExercicioGeradoDTO(
                        "Comece no 1 e avance 2 casas. Onde você chega?",
                        1, 2, "+", "RETA",
                        List.of(2, 3, 4, 5),
                        3
                ),

                new ExercicioGeradoDTO(
                        "Comece no 2 e avance 3 casas. Onde você chega?",
                        2, 3, "+", "RETA",
                        List.of(4, 5, 6, 7),
                        5
                ),

                new ExercicioGeradoDTO(
                        "Comece no 4 e avance 2 casas. Onde você chega?",
                        4, 2, "+", "RETA",
                        List.of(5, 6, 7, 8),
                        6
                ),

                new ExercicioGeradoDTO(
                        "Comece no 3 e avance 4 casas. Onde você chega?",
                        3, 4, "+", "RETA",
                        List.of(6, 7, 8, 9),
                        7
                )
        );
    }


}
