package lk.gdse.jurneyflex.repository;

import lk.gdse.jurneyflex.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardServiceDao extends JpaRepository<Card, String> {
}
