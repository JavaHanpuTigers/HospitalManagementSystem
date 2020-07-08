package com.five.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.One;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.five.pojo.Patient;
import com.five.pojo.User;

@Mapper
public interface UserInfoMapper {
	
		// 增加用户账号
		@Options(useGeneratedKeys = true, keyProperty = "id")
		@Insert("INSERT INTO `user`(r_id,u_name,u_password) VALUES(1,#{name},#{password})")
		int addUser(User user);
	
		// 增加患者信息
		@Insert("INSERT INTO patient(u_id,p_card,p_name,p_age,p_nation,p_sex) VALUES(#{user.id},#{card},#{name},#{age},#{nation},#{sex})")
		@Options(useGeneratedKeys = true, keyProperty = "id")
		int addUserPatient(Patient patient);
		
		// 查询用户信息
		@Select("SELECT patient.* FROM `user`,patient WHERE `user`.u_id=patient.`u_id` AND `patient`.`u_id`=#{id}")
		@Results({
			@Result(id=true,column = "p_id",property = "id"),
			@Result(column = "p_name",property = "name"),
			@Result(column = "p_age",property = "age"),
			@Result(column = "p_nation",property = "nation"),
			@Result(column = "p_sex",property = "sex"),
			@Result(column = "p_card",property = "card"),
			@Result(column = "u_id",property  = "user" ,javaType = User.class,
			one = @One(select = "com.five.mapper.RegeditMapper.getUserByid"))
		})
		Patient findUser(int id);
		
		//修改用户登录密码
		@Update("UPDATE `user` SET u_password=#{password} WHERE u_id=#{id}")
		int updateWord(User user);
		
}
