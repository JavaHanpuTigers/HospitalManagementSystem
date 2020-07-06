package com.five.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.five.mapper.RegeditMapper;
import com.five.pojo.Arrange;
import com.five.pojo.Department;
import com.five.pojo.Doctor;
import com.five.pojo.Regedit;
import com.five.service.RegeditService;

@RestController
@RequestMapping("/reg")

public class RegeditController {
	
	@Autowired
	RegeditService regSerivce;
	// 查询科室下的全部医生
	@GetMapping("/dept/doct/{id}")
	public List<Doctor> home(int id) {
		return regSerivce.doctorBydbAll(id);
	}
	// 传入子科室id得到下面的全部id
	@GetMapping("/dept/{id}")
	public List<Doctor> get( @PathVariable int id) {
		//return regSerivce.getDoctorByid(id);
		return regSerivce.doctorBydbAll(id);
	}
	
	
	// 获取当前时间 返回当前时间和结束时间
	@GetMapping("/date")
	public Map<String, String> nowDate(){
		
		return regSerivce.getDate();
	}
	
	
	// 查询全部科室信息
	@GetMapping("/dept")
	public List<Department> allDepart(){
		
		return regSerivce.departAll();
	}
	
	// 通过id查询全部挂号记录
	@GetMapping("/{id}")
	public List<Regedit> regByidAll( 
			@PathVariable int id){
		
		return regSerivce.regAll(id);
	}
	
	// 查询医生的工作时间
	@GetMapping("/date/{id}")
	public Arrange getByidDetpDat(
			@PathVariable int id){
		
		return regSerivce.getDoctorDate(id);
	}
	
	// 查询指定时间的的工作医生
	@GetMapping("/doct/{id}")
	public List<Doctor> getByDateDoct(
			@RequestParam(name = "d",required = false) Date date,
			@PathVariable int id){
		// 判断传入时间是否为空
		if(date == null) {
			date = new Date();
		}
		System.out.println(date);
		return regSerivce.doctorDateAll(date, id);
		
	}
	
	// 进行挂号
	@PostMapping("/{id}")
	public Map<String, Object> putReg(
			@PathVariable int id,
			@RequestBody Regedit reg) {
		//Map<String, Object> map = new HashMap<String, Object>();
		
		return regSerivce.setRegedit(reg);
	}
} 
