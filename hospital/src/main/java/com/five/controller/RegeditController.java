package com.five.controller;

import java.security.Principal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.five.pojo.Arrange;
import com.five.pojo.Department;
import com.five.pojo.Doctor;
import com.five.pojo.Regedit;
import com.five.pojo.User;
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
			@PathVariable int id,
			@RequestBody Regedit reg) {
		//Map<String, Object> map = new HashMap<String, Object>();
		
		return regSerivce.setRegedit(reg);
	}
	
	@RequestMapping(value = "/aaa", method = RequestMethod.GET)
	public Map<String, Object> getUser(HttpSession session){
	   Authentication au;
	   User user = null;
	   org.springframework.security.core.userdetails.User u = null;
	   Map<String, Object> map = new HashMap<String, Object>();
	  // CloudinsUserDetail userDetail;
	   String[] meta = new String[1];
	   
	   SecurityContext ctx =
	         (SecurityContext) session.getAttribute("SPRING_SECURITY_CONTEXT");
	   if(ctx!=null) {
		   au = ctx.getAuthentication();
		   u = (org.springframework.security.core.userdetails.User)au.getPrincipal();
		   map.put("name", u.getUsername());
		  
		   System.out.println(u.getUsername() );
	   }
//		// 获取session中所有的键值
//		Enumeration<?> enumeration = session.getAttributeNames();
//		// 遍历enumeration中的
//		while (enumeration.hasMoreElements()) {
//		// 获取session键值
//		String name = enumeration.nextElement().toString();
//		// 根据键值取session中的值
//		Object value = session.getAttribute(name);
//		// 打印结果
//		System.out.println("<B>" + name + "</B>=" + value + "<br>/n");
//		}
		
//	   if(ctx!=null) {
////	      au = ctx.getAuthentication();
//	      userDetail = (CloudinsUserDetail) au.getPrincipal();
//	      if (userDetail != null){
//	         userDetail.setPassword("");
//		//userDetail直接转成json会报错,需要从中构造一个简单对象
//	         user = userDetail.castToCloudinsUser();
//	         meta[0] = "UserId:" +user.getId();
//	      }
//	   }
	   return map;
	}
	@GetMapping("/as")
	 public String currentUserName(Principal principal) {
	        return principal.getName();
	 }
} 
