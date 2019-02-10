package com.ebookrepositoryserver.lucene.indexing.handler;

import java.io.File;

import com.ebookrepositoryserver.model.ScientificWork;

public abstract class DocumentHandler {

	public abstract ScientificWork getEBook(File file);

	public abstract String getText(File file);

}
