package com.five.pojo;

// 用户类
public class User {
	
	private int id; //用户id
	
	private String name; //用户姓名
	
	private String password; //用户密码
	
	private int role; // 用户角色

	
	
	public User() {
	}



	public User(int id, String name, String password, int role) {
		super();
		this.id = id;
		this.name = name;
		this.password = password;
		this.role = role;
	}

	
	
	public int getId() {
		return id;
	}



	public void setId(int id) {
		this.id = id;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public String getPassword() {
		return password;
	}



	public void setPassword(String password) {
		this.password = password;
	}



	public int getRole() {
		return role;
	}



	public void setRole(int role) {
		this.role = role;
	}



	public String toString() {
		return "User [id=" + id + ", name=" + name + ", password=" + password + ", role=" + role + "]";
	}
	
	
	
	
}
