package com.five.controller;

import java.security.Principal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.five.filter.JwtTokenUtils;
import com.five.pojo.Arrange;
import com.five.pojo.Department;
import com.five.pojo.Doctor;
import com.five.pojo.Patient;
import com.five.pojo.Regedit;
import com.five.pojo.User;
import com.five.service.RegeditService;

@RestController
@RequestMapping("/reg")

public class RegeditController {
	
	private static final String Department = null;
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
	public Map<String, String> nowDate(
			@RequestHeader("Authorization") String str){
		//String str = "eyJhbGciOiJIUzI1NiJ9.eyJST0xFXyI6IlJPTEVf5oKj6ICFIiwic3ViIjoiaHoxMTEiLCJSQVQiOjEsImV4cCI6MTU5NDEyMTg5NywiaWF0IjoxNTk0MTE4Mjk3fQ.9lfPioDAedS-S9GjByZduWyLcK4MwZU0Q__b_wQjjAI";
		
		//System.out.println(JwtTokenUtils.getUserId(str));
		
		System.out.println(str.substring(7));
		System.out.println(JwtTokenUtils.getUserId(str.substring(7)));
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
			@RequestParam(name = "d",required = false) String date,
			@PathVariable int id){
		// 时间格式化工具设置时间显示格式
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		// 判断传入时间是否为空
		if(date == null) {
			date  = sdf.format(new Date());
		}
		Date da = null;
		try {
			da = sdf.parse(date);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			System.out.println("时间转换错误！！！");
		}
		System.out.println(" date:"+ date);
		return regSerivce.doctorDateAll(da, id);
		
	}
	
	// 进行挂号
	@PostMapping("/{id}")
	public Map<String, Object> putReg(
			@RequestHeader("Authorization") String token,
			@PathVariable int id,
			@RequestBody Map<String, Object> map,
			@RequestBody Regedit reg) {
		//Map<String, Object> map = new HashMap<String, Object>();
		
		token = token.substring(7);
//		if (JwtTokenUtils.getUsername(token) != null) {
//			Map<String, Object> map2 = new HashMap<String, Object>();
//			map2.put("info", "信息有误");
//		}
		Regedit regedit = new Regedit();
		map.get("is"); 	// 是否为自己挂号
		regedit.setPant(new Patient(JwtTokenUtils.getUserId(token)));
		regedit.setDate((String) map.get("date"));
		regedit.setFee((double) map.get("fee"));
		regedit.setTime((String) map.get("time"));
		regedit.setDoct(new Doctor((int) map.get("doct")));
		regedit.setPhone((String) map.get("phone"));
		//map.get("pant");
		
		if ( map.get("is") != null) {
			System.out.println("");
		}
		
		// 这个4个信息判断 为别挂号
		map.get("name");
		map.get("sex");
		map.get("card");
		map.get("nation");
		return regSerivce.setRegedit(reg);
		
	}
	
	
	@GetMapping("/qqq")
	public void aa(
			@RequestBody Map<String, Object> map
			) {
		System.out.println(map.get("dept").getClass());
		
		
	}
	
	
} 
