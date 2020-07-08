package com.five.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.five.filter.JwtUser;
import com.five.mapper.RegeditMapper;
import com.five.mapper.UserMapper;
import com.five.pojo.User;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {

    	//根据用户名查询用户返回用户实体的方式
    	User user = userMapper.selectOne(s);
    	JwtUser ju = new JwtUser(user);
    	ju.setPatid(userMapper.selectId(user.getId()));
    	
        return ju;
    }
}

