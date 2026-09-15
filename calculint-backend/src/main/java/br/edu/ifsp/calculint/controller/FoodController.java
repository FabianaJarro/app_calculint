package br.edu.ifsp.calculint.controller;

import br.edu.ifsp.calculint.food.Food;
import br.edu.ifsp.calculint.food.FoodRepository;
import br.edu.ifsp.calculint.food.FoodRequestDTO;
import br.edu.ifsp.calculint.food.FoodResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("food")
public class FoodController {

    @Autowired
    private FoodRepository repository;
    
    @GetMapping
    public List<FoodResponseDTO> getAll(){
        List<FoodResponseDTO> foodList = repository.findAll().stream().map(FoodResponseDTO::new).collect(Collectors.toList());
        return foodList;
    }

    @PostMapping
    public void saveFood (@RequestBody FoodRequestDTO data){
        Food foodData=new Food(data);
        repository.save(foodData);
        return;
    }

}