package com.ebookrepositoryserver.service;

import com.ebookrepositoryserver.model.ScientificWork;
import org.springframework.web.multipart.MultipartFile;

import com.ebookrepositoryserver.lucene.indexing.handler.DocumentHandler;

public interface IndexingService {
	
	ScientificWork addEBook(ScientificWork scientificWork, MultipartFile file);
	
	ScientificWork addIndexEBook(ScientificWork scientificWork);
	
	void deleteEBook(String filename);
	
	DocumentHandler getHandler(String filename);

}
