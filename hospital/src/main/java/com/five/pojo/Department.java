package com.five.pojo;

import java.util.List;

/**
 * 	科室表
 * @author 张磊磊
 *
 */
public class Department {
	
	int id; // 科室id
	
	String name; // 科室名称
	
	List<Subment> subdept; // 子科室信息

	
	
	public Department() {
		super();
		// TODO Auto-generated constructor stub
	}



	public Department(int id, String name, List<Subment> subdept) {
		super();
		this.id = id;
		this.name = name;
		this.subdept = subdept;
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



	public List<Subment> getSubdept() {
		return subdept;
	}



	public void setSubdept(List<Subment> subdept) {
		this.subdept = subdept;
	}



	@Override
	public String toString() {
		return "Department [id=" + id + ", name=" + name + ", subdept=" + subdept + "]";
	}
	
	
}
