package com.five.service.impl;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.five.mapper.RegeditMapper;
import com.five.pojo.Arrange;
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
	public List<Department> departAll() {
		
		return regMapper.selectDeparAll();
	}
	

	@Override
	public List<Regedit> regAll(int id) {
			
		return regMapper.selectRegAll(id);
	}
	
	
	
	@Override
	public List<Doctor> doctorDateAll(Date date, int id) {
		// 日期转换类
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		int week_index = cal.get(Calendar.DAY_OF_WEEK) ;
		
		// 转换星期格式默认为星期天为1
		week_index  = week_index == 1?7:week_index-1;
		
		System.out.println(week_index);
		
		
		List<Doctor> list = regMapper.doctorDateAll(id,week_index);
		
		return list;
	}

	

	@Override
	public Arrange getDoctorDate(int id) {
		
		return regMapper.selectByDoctArrange(id);
	}

	@Override
	public Regedit setRegedit(Regedit reg) {
		
		return null;
	}

}
