package com.ebookrepositoryserver.lucene.indexing.handler;

import java.io.File;
import java.io.IOException;
import java.util.Calendar;

import org.apache.pdfbox.io.RandomAccessFile;
import org.apache.pdfbox.pdfparser.PDFParser;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDDocumentInformation;
import org.apache.pdfbox.text.PDFTextStripper;

import com.ebookrepositoryserver.model.ScientificWork;

public class PDFHandler extends DocumentHandler {

	@Override
	public ScientificWork getEBook(File file) {
		ScientificWork ebook = new ScientificWork();

		try {
			PDFParser pdfParser = new PDFParser(new RandomAccessFile(file, "r"));
			pdfParser.parse();

			String text = getText(pdfParser);
			ebook.setText(text);
			PDDocument pdDocument = pdfParser.getPDDocument();
			PDDocumentInformation pdDocumentInformation = pdDocument.getDocumentInformation();
			ebook.setTitle(pdDocumentInformation.getTitle());
			ebook.setAuthor(pdDocumentInformation.getAuthor());
			ebook.setKeywords(pdDocumentInformation.getKeywords());
			ebook.setFilename(file.getCanonicalPath());
			ebook.setMime("application/pdf");
			ebook.setPublicationYear(pdDocumentInformation.getCreationDate().get(Calendar.YEAR));

			pdDocument.close();
		} catch (IOException exc) {
			System.out.println(exc.getMessage());
		}

		return ebook;
	}

	private String getText(PDFParser parser) {
		try {
			PDFTextStripper textStripper = new PDFTextStripper();
			String text = textStripper.getText(parser.getPDDocument());
			return text;
		} catch (IOException e) {
			System.out.println("Document conversion error");
		}
		return null;
	}

	@Override
	public String getText(File file) {
		try {
			PDFParser parser = new PDFParser(new RandomAccessFile(file, "r"));
			parser.parse();
			PDFTextStripper textStripper = new PDFTextStripper();
			String text = textStripper.getText(parser.getPDDocument());
			return text;
		} catch (IOException e) {
			System.out.println("Document conversion error");
		}
		return null;
	}

}
