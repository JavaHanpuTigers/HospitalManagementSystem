package com.five.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.five.mapper.RegeditMapper;
import com.five.pojo.Doctor;
import com.five.service.RegeditService;

@Controller
@RequestMapping("/reg")
@ResponseBody
public class RegeditController {
	
	@Autowired
	RegeditService regSerivce;
	@Autowired
	RegeditMapper regMapper;
	@GetMapping
	public List<Doctor> home() {
		return regMapper.doctorAll(1);
	}
	@GetMapping("/{id}")
	public Doctor get( @PathVariable int id) {
		return regMapper.getDoctorByid(id);
	}
	// 获取当前时间 返回当前时间和结束时间
	@GetMapping("/date")
	public Map<String, String> nowDate(){
		
		return regSerivce.getDate();
	}
}
