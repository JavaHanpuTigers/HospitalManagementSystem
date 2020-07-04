package com.five.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.five.mapper.RegeditMapper;
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
	public Doctor get( @PathVariable int id) {
		//return regSerivce.getDoctorByid(id);
		return null;
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
	
	@GetMapping("/{id}")
	public List<Regedit> regByidAll( 
			@PathVariable int id){
		
		return regSerivce.regAll(id);
	}

}
