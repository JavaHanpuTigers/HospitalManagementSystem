package com.five.service.impl;

import java.util.HashMap;
import java.util.Map;

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
//	final String[] strs= {"d_id","p_id","pn_id","doctor","patient","personnel"};
    @Autowired
    private UserMapper userMapper;
    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
    	//根据用户名查询用户返回用户实体的方式   	
    	User user = userMapper.selectOne(s);
    	Map<String, Object> map=new HashMap<String, Object>();
    	switch (user.getRole().getId()) {
		case 1:
			map.put("uid", user.getId());
			map.put("rid", "p_id");
			map.put("from", "patient");
			break;
		case 2:
			map.put("uid", user.getId());
			map.put("rid", "d_id");
			map.put("from", "doctor");
			break;
		case 3:
			map.put("uid", user.getId());
			map.put("rid", "pn_id");
			map.put("from", "personnel");
			break;
		default:
			break;
		}
    	JwtUser ju = new JwtUser(user);
    	ju.setPatid(userMapper.selectId(map));

        return ju;
    }
}

