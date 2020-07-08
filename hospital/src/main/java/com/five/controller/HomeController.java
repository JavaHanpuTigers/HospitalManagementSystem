package com.five.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
	
	// 静态主页 -- 已弃用
	@GetMapping("/")
	public String home() {
		return "index.html";
	}
	
}
