package com.five.mapper;

import java.util.List;

import javax.websocket.server.PathParam;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Many;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.One;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import com.five.pojo.Arrange;
import com.five.pojo.Department;
import com.five.pojo.Doctor;
import com.five.pojo.Regedit;
import com.five.pojo.Subment;
import com.five.pojo.User;

/**
 * 	挂号相关从mapper
 * @author zll
 *
 */

@Mapper
public interface RegeditMapper {
	
	@Select("select * from doctor where s_id = #{id}")
	@Results( id="doctMap",value =  {
		@Result(id = true,column = "d_id",property  = "id"),
		@Result(column = "d_name",property  = "name"),
		@Result(column = "d_sex",property  = "sex"),
		@Result(column = "d_age",property  = "age"),
		@Result(column = "d_nation",property  = "nation"),
		@Result(column = "d_title",property  = "title"),
		@Result(column = "d_fee",property  = "fee"),
			@Result(column = "s_id",property  = "subment" ,javaType = Subment.class,
				one = @One(select = "com.five.mapper.RegeditMapper.getSubmentByid")
					),
	
	})
	// 获取指定科室的全部医生
	public List<Doctor> doctorAll(int id);
	
	@Select("select * from doctor where d_id = #{id}")
	@ResultMap({"doctMap"})
	// 获取指定的医生
	public Doctor getDoctorByid(int id);
	
	
	@Select("select * from subment where s_id = #{id}")
	@Results( id="submentMap",value = {
		@Result(id = true ,column = "s_id",property = "id"),
		@Result(id = true ,column = "s_name",property = "name")
		
	})
	//  查询指定id的子科室信息
	public Subment getSubmentByid(int id);
	
	@Select("select * from user where u_id = #{id}")
	@Results({
		@Result(id = true,column = "u_id" ,property = "id"),
		@Result(column = "u_name",property = "name")
	})
	// 查询指定id的user信息
	public User getUserByid(int id);
	
	
	@Select("SELECT * FROM department ") //LEFT JOIN subment ON department.`dp_id` = subment.`dp_id`
	@Results( id="deparMap" ,value = {
		@Result(id = true,column = "dp_id",property = "id"),
		@Result(column = "dp_name",property = "name"),
		@Result(
				column = "dp_id",property = "subdept",javaType = List.class,
				many = @Many(select = "com.five.mapper.RegeditMapper.selectsubmAll")
				) 
	})
	// 查询全部科室和子科室
	public List<Department>  selectDeparAll();
	
	// 查询科室id下的子科室
	@Select("select * from subment where dp_id = #{id}")
	@ResultMap({"submentMap"})
	public List<Subment> selectsubmAll(int id);
	
	//查询全部挂号信息
	@Select("SELECT * FROM register where p_id = #{id}")
	@Results({
		@Result(column = "rt_id",property = "id"),
		@Result(column = "rt_time",property = "time"),
		@Result(column = "rt_date",property = "date"),
		@Result(column = "rt_name",property = "name"),
		@Result(column = "rt_sex",property = "sex"),
		@Result(column = "rt_card",property = "card"),
		@Result(column = "rt_nation",property = "nation"),
		@Result(column = "rt_fee",property = "fee"),
		@Result(column = "rt_phone",property = "phone"),
		@Result(column = "rt_state",property = "state"),
	})
	public List<Regedit> selectRegAll(int id);
	
	// 查询医生的排班时间
	@Select("select * from arrange where d_id = #{id}")
	@Results({
		@Result(id = true,column = "a_id",property = "id"),
		@Result(column = "a_time",property = "time")
	})
	public Arrange selectByDoctArrange(int id);
	
	// 查询当前时间下的医生
	@Select("SELECT doctor.* FROM doctor LEFT JOIN arrange ON doctor.`d_id` = arrange.`d_id` "
			+ "WHERE arrange.`a_time` LIKE'%${date}%' AND s_id = #{id}")//
	//@Select("select * from doctor where s_id = #{id}")
	@ResultMap({"doctMap"})
	List<Doctor> doctorDateAll( int id,int date);
	
	// 插入挂号信息
	@Insert("INSERT INTO register(p_id,d_id,rt_time,rt_date,rt_name,rt_sex,rt_card,rt_nation,rt_fee,rt_phone,rt_state)"
			+ " VALUES(#{pant.id},#{doct.id},#{time},#{date},#{name},#{sex},#{card},#{nation},#{fee},#{phone},6);")
	@Options(useGeneratedKeys = true,keyProperty = "id")
	int insertReg(Regedit reg);
	
	// 查询当前时间段的挂号人数
	@Select("SELECT COUNT(rt_id) FROM register WHERE "
			+ "rt_date BETWEEN #{begin} AND #{finish};")
	int selectDateCount(String begin ,String finish);
}
