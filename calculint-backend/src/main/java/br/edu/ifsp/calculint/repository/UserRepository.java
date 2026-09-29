package br.edu.ifsp.calculint.repository;

import br.edu.ifsp.calculint.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository <User, String>{
    Optional<User> findByEmail(String email);

}
//entidade que o usario vai manipular e o tipo do Id em <>