package br.edu.ifsp.calculint.dto;

import br.edu.ifsp.calculint.food.Food;

public record FoodResponseDTO (Long id, String title, String image, String price){
    public FoodResponseDTO(Food food){
        this(food.getId(), food.getTitle(), food.getImage(), food.getPrice() );
    }

}
