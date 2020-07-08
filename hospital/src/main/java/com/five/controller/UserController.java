package com.five.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.five.exception.CreateUserPatientException;
import com.five.pojo.Patient;
import com.five.pojo.User;
import com.five.service.impl.UserInfoServiceImpl;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserInfoServiceImpl userInfoServiceImpl;
	
	@PostMapping("/add")
	// 添加患者用户
	public void create(@RequestBody Patient patient) {
		try {
			userInfoServiceImpl.createUserPatient(patient);
			System.out.println("注册患者成功");
		} catch (CreateUserPatientException e) {
			e.printStackTrace();
		}
	} 
	
	@GetMapping("/info")
	// 查询账户信息
	public User findUser(User user) {
		return userInfoServiceImpl.findByUser(user.getId());
	}
	
	@GetMapping("/pwd")
	// 修改当前密码
	public User updateWord(@RequestBody User user) {
		userInfoServiceImpl.updateWord(user);
		return user;
	}
	
}
