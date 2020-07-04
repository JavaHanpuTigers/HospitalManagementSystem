package com.five.pojo;
/**
 * @author FunBoy
 *	@date 2020年7月2日
 * 	文件说明：挂号表
 */
public class Regedit {
	
		private int id; // 挂号ID
		
		private Patient pant; // 用户
	
		private Doctor doct; // 医生
	
		private String time; // 预约时间
	
		private String date; // 挂号时间
	
		private String name; // 患者姓名
		
		private String sex; // 患者性别
		
		private String card; // 患者身份证号码
		
		private String nation; // 患者民族
		
		private double fee; // 就诊费用
		
		private String state; // 患者状态

		
		
		public Regedit() {
			super();
			// TODO Auto-generated constructor stub
		}

		public Regedit(int id, Patient pant, Doctor doct, String time, String date, String name, String sex,
				String card, String nation, double fee, String state) {
			super();
			this.id = id;
			this.pant = pant;
			this.doct = doct;
			this.time = time;
			this.date = date;
			this.name = name;
			this.sex = sex;
			this.card = card;
			this.nation = nation;
			this.fee = fee;
			this.state = state;
		}

		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

		public Patient getPant() {
			return pant;
		}

		public void setPant(Patient pant) {
			this.pant = pant;
		}

		public Doctor getDoct() {
			return doct;
		}

		public void setDoct(Doctor doct) {
			this.doct = doct;
		}

		public String getTime() {
			return time;
		}

		public void setTime(String time) {
			this.time = time;
		}

		public String getDate() {
			return date;
		}

		public void setDate(String date) {
			this.date = date;
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

		public String getCard() {
			return card;
		}

		public void setCard(String card) {
			this.card = card;
		}

		public String getNation() {
			return nation;
		}

		public void setNation(String nation) {
			this.nation = nation;
		}

		public double getFee() {
			return fee;
		}

		public void setFee(double fee) {
			this.fee = fee;
		}

		public String getState() {
			return state;
		}

		public void setState(String state) {
			this.state = state;
		}

		@Override
		public String toString() {
			return "Regedit [id=" + id + ", pant=" + pant + ", doct=" + doct + ", time=" + time + ", date=" + date
					+ ", name=" + name + ", sex=" + sex + ", card=" + card + ", nation=" + nation + ", fee=" + fee
					+ ", state=" + state + "]";
		}

		
}
