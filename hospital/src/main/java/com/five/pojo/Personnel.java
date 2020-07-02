package com.five.pojo;

/**
 * 人事表
 * @author 俞峰龙
 *
 */

public class Personnel {
	
	// 人事编号
	private int id;
	
	// 人事姓名
	private String name;
	
	// 人事性别
	private String sex;
	
	// 人事年龄
	private int age;
	
	// 人事民族
	private String nation;
	
	// 人事职称
	private String title;
	
	// 用户编号
	User user;
	
	// 构造方法
	public Personnel() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	// 属性的get和set方法
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

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getNation() {
		return nation;
	}

	public void setNation(String nation) {
		this.nation = nation;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	
	
}
