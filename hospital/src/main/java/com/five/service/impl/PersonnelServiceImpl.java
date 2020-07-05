package com.five.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.five.mapper.PersonnelMapper;
import com.five.pojo.Arrange;
import com.five.pojo.Department;
import com.five.pojo.Doctor;
import com.five.pojo.Patient;
import com.five.pojo.Prescript;
import com.five.pojo.Regedit;
import com.five.pojo.Subment;
import com.five.service.PersonnelService;

/**
 * 	人事相关接口的实现类
 * @author 俞峰龙
 *
 */
@Service
public class PersonnelServiceImpl implements PersonnelService {
	
	// 自动注入
	@Autowired
	PersonnelMapper pm;

	// 获得所有患者信息
	@Override
	public List<Patient> getPant(int page, int off) {
		return pm.pantAll(page, off);
	}

	// 获取患者的数量
	@Override
	public int countPant() {
		return pm.countPant();
	}

	// 添加患者信息
	@Override
	public Patient addPant(Patient patient) {
		pm.addPant(patient);
		return patient;
	}

	// 修改患者信息
	@Override
	public void alterPant(Patient patient) {
		pm.alterPant(patient);
	}

	// 删除患者信息
	@Override
	public void delPant(int id) {
		pm.deletePant(id);
	}

	// 获得所有医生信息
	@Override
	public List<Doctor> getDoct(int page, int off) {
		return pm.doctAll(page, off);
	}

	// 获取医生的数量
	@Override
	public int countDoct() {
		return pm.countPant();
	}

	// 添加医生信息
	@Override
	public Doctor addDoct(Doctor doctor) {
		pm.addDoct(doctor);
		return doctor;
	}

	// 修改医生信息
	@Override
	public void alterDoct(Doctor doctor) {
		pm.alterDoct(doctor);
	}

	// 删除医生信息
	@Override
	public void delDoct(int id) {
		pm.deleteDoct(id);
	}

	// 获得所有科室信息
	@Override
	public List<Department> getDept(int page, int off) {
		return pm.deptAll(page, off);
	}

	// 获取科室的数量
	@Override
	public int countDept() {
		return pm.countDept();
	}

	// 添加科室信息
	@Override
	public Department addDept(Department department) {
		pm.addDept(department);
		return department;
	}

	// 修改科室信息
	@Override
	public void alterDept(Department department) {
		pm.alterDept(department);
	}

	// 删除科室信息
	@Override
	public void delDept(int id) {
		pm.deleteDept(id);
	}

	// 获得所有子科室信息
	@Override
	public List<Subment> getSubment(int page, int off) {
		return pm.submentAll(page, off);
	}

	// 获取子科室的数量
	@Override
	public int countSubment() {
		return pm.countSubment();
	}

	// 添加子科室信息
	@Override
	public Subment addSubment(Subment subment) {
		pm.addSubment(subment);
		return subment;
	}

	// 修改子科室信息
	@Override
	public void alterSubment(Subment subment) {
		pm.alterSubment(subment);
	}

	// 删除子科室信息
	@Override
	public void delSubment(int id) {
		pm.deleteSubment(id);
	}

	// 获得所有排班信息
	@Override
	public List<Arrange> getArge(int page, int off) {
		return pm.argeAll(page, off);
	}

	// 获取排班的数量
	@Override
	public int countArge() {
		return pm.countArge();
	}

	// 添加排班信息
	@Override
	public Arrange addArge(Arrange arrange) {
		pm.addArge(arrange);
		return arrange;
	}

	// 修改排班信息
	@Override
	public void alterArge(Arrange arrange) {
		pm.alterArge(arrange);
	}

	// 删除排班信息
	@Override
	public void delArge(int id) {
		pm.deleteArge(id);
	}

	// 获得所有挂号记录信息
	@Override
	public List<Regedit> getReg(int page, int off) {
		return pm.regAll(page, off);
	}

	// 获取挂号的数量
	@Override
	public int countReg() {
		return pm.countReg();
	}

	// 获得所有处方信息
	@Override
	public List<Prescript> getPrescript(int page, int off) {
		return pm.prescriptAll(page, off);
	}

	// 获取处方的数量
	@Override
	public int countPrescript() {
		return pm.countPrescript();
	}	

}
