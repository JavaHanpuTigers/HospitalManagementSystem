package com.five.config;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;


@Configuration
@ConfigurationProperties(prefix = "reg")
public class RegConfig {

	
	List<String> workingforen ;
	
	List<String> workingarvo ;

	int maxsize;
	
	public List<String> getWorkingforen() {
		return workingforen;
	}

	public void setWorkingforen(List<String> workingforen) {
		this.workingforen = workingforen;
	}

	public List<String> getWorkingarvo() {
		return workingarvo;
	}

	public void setWorkingarvo(List<String> workingarvo) {
		this.workingarvo = workingarvo;
	}

	public int getMaxsize() {
		return maxsize;
	}

	public void setMaxsize(int maxsize) {
		this.maxsize = maxsize;
	}
	
	
	
}
