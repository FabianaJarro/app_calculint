
package br.edu.ifsp.calculint.service;

import br.edu.ifsp.calculint.dto.ExercicioGeradoDTO;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Component
public class GeradorCotidiano {

    private final Random random = new Random();

    private int numero(int min, int max) {
        return random.nextInt(max - min + 1) + min;
    }

    private int escolher(int[] valores) {
        return valores[random.nextInt(valores.length)];
    }

    private String reais(int centavos) {
        return String.format(
                Locale.forLanguageTag("pt-BR"),
                "R$ %.2f",
                centavos / 100.0
        );
    }

    private List<Integer> alternativas(int correta, int passo) {
        Set<Integer> opcoes = new LinkedHashSet<>();
        opcoes.add(correta);

        for (int i = 1; opcoes.size() < 4; i++) {
            int menor = correta - i * passo;

            if (menor >= 0) {
                opcoes.add(menor);
            }

            if (opcoes.size() < 4) {
                opcoes.add(correta + i * passo);
            }
        }

        List<Integer> resultado = new ArrayList<>(opcoes);
        Collections.shuffle(resultado);
        return resultado;
    }

    public List<ExercicioGeradoDTO> gerar(String modulo) {
        if (modulo == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Módulo não informado"
            );
        }

        String id = modulo.trim().toLowerCase(Locale.ROOT);

        List<ExercicioGeradoDTO> lista = new ArrayList<>();

        for (int i = 0; i < 5; i++) {
            ExercicioGeradoDTO exercicio = switch (id) {
                case "dinheiro" -> gerarDinheiro();
                case "troco" -> gerarTroco();
                case "medidas" -> gerarMedidas();
                case "compras" -> gerarCompras();

                default -> throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Módulo do cotidiano inválido"
                );
            };

            lista.add(exercicio);
        }

        return lista;
    }

    // 1. RECONHECER E SOMAR DINHEIRO
    private ExercicioGeradoDTO gerarDinheiro() {
        int nota = escolher(new int[]{
                500, 1000, 2000
        });

        int moeda = escolher(new int[]{
                25, 50, 100, 200
        });

        int resposta = nota + moeda;

        return new ExercicioGeradoDTO(
                "Você tem " + reais(nota) +
                        " e mais " + reais(moeda) +
                        ". Qual é o total?",
                nota,
                moeda,
                "+",
                "DINHEIRO",
                alternativas(resposta, 50),
                resposta
        );
    }

    // 2. DINHEIRO E TROCO
    private ExercicioGeradoDTO gerarTroco() {
        int preco = escolher(new int[]{
                350, 750, 1200, 2300, 2750
        });

        List<Integer> pagamentos = new ArrayList<>();

        for (int valor : new int[]{
                1000, 2000, 5000, 10000
        }) {
            if (valor > preco) {
                pagamentos.add(valor);
            }
        }

        int pago = pagamentos.get(
                random.nextInt(pagamentos.size())
        );

        int resposta = pago - preco;

        return new ExercicioGeradoDTO(
                "Uma compra custa " + reais(preco) +
                        ". Você paga com " + reais(pago) +
                        ". Quanto recebe de troco?",
                pago,
                preco,
                "-",
                "TROCO",
                alternativas(resposta, 50),
                resposta
        );
    }

    // 3. MEDIDAS
    private ExercicioGeradoDTO gerarMedidas() {
        int capacidade = escolher(new int[]{
                250, 500, 750, 1000
        });

        int quantidade = numero(2, 4);
        int resposta = capacidade * quantidade;

        return new ExercicioGeradoDTO(
                "Você tem " + quantidade +
                        " recipientes de " + capacidade +
                        " mL cada. Quantos mililitros há ao todo?",
                capacidade,
                quantidade,
                "×",
                "MEDIDAS",
                alternativas(resposta, 250),
                resposta
        );
    }

    // 4. COMPRAS E TROCO
    private ExercicioGeradoDTO gerarCompras() {
        int precoUnitario = escolher(new int[]{
                250, 500, 750, 1200, 2000
        });

        int quantidade = numero(2, 4);
        int total = precoUnitario * quantidade;

        // Arredonda o pagamento para cima
        int pago = ((total + 999) / 1000) * 1000 + 1000;

        int resposta = pago - total;

        return new ExercicioGeradoDTO(
                quantidade + " produtos custam " +
                        reais(precoUnitario) + " cada. " +
                        "Você paga com " + reais(pago) +
                        ". Qual é o troco?",
                pago,
                total,
                "-",
                "COMPRAS",
                alternativas(resposta, 50),
                resposta
        );
    }
}
