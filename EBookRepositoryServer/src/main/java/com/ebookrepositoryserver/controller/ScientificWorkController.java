package com.ebookrepositoryserver.controller;

import java.util.List;

import com.ebookrepositoryserver.model.ScientificWork;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.ebookrepositoryserver.service.ScientificWorkService;
import com.ebookrepositoryserver.service.SecurityService;

@RestController
@RequestMapping("/api/ebooks")
@CrossOrigin(origins = "http://localhost:4200")
public class ScientificWorkController {

	private final ScientificWorkService scientificWorkService;

	public ScientificWorkController(ScientificWorkService scientificWorkService) {
		this.scientificWorkService = scientificWorkService;
	}

	@PostMapping("/create")
	public ResponseEntity<ScientificWork> createEBook(@RequestBody ScientificWork scientificWork) {
		scientificWork = scientificWorkService.createEBook(scientificWork);
		return new ResponseEntity<ScientificWork>(scientificWork, HttpStatus.OK);
	}

	@PostMapping("/delete")
	public ResponseEntity<Void> deleteEBook(@RequestBody ScientificWork scientificWork) {
		scientificWorkService.removeEBook(scientificWork.getId());
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@PutMapping("/update")
	public ResponseEntity<ScientificWork> updateEBook(@RequestBody ScientificWork scientificWork) {
		scientificWork = scientificWorkService.updateEBook(scientificWork);
		return new ResponseEntity<ScientificWork>(scientificWork, HttpStatus.OK);
	}

	@GetMapping
	public List<ScientificWork> getAllEBooks() {
		return scientificWorkService.findAllEBooks();
	}

	@GetMapping("/{id}")
	public ScientificWork getOneEBook(@PathVariable("id") Long id) {
		return scientificWorkService.findOneEBook(id);
	}

	@RequestMapping(value = "/upload", method = RequestMethod.POST, consumes = "multipart/form-data")
	public ResponseEntity<ScientificWork> uploadEBook(@RequestParam("file") MultipartFile file) {
		ScientificWork scientificWork = scientificWorkService.uploadEBook(file);
		return new ResponseEntity<ScientificWork>(scientificWork, HttpStatus.OK);
	}

	@GetMapping("/download/{bookId}")
	public ResponseEntity<ByteArrayResource> getFile(@PathVariable("bookId") Long bookId) throws Exception {
		return scientificWorkService.downloadEBook(bookId);
	}

}
