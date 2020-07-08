package com.five.pojo;
/**
 * @author FunBoy
 *	@date 2020年7月2日
 * 	文件说明：医生表
 */
public class Doctor {
	
	private int id; // 医生ID
	
	private String name; // 医生姓名
	
	private String sex; // 医生性别
	
	private int age; // 医生年龄
	
	private String nation; // 医生民族
	
	private String title; // 医生职称
	
	private double fee; // 就诊费用
	
	private Subment subment; // 子科室信息
	
	private User user; // 用户信息角色
	
	private Arrange arrange; // 医生排班信息
	
	
	
	public Doctor(int id) {
		super();
		this.id = id;
	}

	
	
	public Doctor() {
		super();
		// TODO Auto-generated constructor stub
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
	
	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
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

	public double getFee() {
		return fee;
	}

	public void setFee(double fee) {
		this.fee = fee;
	}

	public Subment getSubment() {
		return subment;
	}

	public void setSubment(Subment subment) {
		this.subment = subment;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Arrange getArrange() {
		return arrange;
	}

	public void setArrange(Arrange arrange) {
		this.arrange = arrange;
	}
	
	
}
