package com.five.service.impl;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.five.mapper.RegeditMapper;
import com.five.pojo.Department;
import com.five.pojo.Doctor;
import com.five.pojo.Regedit;
import com.five.service.RegeditService;

@Service
public class RegeditSerivceImpl implements RegeditService{
	
	// 保存一天的时间用于时间计算
	final int day = 24 * 60 * 60 * 1000;
	
	@Autowired
	RegeditMapper regMapper;
	
	
	@Override
	public Map<String, String> getDate() {
		// TODO Auto-generated method stub
		Map<String,String> map = new HashMap<String, String>();
		// 得到服务器当前时间
		Date date = new Date();
		// 时间格式化工具设置时间显示格式
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		//添加起始时间
		map.put("startdate", sdf.format(date));	
		
		// 添加结束时间
		map.put("tailDate", sdf.format(new Date(date.getTime() + 15 *day)));
		return map;
	}

	@Override
	public List<Doctor> doctorBydbAll(int id) {
		// 通过科室id得到下面的全部医生
		return regMapper.doctorAll(id);
	}

	@Override
	public List<Doctor> doctorDateAll(Date date, int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Department> departAll() {
		
		return regMapper.selectDeparAll();
	}

	@Override
	public String getDoctorDate(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Regedit setRegedit(Regedit reg) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Regedit> regAll(int id) {
		
		return regMapper.selectRegAll(id);
	}
}
