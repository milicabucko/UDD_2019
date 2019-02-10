package com.ebookrepositoryserver.service;

import com.ebookrepositoryserver.model.User;

public interface SecurityService {
	
	User login(User user);
	
	void logout();
	
	User getLoggedUser();
	
	String getRoleOfLoggedUser();

}
