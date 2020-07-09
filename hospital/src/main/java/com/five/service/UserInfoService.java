package com.five.service;

import com.five.exception.CreateUserPatientException;
import com.five.pojo.Patient;
import com.five.pojo.User;

public interface UserInfoService {

	// 注册患者账号
	int createUserPatient(Patient patient) throws CreateUserPatientException;
	// 注册用户
	int createUser(User user);
	
	// 查询登录用户信息
	Patient findByUser(int id); 
	
	// 修改登录用户账号密码
	int updateWord(User user);
	
	// 忘记密码 找回密码
	int findWord(User user);
}
