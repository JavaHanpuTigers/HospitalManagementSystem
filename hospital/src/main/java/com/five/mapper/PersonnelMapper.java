package com.five.mapper;

import java.util.List;

import javax.security.auth.Subject;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Many;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.One;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.five.pojo.Arrange;
import com.five.pojo.Department;
import com.five.pojo.Doctor;
import com.five.pojo.Patient;
import com.five.pojo.Prescript;
import com.five.pojo.Regedit;
import com.five.pojo.Subment;
import com.five.pojo.User;
/**
 * 	人事相关mapper
 * @author 俞峰龙
 *
 */
@Mapper
public interface PersonnelMapper {
	
	
	//获取所有患者信息
	@Select("SELECT * FROM patient limit #{off} offset ${page * off}")
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
	public List<Patient> pantAll(@Param("page")int page,@Param("off")int off);
	
	// 获取患者的数量
	@Select("SELECT count(p_id) FROM patient")
	int countPant();
	
	// 获取指定患者信息
	@Select("select * from patient where p_id = #{id}")
	@ResultMap({"pantMap"})
	Patient getPatientByid(int id);
	
	// 添加患者的信息
	@Insert("INSERT INTO patient(u_id,p_card,p_name,p_age,p_nation,p_sex) VALUES(#{user.id},#{card},#{name},#{age},#{nation},#{sex})")
	@Options(useGeneratedKeys = true, keyProperty = "id")
	void addPant(Patient patient);
	
	// 修改患者的信息
	@Update("UPDATE patient SET p_card=#{card},p_name=#{name},p_age=#{age},p_nation=#{nation},p_sex=#{sex} WHERE p_id=#{id}")
	void alterPant(Patient patient);
	
	// 删除患者的信息
	@Delete("DELETE FROM patient WHERE p_id=#{id}")
	void deletePant(int id);
	
	// 获取所有医生信息
	@Select("select * from doctor limit #{off} offset ${page * off}")
	@Results( id="doctMap",value =  {
		@Result(id = true,column = "d_id",property  = "id"),
		@Result(column = "d_name",property  = "name"),
		@Result(column = "d_sex",property  = "sex"),
		@Result(column = "d_age",property  = "age"),
		@Result(column = "d_nation",property  = "nation"),
		@Result(column = "d_title",property  = "title"),
		@Result(column = "d_fee",property  = "fee"),
		@Result(column = "s_id",property  = "subment" ,javaType = Subment.class,
			one = @One(select = "com.five.mapper.RegeditMapper.getSubmentByid")),
		@Result(column = "u_id",property  = "user" ,javaType = User.class,
		one = @One(select = "com.five.mapper.RegeditMapper.getUserByid"))
	})
	public List<Doctor> doctAll(@Param("page")int page,@Param("off")int off);
	
	// 获取医生的数量
	@Select("SELECT count(d_id) FROM doctor")
	int countDoct();
	
	// 添加医生信息
	@Insert("INSERT INTO doctor(u_id,s_id,d_age,d_name,d_sex,d_nation,d_title,d_fee) VALUES(#{user.id},#{subment.id},#{age},#{name},#{sex},#{nation},#{title},#{fee})")
	@Options(useGeneratedKeys = true, keyProperty = "id")
	void addDoct(Doctor doctor);
	
	// 修改医生信息
	@Update("UPDATE doctor SET s_id=#{subment.id},d_age=#{age},d_name=#{name},d_sex=#{sex},d_nation=#{nation},d_title=#{title},d_fee=#{fee} WHERE d_id=#{id}")
	void alterDoct(Doctor doctor);
	
	// 删除医生信息
	@Delete("DELETE FROM doctor WHERE d_id=#{id}")
	void deleteDoct(int id);
	
	//获取所有排班信息
	@Select("SELECT * FROM arrange limit #{off} offset ${page * off}")
	@Results(id="arge" , value = {
		@Result(id=true,column = "a_id",property = "id"),
		@Result(column = "a_time",property = "time"),
		@Result(column = "d_id",property  = "doct" ,javaType = Doctor.class,
		one = @One(select = "com.five.mapper.RegeditMapper.getDoctorByid"))
	})
	List<Arrange> argeAll(@Param("page")int page,@Param("off")int off);
	
	// 获取排班的数量
	@Select("SELECT count(a_id) FROM arrange")
	int countArge();
	
