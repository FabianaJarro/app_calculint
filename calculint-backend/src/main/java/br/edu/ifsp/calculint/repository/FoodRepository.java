package br.edu.ifsp.calculint.repository;

import br.edu.ifsp.calculint.food.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food, Long>{
}