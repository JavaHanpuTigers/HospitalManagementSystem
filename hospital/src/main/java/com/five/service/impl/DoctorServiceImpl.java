package com.five.service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import com.five.exception.createPretException;
import com.five.mapper.DoctorMapper;
import com.five.pojo.Prescript;
import com.five.pojo.Regedit;
import com.five.service.DoctorService;

/**    
* @author: yesenchao
* @date: 2020年7月3日 上午9:08:11 
* @Description: 叫号面诊业务层
*/
@Service
public class DoctorServiceImpl implements DoctorService{
	@Autowired
	DoctorMapper dm;
	//查看预约信息
	@Override
	public List<Regedit> findRegState0All(int id) {
		// TODO Auto-generated method stub
		return dm.findRegState0All(id);
	}
	//叫号
	@Override
	public Regedit findRegState1ByOne(int id) {
		// TODO Auto-generated method stub
		return dm.findRegState1ByOne(id);
	}
	//患者排队信息
	@Override
	public List<Regedit> findRegState1All(int id) {
		// TODO Auto-generated method stub
		return dm.findRegState1All(id);
	}
	//更新状态
	@Override
	public boolean updateRegState(int id,String state) {
		// TODO Auto-generated method stub
		if(dm.updateRegState(state, id)>0) {
			return true;
		}
		return false;
	}
	//补号
	@Override
	public void createReg(Regedit reg) {
		// TODO Auto-generated method stub
		//获取时间
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String time=sdf.format(date);
		//设置挂号和预约时间
		reg.setTime(time);
		reg.setDate(time);
		dm.createReg(reg);
	}
	//查询处方记录信息
	@Override
	public List<Prescript> FindPretALL(int id) {
		// TODO Auto-generated method stub
		return dm.FindPretALL(id);
	}
	//开处方
	@Transactional(rollbackFor = createPretException.class,isolation = Isolation.SERIALIZABLE)
	@Override
	public void createPret(Prescript pret) throws createPretException {
		//获取时间
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String time=sdf.format(date);
		pret.setTime(time);
		if(dm.createPret(pret)==0) {
			throw new createPretException();
		}
		dm.updateRegState("5", pret.getReg().getId());
	}
	@Override
	public Prescript findPretById(int id) {
		// TODO Auto-generated method stub
		return dm.findPretById(id);
	}

}
