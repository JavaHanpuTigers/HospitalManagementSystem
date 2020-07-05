package com.five.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.five.pojo.Arrange;
import com.five.pojo.Department;
import com.five.pojo.Doctor;
import com.five.pojo.Regedit;

/**
 * 	挂号相关服务
 * @author 张磊磊
 *
 */
public interface RegeditService {

	
	/**
	 * 得到当前时间
	 * @return
	 */
	Map<String,String> getDate();
	
	
	/**
	 * 得到当前科室id下的所有医生
	 * @param id 科室id
	 * @return
	 */
	List<Doctor> doctorBydbAll(int id);
	
	
	/**
	 * 得到当前时间下的全部医生
	 * @param date 查询时间
	 * @param id
	 * @return
	 */
	List<Doctor> doctorDateAll(Date date , int id);
	
	
	/**
	 * 得到全部科室信息
	 * @return
	 */
	List<Department> departAll();
	
	
	/**
	 * 得到医生的上班时间 
	 * @param id 医生id
	 * @return
	 */
	Arrange getDoctorDate(int id);
	
	
	/**
	 * 进行挂号功能
	 * @param reg 挂号信息
	 * @return
	 */
	Regedit setRegedit(Regedit reg);
	
	
	/**
	 * 查询全部挂号信息
	 * @param id 用户id
	 * @return
	 */
	List<Regedit> regAll(int  id);
	
	
}
