package com.five.config;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;


/**
 * 挂号相关的配置类
 * @author zll
 *
 */
@Configuration
@ConfigurationProperties(prefix = "reg")
public class RegConfig {

	
	List<String> workingforen ; // 上午工作时间
	
	List<String> workingarvo ; // 下午工作时间

	int maxsize; // 最大挂号人数
	
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
