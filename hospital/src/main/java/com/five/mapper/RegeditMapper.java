package com.five.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.One;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import com.five.pojo.Doctor;
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
		@Result(column = "u_id",property  = "user" ,javaType = User.class,
		one = @One(select = "com.five.mapper.RegeditMapper.getUserByid")
			)
	
	})
	public List<Doctor> doctorAll(int id);
	
	@Select("select * from doctor where d_id = #{id}")
	@ResultMap({"doctMap"})
	public Doctor getDoctorByid(int id);
	
	
	@Select("select * from subment where s_id = #{id}")
	@Results( id="submentMap",value = {
		@Result(id = true ,column = "s_id",property = "id"),
		@Result(id = true ,column = "s_name",property = "name")
		
	})
	public Subment getSubmentByid(int id);
	
	@Select("select * from user where u_id = #{id}")
	@Results({
		@Result(id = true,column = "u_id" ,property = "id"),
		@Result(column = "u_name",property = "name")
	})
	public User getUserByid(int id);
}
