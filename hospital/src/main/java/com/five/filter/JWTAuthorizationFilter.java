package com.five.filter;

import java.io.IOException;
import java.util.Collections;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

//验证用户权限的拦截器
//只要告诉spring-security该用户是否已登录，是什么角色，拥有什么权限就可以了
public class JWTAuthorizationFilter extends BasicAuthenticationFilter {
  public JWTAuthorizationFilter(AuthenticationManager authenticationManager) {
      super(authenticationManager);
  }
  @Override
  protected void doFilterInternal(HttpServletRequest request,
                                  HttpServletResponse response,
                                  FilterChain chain) throws IOException, ServletException {
      response.setHeader("Access-Control-Allow-Origin", "*");
      response.setHeader("Access-Control-Allow-Methods", "*");
      response.setHeader("Access-Control-Max-Age", "3600");
      response.setHeader("Access-Control-Allow-Headers", "*");
      if (request.getMethod().equals("OPTIONS")) {
          response.setStatus(HttpServletResponse.SC_OK);
          return;
      }
      String tokenHeader = request.getHeader(JwtTokenUtils.TOKEN_HEADER);
      System.out.println("授权1:"+tokenHeader);
      // 如果请求头中没有Authorization信息则直接放行了
      if (tokenHeader == null || !tokenHeader.startsWith(JwtTokenUtils.TOKEN_PREFIX)) {
          chain.doFilter(request, response);
          return;
      }
      // 如果请求头中有token，则进行解析，并且设置认证信息
      System.out.println("doFilterInternal---------------------------");
      SecurityContextHolder.getContext().setAuthentication(getAuthentication(tokenHeader));
     
      super.doFilterInternal(request, response, chain);
  }
  // 这里从token中获取用户信息并新建一个token
  //解析token，检查是否能从token中取出username，如果有就算成功了
  //再根据该username创建一个UsernamePasswordAuthenticationToken对象
  private UsernamePasswordAuthenticationToken getAuthentication(String tokenHeader) {
      String token = tokenHeader.replace(JwtTokenUtils.TOKEN_PREFIX, "");
      String username = JwtTokenUtils.getUsername(token);
      String role = JwtTokenUtils.getUserRole(token);
      int id = JwtTokenUtils.getUserId(token);
      System.out.println("ssd"+role);
      System.out.println("username:"+username);
      System.out.println("id:"+id);
      
      if (username != null){
          //假如能从token中获取用户名就该token验证成功
          //创建一个UsernamePasswordAuthenticationToken该token包含用户的角色信息，而不是一个空的ArrayList，查看一下源代码是有以下一个构造方法的。
          System.out.println("username:"+username);
    	  return new UsernamePasswordAuthenticationToken(username, role,
                  Collections.singleton(new SimpleGrantedAuthority(role))
          );
      }
      return null;
  }
}
