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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.five.filter.JwtTokenUtils;
import com.five.mapper.PersonnelMapper;
import com.five.pojo.Arrange;
import com.five.pojo.Department;
import com.five.pojo.Doctor;
import com.five.pojo.Patient;
import com.five.pojo.Prescript;
import com.five.pojo.Regedit;
import com.five.pojo.User;
import com.five.service.RegeditService;

@RestController
@RequestMapping("/reg")
public class RegeditController {
	
	@Autowired
	PersonnelMapper presMapper;
	
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
	@GetMapping("/all")
	public List<Regedit> regByidAll( 
			@RequestHeader(name = "Authorization",required = false) String token
			){
		token = token.substring(7);
		int id = JwtTokenUtils.getUserId(token);
		
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
	
	// 进行挂号@PostMapping("/aaa")
	@PostMapping()
	public Map<String, Object> putReg(
			@RequestHeader("Authorization") String token,
			//@PathVariable int id,@RequestBody Regedit reg
			@RequestBody Map<String, Object> map
			) {
		//Map<String, Object> map = new HashMap<String, Object>();
		
		token = token.substring(7);
//		if (JwtTokenUtils.getUsername(token) != null) {
//			Map<String, Object> map2 = new HashMap<String, Object>();
//			map2.put("info", "信息有误");
//		}
		System.out.println(map);
		Regedit regedit = new Regedit();
		map.get("is"); 	// 是否为自己挂号
		regedit.setPant(new Patient(JwtTokenUtils.getUserId(token)));
		regedit.setDate((String) map.get("date"));
		String fee =String.valueOf(map.get("fee"));
		regedit.setFee(Double.valueOf(fee));
		regedit.setTime((String) map.get("time"));
		regedit.setDoct(new Doctor((int) map.get("doct")));
		regedit.setPhone((String) map.get("phone"));
		//map.get("pant");
		
		if ( map.get("is") != null) {
			System.out.println("lkasdhfasjkdfklasjdfjasdf");
			Patient p =  presMapper.getPatientByid(regedit.getPant().getId());
			System.out.println("p.getName()：：：："+p.getName());
			regedit.setName(p.getName());
			regedit.setSex(p.getSex());
			regedit.setCard(p.getCard());
			regedit.setNation(p.getNation());
			
		}else {
			// 这个4个信息判断 为别挂号
			regedit.setName((String) map.get("name")); // 名称
			regedit.setSex((String)map.get("sex")); // 性别
			regedit.setCard((String) map.get("card")); // 身份证
			regedit.setNation((String) map.get("nation")); // 民族
			
		}
		
		
		return regSerivce.setRegedit(regedit);
		
	}
	
	@PutMapping("/state/{id}")
	public Map<String, Object> update(
			@PathVariable int id,
			@RequestParam(name = "t",required = false) String  type2
			){
		String[] xx = new String[] {"操作失败","操作成功"};
		Map<String, Object> map = new HashMap<String, Object>();
		String info = "";
		
		int type = 0;
		try {
			type = Integer.valueOf(type2);
		} catch (Exception e) {
			info = "参数有误";
			return map;
		}
		int i = regSerivce.updateRegState(id, type);
		
		info = xx[i];
		map.put("operation","ok");
		map.put("info", info);
		return map;
	}
	
	@PutMapping("/sign/{id}")
	public Map<String, Object> proceedSign(
			@PathVariable int id ){
		// 进行签到
		return regSerivce.proceedSign(id);
	}
	
	@GetMapping("/pres/{id}")
	public Prescript getPres(
			@PathVariable int id) {
		
		return regSerivce.getPrescript(id);
		
	}
} 
