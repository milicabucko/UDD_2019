package com.ebookrepositoryserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ebookrepositoryserver.model.Language;

@Repository
public interface LanguageRepository extends JpaRepository<Language, Long>{

}
