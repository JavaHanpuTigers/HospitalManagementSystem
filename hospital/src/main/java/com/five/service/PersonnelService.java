package com.five.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Select;
import org.springframework.beans.factory.annotation.Autowired;

import com.five.exception.createPretException;
import com.five.mapper.PersonnelMapper;
import com.five.pojo.Arrange;
import com.five.pojo.Department;
import com.five.pojo.Doctor;
import com.five.pojo.Patient;
import com.five.pojo.Prescript;
import com.five.pojo.Regedit;
import com.five.pojo.Subment;
import com.five.pojo.User;

/**
 * 	人事相关的接口
 * 
 * @author 俞峰龙
 *
 */
public interface PersonnelService {
	
	void add(Doctor doct) throws createPretException;

	// 获得所有患者信息
	List<Patient> getPant(int page,int off);

	// 获取患者的数量
	int countPant();

	// 添加患者信息
	Patient addPant(Patient patient);

	// 修改患者信息
	void alterPant(Patient patient);

	// 删除患者信息
	void delPant(int id);

	// 获得所有医生信息
	List<Doctor> getDoct(int page,int off);

	// 获取医生的数量
	int countDoct();

	// 添加医生信息
	Doctor addDoct(Doctor doctor) throws createPretException;
	
	// 修改医生信息
	void alterDoct(Doctor doctor);

	// 删除医生信息
	void delDoct(int id);

	// 获得所有科室信息
	List<Department> getDept(int page,int off);

	// 获取科室的数量
	int countDept();

	// 添加科室信息
	Department addDept(Department department);

	// 修改科室信息
	void alterDept(Department department);

	// 删除科室信息
	void delDept(int id);

	// 获得所有子科室信息
	List<Subment> getSubment(int page,int off);

	// 获取子科室的数量
	int countSubment();

	// 添加子科室信息
	Subment addSubment(Subment subment);

	// 修改子科室信息
	void alterSubment(Subment subment);

	// 删除子科室信息
	void delSubment(int id);

	// 获得所有排班信息
	List<Arrange> getArge(int page,int off);

	// 获取排班的数量
	int countArge();

	// 添加排班信息
	Arrange addArge(Arrange arrange);

	// 修改排班信息
	void alterArge(Arrange arrange);

	// 删除排班信息
	void delArge(int id);

	// 获得所有挂号记录信息
	List<Regedit> getReg(int page,int off);

	// 获取挂号的数量
	int countReg();

	// 获得所有处方信息
	List<Prescript> getPrescript(int page,int off);

	// 获取处方的数量
	int countPrescript();

}
