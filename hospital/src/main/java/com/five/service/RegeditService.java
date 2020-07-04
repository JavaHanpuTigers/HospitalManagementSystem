package com.five.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.five.pojo.Department;
import com.five.pojo.Doctor;
import com.five.pojo.Regedit;

/**
 * 	挂号相关服务
 * @author 张磊磊
 *
 */
public interface RegeditService {

	//得到当前时间
	Map<String,String> getDate();
	
	//得到当前科室id下的所有医生
	List<Doctor> doctorBydbAll(int id);
	
	// 得到当前时间下的全部医生
	List<Doctor> doctorDateAll(Date date , int id);
	
	// 得到全部科室信息
	List<Department> departAll();
	
	// 得到医生的上班时间 
	String getDoctorDate(int id);
	
	// 进行挂号功能
	Regedit setRegedit(Regedit reg);
	
	// 查询全部挂号信息
	List<Regedit> regAll(int  id);
	
	
}
