package com.ebookrepositoryserver.serviceimpl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import com.ebookrepositoryserver.model.ScientificWork;
import com.ebookrepositoryserver.model.User;
import com.ebookrepositoryserver.service.UserService;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ebookrepositoryserver.repository.ScientificWorkRepository;
import com.ebookrepositoryserver.service.ScientificWorkService;
import com.ebookrepositoryserver.service.IndexingService;

@Service
public class ScientificWorkServiceImpl implements ScientificWorkService {

	private final ScientificWorkRepository scientificWorkRepository;
	private final UserService userService;
	private final IndexingService indexingService;

	public ScientificWorkServiceImpl(ScientificWorkRepository scientificWorkRepository, UserService userService, IndexingService indexingService) {
		this.scientificWorkRepository = scientificWorkRepository;
		this.userService = userService;
		this.indexingService = indexingService;
	}

	@Override
	public ScientificWork createEBook(ScientificWork scientificWork) {
		ScientificWork savedScientificWork = scientificWorkRepository.save(scientificWork);
		if (scientificWork.getFilename() != null) {
			ScientificWork ebook = indexingService.getHandler(savedScientificWork.getFilename())
					.getEBook(new File(savedScientificWork.getFilename()));
			ebook.setTitle(savedScientificWork.getTitle());
			ebook.setKeywords(savedScientificWork.getKeywords());
			ebook.setAuthor(savedScientificWork.getAuthor());
			ebook.setLanguage(savedScientificWork.getLanguage());
			ebook.setMagazine(savedScientificWork.getMagazine());
			ebook.setCategory(savedScientificWork.getCategory());
			ebook.setId(savedScientificWork.getId());
			ebook.convertToLat();
			indexingService.addIndexEBook(ebook);
		}
		return savedScientificWork;
	}

	@Override
	public void removeEBook(Long id) {
		scientificWorkRepository.delete(id);
	}

	@Override
	public List<ScientificWork> findAllEBooks() {
		return scientificWorkRepository.findAll();
	}


	@Override
	public ScientificWork findOneEBook(Long id) {
		return scientificWorkRepository.getOne(id);
	}

	@Override
	public ScientificWork uploadEBook(MultipartFile file) {

		User user = UserService.aktivanUser;

		ScientificWork scientificWork = new ScientificWork();
		scientificWork.setUser(user);
		scientificWork.setFilename(file.getOriginalFilename());
		// scientificWork = scientificWorkRepository.save(scientificWork);
		// Long id = scientificWork.getId();
		scientificWork = indexingService.addEBook(scientificWork, file);

		String baseDirectory = "D:/home";
		try {
			Files.createDirectories(Paths.get(baseDirectory, "books"));
			Files.write(Paths.get(baseDirectory, "books", file.getOriginalFilename()), file.getBytes());
		} catch (IOException e) {
			e.printStackTrace();
		}
		scientificWork.setFilename(file.getOriginalFilename());
		return scientificWork;
	}

	@Override
	public ResponseEntity<ByteArrayResource> downloadEBook(Long bookId) throws Exception {
		ScientificWork scientificWork = scientificWorkRepository.findOne(bookId);

		if (scientificWork == null) {
			System.out.println("Document doesn't exist");
			return null;
		}

		String baseDirectory = "D:/home/books/";
		Path bookPath = Paths.get(baseDirectory, scientificWork.getFilename());
		
		byte[] bookContent = Files.readAllBytes(bookPath);
	    ByteArrayResource resource = new ByteArrayResource(bookContent);

	    return ResponseEntity.ok()
	            .contentLength(bookContent.length)
	            .contentType(MediaType.parseMediaType(scientificWork.getMime()))
	            .body(resource);
	}

	@Override
	public ScientificWork findOneEBookByFilename(String filename) {
		return scientificWorkRepository.findEBookByFilename(filename);
	}

	@Override
	public ScientificWork updateEBook(ScientificWork ebook) {
		ScientificWork e = scientificWorkRepository.findOne(ebook.getId());
		e.setAuthor(ebook.getAuthor());
		e.setKeywords(ebook.getKeywords());
		e.setLanguage(ebook.getLanguage());
		e.setTitle(ebook.getTitle());
		e.setPublicationYear(ebook.getPublicationYear());
		e.setMagazine(ebook.getMagazine());
		e.setCategory(ebook.getCategory());
		e.setOpenAccess(ebook.getOpenAccess());
		return scientificWorkRepository.save(e);
	}

}
