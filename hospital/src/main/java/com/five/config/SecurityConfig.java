package com.five.config;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.five.filter.JWTAuthenticationFilter;
import com.five.filter.JWTAuthorizationFilter;
import com.five.service.impl.UserDetailsServiceImpl;

// spring 安全访问配置
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
    @Qualifier("userDetailsServiceImpl")
    private UserDetailsServiceImpl userDetailsService;

	
	// 认证
	//@Override
//	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//		// TODO Auto-generated method stub
//		//super.configure(auth);
//		//基于数据库的
//		auth.jdbcAuthentication()
//			.passwordEncoder(new BCryptPasswordEncoder())
//			.dataSource(getDataSource())
//			.usersByUsernameQuery("select u_name,u_password,r_id from user where u_name = ?")
//			.authoritiesByUsernameQuery("SELECT u_name,r_name FROM role LEFT JOIN USER ON role.`r_id` = `user`.`r_id` WHERE u_name = ?");
//	}
	
	// 权限	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// TODO Auto-generated method stub
		//super.configure(http);
		
		http
		
		.authorizeRequests()
			
			.antMatchers("/","/login/*","/user/*").permitAll()
			//.antMatchers("/reg","/reg/*").hasRole("患者")
			.antMatchers("/reg","/reg/*").hasRole("患者")
			.antMatchers("/doct","/doct/*").hasRole("医生")
			.antMatchers("/hr","/hr/*").hasRole("人事")
			//github.com/JavaHanpuTigers/HospitalManagementSystem.git
			//.antMatchers("/admin","/admin/*").hasRole("ADMIN")
			//.anyRequest().authenticated()
			.and()
		.formLogin()
		
		.and()
		
		.addFilter(new JWTAuthenticationFilter(authenticationManager()))
        .addFilter(new JWTAuthorizationFilter(authenticationManager()))
        
        .csrf().disable();
       //.addFilter(new CorsFilter(this.corsConfigurationSource()))
        	// 不需要session
//        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		// 关闭网站拦截工具
		
		//.httpBasic();
		//http.authorizeRequests().and().csrf().disable();
	}
	


	 @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
        return source;
    }
	

    @Autowired
    // 自定义用户验证
    MyAuthenticationProvider myAuthenticationProvider;
    // 认证
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//    	auth.jdbcAuthentication()
//		.passwordEncoder(new BCryptPasswordEncoder())
//		.dataSource(getDataSource())
//		.usersByUsernameQuery("select u_name,u_password,r_id from user where u_name = ?")
//		.authoritiesByUsernameQuery("SELECT u_name,r_name FROM role LEFT JOIN USER ON role.`r_id` = `user`.`r_id` WHERE u_name = ?");
        
    	
    	//
//    	auth.userDetailsService(userDetailsService)
//        .passwordEncoder(new BCryptPasswordEncoder());
    	
    	// 选用自定义的用户验证
    	auth.authenticationProvider(myAuthenticationProvider);
    	
    	
    }
    @Configuration
    public class CorsConf {
        @Bean
        public CorsFilter corsFilter() {
            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            CorsConfiguration corsConfiguration = new CorsConfiguration();
            corsConfiguration.addAllowedOrigin("*");
            corsConfiguration.addAllowedHeader("Content-Type,Authorization");
            corsConfiguration.addAllowedMethod("*");
            source.registerCorsConfiguration("/**", corsConfiguration);
            System.out.println("CorsConf" +".corsFilter" );
            return new CorsFilter(source);
        }
    }

}
