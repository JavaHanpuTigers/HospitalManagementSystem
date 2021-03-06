package com.five.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.five.config.RegConfig;
import com.five.mapper.RegeditMapper;
import com.five.pojo.Arrange;
import com.five.pojo.Department;
import com.five.pojo.Doctor;
import com.five.pojo.Prescript;
import com.five.pojo.Regedit;
import com.five.service.RegeditService;

@Service
public class RegeditSerivceImpl implements RegeditService{
	
	// 保存一天的时间用于时间计算
	final int day = 24 * 60 * 60 * 1000;
	
	// 上班时间
	final String[][] working  = new String[][] {{"",""},{"1",""}};
	
	@Autowired
	RegConfig regconfig;
	
	
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
		map.put("tailDate", sdf.format(new Date(date.getTime() + 13 *day)));
		
		// 时间格式化工具设置时间显示格式
		//SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd");
		
		
		System.out.println(map);
		
		
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
		
		System.out.println(list);
		
		return list;
	}

	

	@Override
	public Arrange getDoctorDate(int id) {
		
		return regMapper.selectByDoctArrange(id);
	}

	@Override
	public Map<String, Object> setRegedit(Regedit reg) {
		// 返回的结果
		Map<String, Object> map = new HashMap<String, Object>();
		// 返回的描述信息
		String info = null;
		// 时间格式化工具设置时间显示格式
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		// 时间格式化工具带时间格式的
		SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd hh:mm:ss");
		// 保存工作时间信息
		List<String> wind = null;
		// 保存时间
		Date date = null;
		String str = null;
		try {
			info = "信息有误";
			System.out.println(reg.getDate());
			// 通过时间格式函数得到时间
			date = ft.parse(reg.getDate());
			// 得到特定格式的时间字符串
			str = sdf.format(date);
			// 判断时间是否在下午
			boolean trarvo = isEffectiveDate(date,
					ft.parse(str +" "+regconfig.getWorkingarvo().get(0)),
					ft.parse(str +" "+regconfig.getWorkingarvo().get(1)));
			// 判断时间是否在上午
			boolean trforen = isEffectiveDate(date,
					ft.parse(str +" "+regconfig.getWorkingforen().get(0)),
					ft.parse(str +" "+regconfig.getWorkingforen().get(1)));
			System.out.println(str +" "+regconfig.getWorkingforen().get(1));
			System.out.println(trarvo +  " 时间段 " + trforen);
			if (trarvo) { // 时间段在下午
				wind = regconfig.getWorkingarvo();
			}else if(trforen) { // 时间段在上午
				wind = regconfig.getWorkingforen();
			}else { // 两个时间段都不在
				info = "当前不在时间段";
				System.out.println("-------------当前不在时间段---------------");
				throw new ParseException(info,1);
			}
		} catch (ParseException e) {
			System.out.println("有错误！！！！----------------------------------");
			
			System.out.println(reg);
			map.put("info", info);
			return map;
		}
		// 日期转换类
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		// 得到星期
		int week_index = cal.get(Calendar.DAY_OF_WEEK) ;
		
		// 转换星期格式默认为星期天为1
		week_index  = week_index == 1?7:week_index-1;
	
		try {
			if (reg.getDoct() == null) {
				info = "医生信息为空";
				throw new ParseException(info,1);
			}
			if (date.getTime() <= (new Date().getTime() + (1000 * 60 * 60 * 2))) {
				info = "当前不能挂号，要提前两个小时挂号";
				throw new ParseException(info,1);
			}
			// 得到医生的排班信息
			String workDate = regMapper.selectByDoctArrange(reg.getDoct().getId()).getTime();
			if (!workDate.contains(String.valueOf(week_index))) {
				info = "医生不在上班时间" + wind.get(0);
				throw new ParseException(info,1);
			}
		} catch (Exception e) {
			map.put("info", info);
			return map;
		} 
		
		
		
		
		//sdf.format(reg.getDate());
		//String date2 = ft.format(reg.getDate());
		
		System.out.println(str + " " + wind.get(0));
		// 判断人数是否已经满了
		int count = regMapper.selectDateCount(str + " " + wind.get(0), str + " " +wind.get(1));
		System.out.println(count);
		if (count >= regconfig.getMaxsize()) {
			info = "当前时间段人数已满！！";
			map.put("info", info);
			return map;
		}
		try {
			regMapper.insertReg(reg);
			info = "挂号成功！！";
			map.put("content", reg);
		} catch (Exception e) {
			info = "挂号失败，信息有误";
		}
		
		map.put("info", info);
		map.put("operation","ok");
		
		
		return map;
	}
	
	
	
	public static boolean isEffectiveDate(Date nowTime, Date startTime, Date endTime) {
        System.out.println("挂号时间   "+nowTime);
        System.out.println("起始时间   "+startTime);
        System.out.println("结束时间   "+endTime);
		if (nowTime.getTime() == startTime.getTime()
                || nowTime.getTime() == endTime.getTime()) {
            return true;
        }

        Calendar date = Calendar.getInstance();
        date.setTime(nowTime);
        
        Calendar begin = Calendar.getInstance();
        begin.setTime(startTime);

        Calendar end = Calendar.getInstance();
        end.setTime(endTime);
        
       
        if (date.after(begin) && date.before(end)) {
            return true;
        } else {
            return false;
        }
    }

	@Override
	public int updateRegState(int id, int type) {
		
		return regMapper.updateReg(id, type);
	}

	@Override
	public Map<String, Object> proceedSign(int id) {
		Map<String, Object> map = new HashMap<String, Object>();
		String info = "签到失败";
		Regedit reg =  null;
		// 时间格式化工具带时间格式的
		SimpleDateFormat ft = null;
		// 时间格式化工具设置时间显示格式
		SimpleDateFormat sdf = null;
		Date regdate  = null;
		Date nowdate = null;
		String str = null;
		try {
			reg =  regMapper.selectbyidReg(id);
			if (reg == null) {
				info = "签到失败，签到信息不存在!";
				throw new NullPointerException(info);
			}
			ft = new SimpleDateFormat ("yyyy-MM-dd hh:mm:ss");
			sdf = new SimpleDateFormat("yyyy-MM-dd");
			regdate = ft.parse(reg.getDate());
			// 得到当前时间
			nowdate = new Date();
			
			if (!sdf.format(nowdate).equals(sdf.format(regdate))) {
				info = "只能当天进行签到！！！";
				throw new Exception(info);
			}
			str = sdf.format(nowdate);
		}catch (ParseException e) {
			info = "挂号信息异常,亲联系管理员";
			map.put("info", info);
			return map;
		}catch (Exception e) {
			
			map.put("info", info);
			return map;
		}
		
		
		try {
			// 判断时间是否在下午
			boolean trarvo = isEffectiveDate(nowdate,
					ft.parse(str +" "+regconfig.getWorkingarvo().get(0)),
					ft.parse(str +" "+regconfig.getWorkingarvo().get(1)));
			// 判断时间是否在上午
			boolean trforen = isEffectiveDate(ft.parse(ft.format(nowdate)),
					ft.parse(str +" "+regconfig.getWorkingforen().get(0)),
					ft.parse(str +" "+regconfig.getWorkingforen().get(1)));
			if (!(trarvo || trforen)) {
				info = "当前不在时间段";
				throw new Exception(info);
			}
		} catch (ParseException e) {
			info = "挂号信息异常,亲联系管理员";
			map.put("info", info);
			return map;
		}catch (Exception e) {
			
			map.put("info", info);
			return map;
		}
		
		// 进行修改
		try {
			regMapper.updateReg(id, 2);
			info = "签到成功！";
			map.put("operation","ok");
			map.put("info", info);
		} catch (Exception e) {
			info = "挂号信息异常,请联系管理员";
			map.put("info", info);
		}
		
		return map;
	}

	@Override
	public Prescript getPrescript(int id) {
		Prescript p = regMapper.selectbyidPres(id);
		System.out.println(p);
		return p;
	}
	
	
}
