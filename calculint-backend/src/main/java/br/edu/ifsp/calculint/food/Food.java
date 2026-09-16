package br.edu.ifsp.calculint.food;

import lombok.*;
import jakarta.persistence.*;

@Table(name="foods")
@Entity(name="foods")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of="id")

public class Food {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String image;
    private String price;

    public Food(FoodRequestDTO data){
        this.title=data.title();
        this.image=data.image();
        this.price=data.price();

    }
}
