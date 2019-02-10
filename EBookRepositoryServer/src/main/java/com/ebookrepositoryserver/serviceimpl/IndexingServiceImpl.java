package com.ebookrepositoryserver.serviceimpl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import com.ebookrepositoryserver.model.ScientificWork;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.query.IndexQuery;
import org.springframework.data.elasticsearch.core.query.IndexQueryBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ebookrepositoryserver.lucene.indexing.handler.DocumentHandler;
import com.ebookrepositoryserver.lucene.indexing.handler.PDFHandler;
import com.ebookrepositoryserver.service.IndexingService;

@Service
public class IndexingServiceImpl implements IndexingService{

	private final ElasticsearchTemplate elasticSearchTemplate;
	
	public IndexingServiceImpl(ElasticsearchTemplate elasticsearchTemplate) {
		this.elasticSearchTemplate = elasticsearchTemplate;
	}
	
	@Override
	public ScientificWork addEBook(ScientificWork scientificWork, MultipartFile file) {
		
		DocumentHandler handler = getHandler("pdf");
		scientificWork = handler.getEBook(convert(file));
		
		IndexQuery indexQuery = new IndexQueryBuilder()
				.withObject(scientificWork)
				.withId(file.getOriginalFilename())
				.build();
		
		String filename = elasticSearchTemplate.index(indexQuery);
		if(filename.contains(file.getOriginalFilename())) {
			return scientificWork;
		}
		
		return null;
	}

	@Override
	public void deleteEBook(String filename) {
		elasticSearchTemplate.delete(ScientificWork.class, filename);
	}

	@Override
	public DocumentHandler getHandler(String filename) {
		if(filename.endsWith("pdf")) {
			return new PDFHandler();
		}
		return new PDFHandler();
	}
	
	public File convert(MultipartFile file)
	{    
	    File convFile = new File(file.getOriginalFilename());
	    try {
			convFile.createNewFile();
		    FileOutputStream fos = new FileOutputStream(convFile); 
		    fos.write(file.getBytes());
		    fos.close(); 
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	    return convFile;
	}

	@Override
	public ScientificWork addIndexEBook(ScientificWork scientificWork) {
		
        IndexQuery indexQuery = new IndexQueryBuilder()
                .withObject(scientificWork)
                .withId(scientificWork.getFilename())
                .build();
        String filename = elasticSearchTemplate.index(indexQuery);
		if(filename.contains(scientificWork.getFilename())) {
			return scientificWork;
		}
		return null;
	}

}
