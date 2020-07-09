package com.five.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.five.exception.createPretException;
import com.five.filter.JwtTokenUtils;
import com.five.pojo.Prescript;
import com.five.pojo.Regedit;
import com.five.service.DoctorService;
import com.five.util.AddWord;

/**    
* @author: yesenchao
* @date: 2020年7月2日 下午5:03:47 
* @Description: 叫号门诊
*/
@RestController
@RequestMapping("/doct")
public class DoctorController {
	@Autowired
	DoctorService ds;
	//查询预约信息
	@GetMapping("/reg/1")
	public List<Regedit> findRegState0All(@RequestHeader("Authorization") String token){
		return ds.findRegState0All(JwtTokenUtils.getUserId(token.substring(7)));
	}
	//叫号
	@GetMapping("/reg/2/byOne")
	public Regedit findRegState1ByOne(@RequestHeader("Authorization") String token) {
		return ds.findRegState1ByOne(JwtTokenUtils.getUserId(token.substring(7)));
	}
	//查询挂号排队信息
	@GetMapping("/reg/2")
	public List<Regedit> findRegState1All(@RequestHeader("Authorization") String token){
		return ds.findRegState1All(JwtTokenUtils.getUserId(token.substring(7)));
	}
	//更新挂号状态
	@PutMapping("/reg/{regId}/{state}")
	public boolean updateRegState(@RequestHeader("Authorization") String token,@PathVariable int regId,@PathVariable String state) {
		return ds.updateRegState(regId,state);
	}
	//补号 
	@PostMapping("/reg")
	public Regedit createReg(@RequestHeader("Authorization") String token,@RequestBody Regedit reg) {
		//请求参数 #{doct.id},#{name},#{sex},#{card},#{nation},#{fee},#{phone}
		reg.setState("4");
		ds.createReg(reg);
		return reg;
	}
	//查询处方记录信息
	@GetMapping("/pret")
	public List<Prescript> FindPretALL(@RequestHeader("Authorization") String token){
		return ds.FindPretALL(JwtTokenUtils.getUserId(token.substring(7)));
	}
	//开处方
	@PostMapping("/pret")
	public Prescript createPret(@RequestBody Prescript pret) {
		//请求参数 #{reg.id},#{sym},#{content}
		try {
			ds.createPret(pret);
		} catch (createPretException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return pret;
	}
	//下载处方表(word)
	@GetMapping("/pret/download/{id}")
	public void download(HttpServletResponse response,@PathVariable int id) {
		Prescript pret=ds.findPretById(id);
	    Map<String, String> map=new HashMap<String, String>();
	    map.put("name", pret.getReg().getName());
	    map.put("nation", pret.getReg().getNation());
	    map.put("sex",pret.getReg().getSex());
	    map.put("id", pret.getId()+"");
	    map.put("cardId", pret.getReg().getCard());
	    map.put("type", pret.getReg().getDoct().getSubment().getName());
	    map.put("time", pret.getTime());
	    map.put("sym", pret.getSym());
	    map.put("content", pret.getContent());
	    AddWord.createWord(map, "prescript.xml", "/static/word/", "处方单", response);
	}
}
