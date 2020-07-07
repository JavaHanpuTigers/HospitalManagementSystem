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
        //QueryWrapper<Employee> queryWrapper = new QueryWrapper<Employee>();
       // queryWrapper.eq("mobile",s);
    	//根据用户名查询用户返回用户实体的方式
    	System.out.println("asdfasdfasdfjasdjfalksfdjlkj:    "+s+"           ");
    	User user = userMapper.selectOne(s);
    	System.out.println(user);
    	JwtUser ju = new JwtUser(user);
    	ju.setPatid(userMapper.selectId(user.getId()));
    	System.out.println(ju);
        return ju;
    }
}

