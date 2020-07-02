package com.five.config;



import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


// spring 安全访问配置
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	
	@Value("${spring.datasource.url}")
	String url ;
	
	@Value("${spring.datasource.username}")
	String user;
	
	@Value("${spring.datasource.password}")
	String password;
	
	@Bean
	public DataSource getDataSource() {
		
		DataSource d = (DataSource) DataSourceBuilder.create()
		.url(url)
		.username(user)
		.password(password)
		.build();
		
		 return d;
	}
	
	// 认证
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		// TODO Auto-generated method stub
		//super.configure(auth);
		//基于数据库的
		auth.jdbcAuthentication()
			.passwordEncoder(new BCryptPasswordEncoder())
			.dataSource(getDataSource())
			.usersByUsernameQuery("select u_name,u_password,r_id from user where u_name = ?")
			.authoritiesByUsernameQuery("SELECT u_name,r_name FROM role LEFT JOIN USER ON role.`r_id` = `user`.`r_id` WHERE u_name = ?");
	}
	
	// 权限
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// TODO Auto-generated method stub
		//super.configure(http);
		
		http
		.authorizeRequests()
			.antMatchers("/").permitAll()
			//.antMatchers("/user","/user/*").hasRole("USER")
			//.antMatchers("/admin","/admin/*").hasRole("ADMIN")
			//.anyRequest().authenticated()
			.and()
		.formLogin().and()
		.httpBasic();
	}
}
