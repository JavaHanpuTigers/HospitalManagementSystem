package com.five.pojo;

import java.io.Serializable;

/**    
* @author: yesenchao
* @date: 2020年7月2日 上午10:48:40 
* @Description: 处方实体
*/
public class Prescript implements Serializable{
	private static final long serialVersionUID = -290666639087527383L;
	int id; //处方id
	String Sym; //症状信息 
	String content; //处方内容
	String time; //开处方时间
	int reg;   //挂号id
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getSym() {
		return Sym;
	}
	public void setSym(String sym) {
		Sym = sym;
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
	public int getReg() {
		return reg;
	}
	public void setReg(int reg) {
		this.reg = reg;
	}
	
}
