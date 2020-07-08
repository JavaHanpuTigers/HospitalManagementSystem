package com.five.config;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.codec.Utf8;
import org.springframework.stereotype.Component;

import com.five.filter.JwtUser;
import com.five.service.impl.UserDetailsServiceImpl;


@Component
public class MyAuthenticationProvider implements AuthenticationProvider{
//	String name = "asdf";
//	String info = new String("assdfasdjjasfdj","utf-8");
	
	BCryptPasswordEncoder bcr = new BCryptPasswordEncoder();
	
	@Autowired
    @Qualifier("userDetailsServiceImpl")
    private UserDetailsServiceImpl userDetailsService;
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		// TODO Auto-generated method stub
		
		String name = authentication.getName();
		String pass = authentication.getCredentials().toString();
		System.out.println("authentication.getName()"+name);
		System.out.println("authentication.getCredentials().toString()"+pass);
		// 判断用户是否存在
		JwtUser u = (JwtUser)userDetailsService.loadUserByUsername(name);
		if (u == null) {
			throw new AuthenticationCredentialsNotFoundException("用户名密码错误！！！");
		}
		// 用户密码验证
		if (bcr.matches(pass, u.getPassword())) {
			System.out.println("密码成功");
			return new UsernamePasswordAuthenticationToken(u, "asdfadsf", u.getAuthorities());
		}else {
			System.out.println("密码失败");
			throw new AuthenticationCredentialsNotFoundException("用户名密码错误！！！");//"passroid xxxx 密码错误"
		}
		
		
	}

	@Override
	public boolean supports(Class<?> authentication) {
		// TODO Auto-generated method stub
		return true;
	}

}
