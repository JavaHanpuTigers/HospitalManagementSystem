package com.five.filter;



import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.five.pojo.User;



public class JwtUser implements UserDetails {

    private int id;
    private String username;
    private String password;
    private String role;
    private int patid ;
    private Collection<? extends GrantedAuthority> authorities;
    public JwtUser() {
    }
    // 写一个能直接使用user创建jwtUser的构造器
    public JwtUser(User employee) {
        id = employee.getId();
        username = employee.getName();
        password = employee.getPassword();
        //这里只存贮了一个角色名
        authorities =  Collections.singleton(new SimpleGrantedAuthority(employee.getRole().getName()));
        System.out.println(this.toString()+"-------------------------------------");
    }
    // 获取权限信息，目前只会拿来存角色。。getAuthorities获取用户权限，springSecurity用来获取用户权限的方法
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
    // 账号是否未过期，默认是false，记得要改一下
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    // 账号是否未锁定，默认是false，记得也要改一下
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    // 账号凭证是否未过期，默认是false，记得还要改一下
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    //这个有点抽象不会翻译，默认也是false，记得改一下
    @Override
    public boolean isEnabled() {
        return true;
    }
	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}
	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return username;
	}
	
	public int getPatid() {
		return patid;
	}
	public void setPatid(int patid) {
		this.patid = patid;
	}
	@Override
	public String toString() {
		return "JwtUser [id=" + id + ", username=" + username + ", password=" + password + ", role=" + role + ", patid="
				+ patid + ", authorities=" + authorities + "]";
	}
	
	
}

