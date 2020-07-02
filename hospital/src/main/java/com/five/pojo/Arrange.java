package com.five.pojo;

/**
 * 排班表
 * @author 俞峰龙
 *
 */

public class Arrange {
	
	// 排班编号
	private int id;
	
	// 排班时间
	private String time;
	
	// 医生编号
	Doctor doct;
	
	// 构造方法
	public Arrange() {
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

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public Doctor getDoct() {
		return doct;
	}

	public void setDoct(Doctor doct) {
		this.doct = doct;
	}

	
}
