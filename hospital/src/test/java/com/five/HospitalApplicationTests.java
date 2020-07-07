package com.five;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.five.mapper.UserMapper;

@SpringBootTest
class HospitalApplicationTests {

	@Autowired
	UserMapper userMapper;
	
	@Test
	void contextLoads() {
		System.out.println("-------------");
		
		System.out.println(userMapper.selectOne("hz111"));
	}

}
