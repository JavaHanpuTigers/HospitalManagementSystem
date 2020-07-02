package com.five.service.impl;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.five.service.RegeditService;

@Service
public class RegeditSerivceImpl implements RegeditService{
	
	// 保存一天的时间用于时间计算
	final int day = 24 * 60 * 60 * 1000;
	
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
	public static void main(String[] args) {

		 Calendar calendar=Calendar.getInstance();   
		 calendar.setTime(new Date()); 
		 System.out.println(calendar.get(Calendar.DAY_OF_MONTH));//今天的日期 
		 calendar.set(Calendar.DAY_OF_MONTH,calendar.get(Calendar.DAY_OF_MONTH)+15);//让日期加1  
		 System.out.println(calendar.get(Calendar.DATE));//加1之后的日期Top 
	}
}
