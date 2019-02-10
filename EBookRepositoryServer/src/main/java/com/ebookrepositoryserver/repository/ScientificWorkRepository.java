package com.ebookrepositoryserver.repository;

import java.util.List;

import com.ebookrepositoryserver.model.ScientificWork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ScientificWorkRepository extends JpaRepository<ScientificWork, Long>{
	
	ScientificWork findEBookById(Long id);
	
	ScientificWork findEBookByFilename(String filename);

	@Query("Select eb from ScientificWork eb where eb.user.id = ?1")
	List<ScientificWork> findEBookByUser(Long id);
	
}
