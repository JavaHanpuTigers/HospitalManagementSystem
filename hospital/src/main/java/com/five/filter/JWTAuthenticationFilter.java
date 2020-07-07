package com.five.filter;


import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.five.pojo.Role;
import com.five.pojo.User;
 
/**
 * token的校验
 * 该类继承自BasicAuthenticationFilter，在doFilterInternal方法中，
 * 从http头的Authorization 项读取token数据，然后用Jwts包提供的方法校验token的合法性。
 * 如果校验通过，就认为这是一个取得授权的合法请求
 * @author zhaoxinguo on 2017/9/13.
 */
//验证用户登录信息的拦截器
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {//UsernamePasswordAuthenticationFilter拦截登陆请求
  private AuthenticationManager authenticationManager;
//登陆页面
  public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
      this.authenticationManager = authenticationManager;
      //super.setFilterProcessesUrl("/user/login");
  }
  @Override
  public Authentication attemptAuthentication(HttpServletRequest request,
                                              HttpServletResponse response) throws AuthenticationException {
      // 从输入流中获取到登录的信息,通过输入的信息框架去数据库中查找是否匹配，然后成功或者失败，结束
      response.setHeader("Access-Control-Allow-Origin", "*");
      response.setHeader("Access-Control-Allow-Methods", "*");
      response.setHeader("Access-Control-Max-Age", "3600");
      response.setHeader("Access-Control-Allow-Headers", "*");
      if (request.getMethod().equals("OPTIONS")) {
          response.setStatus(HttpServletResponse.SC_OK);
          return null;
      }
//      response.setHeader("Access-Control-Allow-Headers","Authorization");
      String username = request.getParameter("username");
      String password = request.getParameter("password");
      User loginUser = new User();
      loginUser.setName(username);
      loginUser.setPassword(password);
     
     // new BCryptPasswordEncoder().(password);
      System.out.println("JWTAuthenticationFilter : "+loginUser);
      //LoginUser loginUser = new ObjectMapper().readValue(request.getInputStream(), LoginUser.class);
      //创建一个UsernamePasswordAuthenticationToken该token包含用户的角色信息，而不是一个空的ArrayList，查看一下源代码是有以下一个构造方法的。
    //调用authenticationManager.authenticate()让spring-security去进行验证就可以了，不用自己查数据库再对比密码了，这一步交给spring去操作
      return authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(loginUser.getName(), loginUser.getPassword(), new ArrayList<>())
      );
  }
 // 成功验证后调用的方法
  // 如果验证成功，就生成token并返回
  @Override
  protected void successfulAuthentication(HttpServletRequest request,
                                          HttpServletResponse response,
                                          FilterChain chain,
                                          Authentication authResult) throws IOException, ServletException {
      // 查看源代码会发现调用getPrincipal()方法会返回一个实现了`UserDetails`接口的对象
      // 所以就是JwtUser啦
	  System.out.println("这里是第一个拦截");
	  System.out.println("--------------------------------"+authResult.getPrincipal());
      JwtUser jwtUser = (JwtUser) authResult.getPrincipal();
//	  JwtUser jwtUser =null;
//	  
	 // org.springframework.security.core.userdetails.User us= ( org.springframework.security.core.userdetails.User)authResult.getPrincipal();
//	  Role r = new Role();
//	  r.setName((String)us.getAuthorities().toArray()[0]);
//	  User u = 
//			  new User( 1, us.getUsername(), us.getPassword(), r);
//	  
//	  jwtUser = new JwtUser(u);
      String role = "";
      // 因为在JwtUser中存了权限信息，可以直接获取，由于只有一个角色就这么干了
      Collection<? extends GrantedAuthority> authorities = jwtUser.getAuthorities();
      for (GrantedAuthority authority : authorities){
          System.out.println("鉴权"+authority.getAuthority());
          role = authority.getAuthority();
      }
      // 根据用户名，角色创建token
      
      String token = JwtTokenUtils.createToken(jwtUser.getUsername(), role,jwtUser.getPatid());
      // 但是这里创建的token只是单纯的token
      // 按照jwt的规定，最后请求的格式应该是 `Bearer token`
      response.setHeader("Access-Control-Expose-Headers", "token");
      response.setHeader("token", token);//JwtTokenUtils.TOKEN_PREFIX +
      //response.sendRedirect(location);
      //response.addHeader("token", token);
      //response.sendRedirect("/");
      //request.getRequestDispatcher("/").forward(request, response);
     
      System.out.println("成功返回token");
     // response.sendRedirect("/");
  }
  // 这是验证失败时候调用的方法
  @Override
  protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
	  System.out.println("验证失败！！！！！");
	  response.getWriter().write("authentication failed, reason: " + failed.getMessage());
  }
}


