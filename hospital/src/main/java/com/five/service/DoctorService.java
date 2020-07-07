package com.five.service;

import java.util.List;

import com.five.exception.createPretException;
import com.five.pojo.Prescript;
import com.five.pojo.Regedit;

/**    
* @author: yesenchao
* @date: 2020年7月3日 上午9:08:42 
* @Description: 叫号门诊业务接口
*/
public interface DoctorService {
	////查询预约信息
	public List<Regedit> findRegState0All(int id);
	//叫号
	public Regedit findRegState1ByOne(int id);
	//查询挂号排队信息
	public List<Regedit> findRegState1All(int id);
	//更新挂号状态
	public boolean updateRegState(int id,String state);
	//补号
	public void createReg(Regedit reg);
	//查询处方记录信息
	public List<Prescript> FindPretALL(int id);
	//开处方
	public void createPret(Prescript pret) throws createPretException;
	//根据处方id查询处方记录
	public Prescript findPretById(int id);
}
