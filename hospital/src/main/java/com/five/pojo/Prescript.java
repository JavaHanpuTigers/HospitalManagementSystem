package com.five.pojo;


/**
 * 处方表
 * @author 俞峰龙
 *
 */
public class Prescript {
	
	// 处方编号
	private int id;
	
	// 症状信息
	private String sym;
	
	// 处方内容
	private String content;
	
	// 开处方内容
	private String time;
	
	// 挂号编号
	Regedit reg;

	// 构造方法
	public Prescript() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	// 属性的get和set的方法
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getSym() {
		return sym;
	}

	public void setSym(String sym) {
		this.sym = sym;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public Regedit getReg() {
		return reg;
	}

	public void setReg(Regedit reg) {
		this.reg = reg;
	}
	
}
