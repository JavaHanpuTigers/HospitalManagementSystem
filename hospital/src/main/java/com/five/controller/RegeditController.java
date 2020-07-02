package com.five.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.five.service.RegeditService;

@Controller
@RequestMapping("/reg")
@ResponseBody
public class RegeditController {
	
	@Autowired
	RegeditService regSerivce;
	
	@GetMapping
	public String home() {
		return "reghome";
	}
	
	@GetMapping("/date")
	public Map<String, String> nowDate(){
		
		return regSerivce.getDate();
	}
}
