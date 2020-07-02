package com.five.pojo;

/**
 * 子科室表
 * @author 张磊磊
 *
 */
public class Subment {
	
	int id; // 子科室id
	
	String name; // 子科室名称
	 
	Department dept; // 科室id

	public Subment() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Subment(int id, String name, Department dept) {
		super();
		this.id = id;
		this.name = name;
		this.dept = dept;
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

	public Department getDept() {
		return dept;
	}

	public void setDept(Department dept) {
		this.dept = dept;
	}

	@Override
	public String toString() {
		return "Subment [id=" + id + ", name=" + name + ", dept=" + dept + "]";
	}
	
	
}
