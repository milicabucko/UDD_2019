package com.ebookrepositoryserver.service;

import java.util.List;

import com.ebookrepositoryserver.model.ScientificWork;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ScientificWorkService {
	
	ScientificWork createEBook(ScientificWork scientificWork);
	
	void removeEBook(Long id);
	
	List<ScientificWork> findAllEBooks();
	
	ScientificWork findOneEBook(Long id);
	
	ScientificWork uploadEBook(MultipartFile file);
	
	ResponseEntity<ByteArrayResource> downloadEBook(Long bookId) throws Exception;
	
	ScientificWork findOneEBookByFilename(String filename);
	
	ScientificWork updateEBook(ScientificWork ebook);

}
