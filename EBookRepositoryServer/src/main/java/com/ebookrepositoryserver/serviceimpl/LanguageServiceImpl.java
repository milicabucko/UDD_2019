package com.ebookrepositoryserver.serviceimpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ebookrepositoryserver.model.Language;
import com.ebookrepositoryserver.repository.LanguageRepository;
import com.ebookrepositoryserver.service.LanguageService;

@Service
public class LanguageServiceImpl implements LanguageService {
	
	private final LanguageRepository languageRepository;
	
	public LanguageServiceImpl(LanguageRepository languageRepository) {
		this.languageRepository = languageRepository;
	}
	
	@Override
	public List<Language> findAllLanguages() {
		return languageRepository.findAll();
	}

	@Override
	public Language findOneLanguage(Long id) {
		return languageRepository.getOne(id);
	}

}
