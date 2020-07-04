package com.five.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.five.mapper.PersonnelMapper;
import com.five.pojo.Arrange;
import com.five.pojo.Department;
import com.five.pojo.Patient;
import com.five.pojo.Prescript;
import com.five.pojo.Regedit;
import com.five.pojo.Subment;


/**
 * 	人事管理的控制器
 * @author 俞峰龙
 *
 */
@RestController
@RequestMapping("/hr")
public class PersonnelController {
	
	// 自动注入人事相关的mapper
	@Autowired
	PersonnelMapper personnelMapper;
	
	// 获取所有患者信息
	@GetMapping("/pant")
	public List<Patient> allPant(){
		return personnelMapper.pantAll();
	}
	
	// 获取单个患者的信息
	@GetMapping("/pant/{id}")
	public Patient getPant(@PathVariable int id){
		return personnelMapper.getPatientByid(id);
	}
	
	// 获取所有的科室的信息
	@GetMapping("/dept")
	public List<Department> allDept(){
		return personnelMapper.deptAll();
	}
	
	// 获取指定科室的信息
	@GetMapping("/dept/{id}")
	public Department getDept(@PathVariable int id) {
		return personnelMapper.getDeptByid(id);
	}
	
	// 获取所有子科室的信息
//	@GetMapping("/subment")
//	public List<Subment> allSubment(){
//		return personnelMapper.submentAll();
//	}
	
	// 获取所有排班的信息
	@GetMapping("/arge")
	public List<Arrange> allArge(){
		return personnelMapper.argeAll();
	}
	
	// 获取所有挂号相关的信息
	@GetMapping("/reg")
	public List<Regedit> allReg(){
		return personnelMapper.regAll();
	}
	
	// 获取指定挂号的信息
	@GetMapping("/reg/{id}")
	public Regedit getReg(@PathVariable int id){
		return personnelMapper.getRegByid(id);
	}
	
	// 获取所有的处方的信息
	@GetMapping("/prescript")
	public List<Prescript> allPrescript(){
		return personnelMapper.prescriptAll();
	}
	
}
