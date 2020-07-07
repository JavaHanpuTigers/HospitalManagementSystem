package com.five.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.One;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import com.five.pojo.Role;
import com.five.pojo.User;

@Mapper
public interface UserMapper {
	
	@Select("select * from user where u_name = #{name}")
	@Results({
		@Result(column = "u_id",property = "id",id = true),
		@Result(column = "u_name",property = "name"),
		@Result(column = "u_password",property = "password"),
		@Result(column = "r_id",property = "role" ,javaType = Role.class,
				one = @One(select = "com.five.mapper.UserMapper.selectRole")
		),
	})
	User selectOne(String name);
	
	@Select("select * from role where r_id = #{id}")
	@Results({
		@Result(column = "r_id",property = "id"),
		@Result(column = "r_name",property = "name")
	})
	Role selectRole(int id);
	
	@Select("select p_id from patient where u_id = #{id}")
	int selectId(int id);
}
