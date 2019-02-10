package com.ebookrepositoryserver.service;

import java.util.List;

import com.ebookrepositoryserver.model.Language;

public interface LanguageService {
	
	List<Language> findAllLanguages();
	
	Language findOneLanguage(Long id);
	
}
