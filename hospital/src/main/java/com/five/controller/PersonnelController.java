package com.five.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.five.mapper.PersonnelMapper;
import com.five.pojo.Arrange;
import com.five.pojo.Department;
import com.five.pojo.Doctor;
import com.five.pojo.Patient;
import com.five.pojo.Prescript;
import com.five.pojo.Regedit;
import com.five.pojo.Subment;
import com.five.service.PersonnelService;
import com.five.service.impl.PersonnelServiceImpl;


/**
 * 	人事管理的控制器
 * @author 俞峰龙
 *
 */
@RestController
@RequestMapping("/hr")
public class PersonnelController {
	
	// 自动注入人事接口的实现类
	@Autowired
	PersonnelService ps;
	
	// 获取分页后得到的患者
	@GetMapping("/pant")
	public Map<String , Object> allPant(@RequestParam( name = "p",defaultValue = "0") int page){
		Map<String , Object> map = new HashMap<>();
		// 设置一页显示多少数据
		int off = 2;
		// 将分页获取的数据添加到集合中
		map.put("content", ps.getPant(page, off));
		// 将当前页添加到集合中
		map.put("size", off);
		// 将总数据数添加到集合中
		map.put("count", ps.countPant());
		// 返回集合
		return map;
	}
	
	// 添加患者
	@PostMapping("/pant")
	public Patient addPant(@RequestBody Patient patient) {
		return ps.addPant(patient);
	}
	
	// 修改患者
	@PutMapping("/pant/{id}")
	public void alterPant(@PathVariable int id,@RequestBody Patient patient) {
		patient.setId(id);
		ps.alterPant(patient);
	}
		
	// 删除患者
	@DeleteMapping("/pant/{id}")
	public void deletePant(@PathVariable int id) {
		ps.delPant(id);
	}
	
	// 获取分页后得到的医生
	@GetMapping("/doct")
	public Map<String , Object> allDoct(@RequestParam( name = "p",defaultValue = "0") int page){
		Map<String , Object> map = new HashMap<>();
		// 设置一页显示多少数据
		int off = 2;
		// 将分页获取的数据添加到集合中
		map.put("content", ps.getDoct(page, off));
		// 将当前页添加到集合中
		map.put("size", off);
		// 将总数据数添加到集合中
		map.put("count", ps.countDoct());
		// 返回集合
		return map;
	}
	
	// 添加医生
	@PostMapping("/doct")
	public Doctor addDoct(@RequestBody Doctor doctor) {
		return ps.addDoct(doctor);
	}
	
	// 修改医生
	@PutMapping("/doct/{id}")
	public void alterDoct(@PathVariable int id,@RequestBody Doctor doctor) {
		doctor.setId(id);
		ps.alterDoct(doctor);
	}
		
	// 删除医生
	@DeleteMapping("/doct/{id}")
	public void deleteDoct(@PathVariable int id) {
		ps.delDoct(id);
	}
	
	// 获取分页后得到的科室
	@GetMapping("/dept")
	public Map<String , Object> allDept(@RequestParam( name = "p",defaultValue = "0") int page){
		Map<String , Object> map = new HashMap<>();
		// 设置一页显示多少数据
		int off = 2;
		// 获取表数据的数量
		int count = ps.countDept();
		// 将分页获取的数据添加到集合中
		map.put("content", ps.getDept(page, off));
		// 将当前页添加到集合中
		map.put("number", page);
		// 将总页数添加到集合中
		map.put("totalPages", count/off+(count%off==0?0:1));
		// 返回集合
		return map;
	}
	
	// 添加科室
	@PostMapping("/dept")
	public Department addDept(@RequestBody Department dept) {
		return ps.addDept(dept);
	}
	
	// 修改科室
	@PutMapping("/dept/{id}")
	public void alterDept(@PathVariable int id,@RequestBody Department dept) {
		dept.setId(id);
		ps.alterDept(dept);
	}
		
	// 删除科室
	@DeleteMapping("/dept/{id}")
	public void deleteDept(@PathVariable int id) {
		ps.delDept(id);
	}
	
	// 获取分页后得到的子科室
	@GetMapping("/subment")
	public Map<String , Object> allSubment(@RequestParam( name = "p",defaultValue = "0") int page){
		Map<String , Object> map = new HashMap<>();
		// 设置一页显示多少数据
		int off = 2;
		// 将分页获取的数据添加到集合中
		map.put("content", ps.getSubment(page, off));
		map.put("Allcontent", ps.getSubment(0, ps.countSubment()));
		// 将当前页添加到集合中
		map.put("size", off);
		// 将总数据数添加到集合中
		map.put("count", ps.countSubment());
		// 返回集合
		return map;
	}
	
	// 添加子科室
	@PostMapping("/subment")
	public Subment addSubment(@RequestBody Subment subment) {
		return ps.addSubment(subment);
	}
	
	// 修改子科室
	@PutMapping("/subment/{id}")
	public void alterSubment(@PathVariable int id,@RequestBody Subment subment) {
		subment.setId(id);
		ps.alterSubment(subment);
	}
		
	// 删除子科室
	@DeleteMapping("/subment/{id}")
	public void deleteSubment(@PathVariable int id) {
		ps.delSubment(id);
	}
	
	// 获取分页后得到的排班
	@GetMapping("/arge")
	public Map<String , Object> allArge(@RequestParam( name = "p",defaultValue = "0") int page){
		Map<String , Object> map = new HashMap<>();
		// 设置一页显示多少数据
		int off = 2;
		// 获取表数据的数量
		int count = ps.countArge();
		// 将分页获取的数据添加到集合中
		map.put("content", ps.getArge(page, off));
		// 将当前页添加到集合中
		map.put("number", page);
		// 将总页数添加到集合中
		map.put("totalPages", count/off+(count%off==0?0:1));
		// 返回集合
		return map;
	}
	
	// 添加排班
	@PostMapping("/arge")
	public Arrange addArge(@RequestBody Arrange arge) {
		return ps.addArge(arge);
	}
	
	// 修改排班
	@PutMapping("/arge/{id}")
	public void alterArge(@PathVariable int id,@RequestBody Arrange arge) {
		arge.setId(id);
		ps.alterArge(arge);
	}
		
	// 删除排班
	@DeleteMapping("/arge/{id}")
	public void deleteArge(@PathVariable int id) {
		ps.delArge(id);
	}
	
	// 获取分页后得到的挂号记录
	@GetMapping("/reg")
	public Map<String , Object> allReg(@RequestParam( name = "p",defaultValue = "0") int page){
		Map<String , Object> map = new HashMap<>();
		// 设置一页显示多少数据
		int off = 2;
		// 获取表数据的数量
		int count = ps.countReg();
		// 将分页获取的数据添加到集合中
		map.put("content", ps.getReg(page, off));
		// 将当前页添加到集合中
		map.put("number", page);
		// 将总页数添加到集合中
		map.put("totalPages", count/off+(count%off==0?0:1));
		// 返回集合
		return map;
	}
	
	// 获取分页后得到的处方记录
	@GetMapping("/prescript")
	public Map<String , Object> allPrescript(@RequestParam( name = "p",defaultValue = "0") int page){
		Map<String , Object> map = new HashMap<>();
		// 设置一页显示多少数据
		int off = 2;
		// 获取表数据的数量
		int count = ps.countPrescript();
		// 将分页获取的数据添加到集合中
		map.put("content", ps.getPrescript(page, off));
		// 将当前页添加到集合中
		map.put("number", page);
		// 将总页数添加到集合中
		map.put("totalPages", count/off+(count%off==0?0:1));
		// 返回集合
		return map;
	}
	
}
