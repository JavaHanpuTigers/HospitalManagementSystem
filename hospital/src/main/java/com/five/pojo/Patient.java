package com.five.pojo;

/**
 *  患者表
 * @author 张磊磊
 *
 */
public class Patient {
	
	int id ; // 患者id
	
	String name; // 患者姓名
	
	String card; // 身份证号码
	
	int age; // 患者年龄
	
	String nation; // 患者民族
	
	String sex; // 患者性别
	
	User uer; // 用户id

	
	
	public Patient() {
		super();
		// TODO Auto-generated constructor stub
	}



	public Patient(int id, String name, String card, int age, String nation, String sex, User uer) {
		super();
		this.id = id;
		this.name = name;
		this.card = card;
		this.age = age;
		this.nation = nation;
		this.sex = sex;
		this.uer = uer;
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



	public String getCard() {
		return card;
	}



	public void setCard(String card) {
		this.card = card;
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



	public String getSex() {
		return sex;
	}



	public void setSex(String sex) {
		this.sex = sex;
	}



	public User getUer() {
		return uer;
	}



	public void setUer(User uer) {
		this.uer = uer;
	}



	@Override
	public String toString() {
		return "Patient [id=" + id + ", name=" + name + ", card=" + card + ", age=" + age + ", nation=" + nation
				+ ", sex=" + sex + ", uer=" + uer + "]";
	}
	
	
	
}