	//添加排班信息
	@Insert("INSERT INTO arrange(a_id,a_time,d_id) VALUES(#{id},#{time},#{doct.id})")
	@Options(useGeneratedKeys = true, keyProperty = "id")
	void addArge(Arrange arrange);

	//修改排班信息
	@Update("UPDATE arrange SET a_time=#{time},d_id=#{doct.id} WHERE a_id=#{id}")
	void alterArge(Arrange arrange);
	
	//删除排班信息
	@Delete("DELETE FROM arrange WHERE a_id=#{id}")
	void deleteArge(int id);
	
	//获取所有科室信息
	@Select("SELECT * FROM department limit #{off} offset ${page * off}")
	@Results(id="deptMap", value = {
		@Result(id=true,column = "dp_id",property = "id"),
		@Result(column = "dp_name",property = "name"),
		@Result(column = "dp_id",property  = "subdept" ,javaType = List.class,
				many = @Many(select = "com.five.mapper.RegeditMapper.selectsubmAll"))
	})
	List<Department> deptAll(@Param("page")int page,@Param("off")int off);
	
	// 获取科室的数量
	@Select("SELECT count(dp_id) FROM department")
	int countDept();
	
	// 获取指定科室信息
	@Select("select * from department where dp_id = #{id}")
	@ResultMap({"deptMap"})
	Department getDeptByid(int id);
	
	//添加科室信息
	@Insert("INSERT INTO department(dp_name) VALUES(#{name})")
	@Options(useGeneratedKeys = true, keyProperty = "id")
	void addDept(Department department);
	
	//修改科室信息
	@Update("UPDATE department SET dp_name=#{name} WHERE dp_id=#{id}")
	void alterDept(Department department);
	
	//删除科室信息
	@Delete("DELETE FROM department WHERE dp_id=#{id}")
	void deleteDept(int id);
	
	// 获取所有子科室的信息
	@Select("SELECT * FROM subment limit #{off} offset ${page * off}")
	@Results(id="submentMap", value = {
			@Result(id=true,column = "s_id",property = "id"),
			@Result(column = "s_name",property = "name"),
			@Result(column = "dp_id",property  = "dept" ,javaType = Department.class,
			one = @One(select = "com.five.mapper.PersonnelMapper.getDeptByid"))
		})
	List<Subment> submentAll(@Param("page")int page,@Param("off")int off);
	
	// 获取子科室的数量
	@Select("SELECT count(s_id) FROM subment")
	int countSubment();
	
	// 添加子科室的信息
	@Insert("INSERT INTO subment(s_name,dp_id) VALUES(#{name},#{dept.id})")
	@Options(useGeneratedKeys = true, keyProperty = "id")
	void addSubment(Subment subment);
	
	// 修改子科室的信息
	@Update("UPDATE subment SET s_name=#{name},dp_id=#{dept.id} WHERE s_id=#{id}")
	void alterSubment(Subment subment);
	
	// 删除子科室的信息
	@Delete("DELETE FROM subment WHERE s_id=#{id}")
	void deleteSubment(int id);
	
	// 获取所有的挂号信息
	@Select("SELECT * FROM register limit #{off} offset ${page * off}")
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
	List<Regedit> regAll(@Param("page")int page,@Param("off")int off);
	
	// 获取挂号的数量
	@Select("SELECT count(rt_id) FROM register")
	int countReg();
	
	// 获取指定挂号信息
	@Select("select * from register where rt_id = #{id}")
	@ResultMap({"regMap"})
	Regedit getRegByid(int id);
	
	//获取所有处方信息
	@Select("SELECT * FROM prescript limit #{off} offset ${page * off}")
	@Results({
		@Result(id=true,column = "pt_id",property = "id"),
		@Result(column = "pt_sym",property = "sym"),
		@Result(column = "pt_content",property = "content"),
		@Result(column = "pt_time",property = "time"),
		@Result(column = "rt_id",property  = "reg" ,javaType = Regedit.class,
		one = @One(select = "com.five.mapper.PersonnelMapper.getRegByid"))
	})
	List<Prescript> prescriptAll(@Param("page")int page,@Param("off")int off);
	
	// 获取处方的数量
	@Select("SELECT count(pt_id) FROM prescript")
	int countPrescript();
	
}
