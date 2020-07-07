package com.five.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import com.five.filter.JwtUser;
import com.five.service.impl.UserDetailsServiceImpl;


@Component
public class MyAuthenticationProvider implements AuthenticationProvider{
	
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
		JwtUser u = (JwtUser)userDetailsService.loadUserByUsername(name);
		
		return new UsernamePasswordAuthenticationToken(u, "asdfadsf", u.getAuthorities());
	}

	@Override
	public boolean supports(Class<?> authentication) {
		// TODO Auto-generated method stub
		return true;
	}

}
