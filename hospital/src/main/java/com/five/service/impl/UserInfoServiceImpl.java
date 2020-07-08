package com.five.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import com.five.exception.CreateUserPatientException;
import com.five.mapper.UserInfoMapper;
import com.five.pojo.Patient;
import com.five.pojo.User;
import com.five.service.UserInfoService;

@Service
public class UserInfoServiceImpl implements UserInfoService{
	
	@Autowired
	UserInfoMapper userinfomapper;
	
	@Override
	// 创建一个患者用户
	@Transactional(rollbackFor = CreateUserPatientException.class,isolation = Isolation.DEFAULT)
	public int createUserPatient(Patient patient) throws CreateUserPatientException {
		userinfomapper.addUser(patient.getUser());
		if(patient.getUser().getId() == 0) {
			throw new CreateUserPatientException();
		}
		return userinfomapper.addUserPatient(patient);
	}

	@Override
	// 创建一个用户
	public int createUser(User user) {
		return userinfomapper.addUser(user);
	}
	
	
	@Override
	// 查询当前用户信息
	public Patient findByUser(int id) {
		return userinfomapper.findUser(id);
	}

	@Override
	// 修改当前用户密码
	@Transactional
	public int updateWord(User user) {
		userinfomapper.findUser(user.getId());
		return userinfomapper.updateWord(user);
	}

}