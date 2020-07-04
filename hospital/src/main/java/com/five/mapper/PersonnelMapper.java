package com.five.mapper;

import java.util.List;

import javax.security.auth.Subject;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.One;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import com.five.pojo.Arrange;
import com.five.pojo.Department;
import com.five.pojo.Doctor;
import com.five.pojo.Patient;
import com.five.pojo.Prescript;
import com.five.pojo.Regedit;
import com.five.pojo.Subment;
import com.five.pojo.User;
/**
 * 人事相关mapper
 * @author 俞峰龙
 *
 */
@Mapper
public interface PersonnelMapper {
	
	//获取所有患者信息
	@Select("SELECT * FROM patient")
	@Results(id="pantMap",value = {
		@Result(id=true,column = "p_id",property = "id"),
		@Result(column = "p_name",property = "name"),
		@Result(column = "p_age",property = "age"),
		@Result(column = "p_nation",property = "nation"),
		@Result(column = "p_sex",property = "sex"),
		@Result(column = "p_card",property = "card"),
		@Result(column = "u_id",property  = "user" ,javaType = User.class,
		one = @One(select = "com.five.mapper.RegeditMapper.getUserByid"))
	})
	public List<Patient> pantAll();
	
	// 获取指定患者信息
	@Select("select * from patient where p_id = #{id}")
	@ResultMap({"pantMap"})
	public Patient getPatientByid(int id);
	
	//获取所有排班信息
	@Select("SELECT * FROM arrange")
	@Results(id="arge" , value = {
		@Result(id=true,column = "a_id",property = "id"),
		@Result(column = "a_time",property = "time"),
		@Result(column = "d_id",property  = "doct" ,javaType = Doctor.class,
		one = @One(select = "com.five.mapper.RegeditMapper.getDoctorByid"))
	})
	public List<Arrange> argeAll();
	
	//获取所有科室信息
	@Select("SELECT * FROM department")
	@Results(id="deptMap", value = {
		@Result(id=true,column = "dp_id",property = "id"),
		@Result(column = "dp_name",property = "name"),
		@Result(column = "subdept",property  = "subdept" ,javaType = Subment.class,
		one = @One(select = "com.five.mapper.RegeditMapper.getSubmentByid"))
	})
	public List<Department> deptAll();
	
	// 获取指定科室信息
	@Select("select * from department where dp_id = #{id}")
	@ResultMap({"deptMap"})
	public Department getDeptByid(int id);
	
	// 获取所有子科室的信息
//	@Select("SELECT * FROM subment")
//	@Results(id="submentMap", value = {
//			@Result(id=true,column = "s_id",property = "id"),
//			@Result(column = "s_name",property = "name"),
//			@Result(column = "dp_id",property  = "dept" ,javaType = Department.class,
//			one = @One(select = "com.five.mapper.PersonnelMapper.getDeptByid"))
//		})
//	public List<Subment> submentAll();
	
	// 获取所有的挂号信息
	@Select("SELECT * FROM register")
	@Results(id = "regMap" , value = {
		@Result(id=true,column = "rt_id",property = "id"),
		@Result(column = "rt_time", property = "time"),
		@Result(column = "rt_date", property = "date"),
		@Result(column = "rt_name", property = "name"),
		@Result(column = "rt_sex", property = "sex"),
		@Result(column = "rt_card", property = "card"),
		@Result(column = "rt_nation", property = "nation"),
		@Result(column = "rt_fee", property = "fee"),
		@Result(column = "rt_state", property = "state"),
		@Result(column = "rt_phone", property = "phone"),
		@Result(column = "p_id",property  = "pant" ,javaType = Patient.class,
		one = @One(select = "com.five.mapper.PersonnelMapper.getPatientByid")),
		@Result(column = "d_id",property  = "doct" ,javaType = Doctor.class,
		one = @One(select = "com.five.mapper.RegeditMapper.getDoctorByid"))
	})
	public List<Regedit> regAll();
	
	// 获取指定挂号信息
	@Select("select * from register where rt_id = #{id}")
	@ResultMap({"regMap"})
	public Regedit getRegByid(int id);
	
	//获取所有处方信息
	@Select("SELECT * FROM prescript")
	@Results({
		@Result(id=true,column = "pt_id",property = "id"),
		@Result(column = "pt_sym",property = "sym"),
		@Result(column = "pt_content",property = "content"),
		@Result(column = "pt_time",property = "time"),
		@Result(column = "rt_id",property  = "reg" ,javaType = Regedit.class,
		one = @One(select = "com.five.mapper.PersonnelMapper.getRegByid"))
	})
	public List<Prescript> prescriptAll();
	
}
