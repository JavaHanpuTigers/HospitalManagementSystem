package com.five.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
	
	// 静态主页 -- 已弃用
	@GetMapping("/index")
	public String home() {
		return "index.html";
	}
	
	// 动态主页
	@RequestMapping("/")
	public String index() {
		return "index";
	}
	
	// 测试thymeleaf
	@RequestMapping("/test")
	public String test() {
		return "test";
	}

}
