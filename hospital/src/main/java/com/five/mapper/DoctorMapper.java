package com.five.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.One;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.ResultMap;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.five.pojo.Doctor;
import com.five.pojo.Patient;
import com.five.pojo.Prescript;
import com.five.pojo.Regedit;

/**    
* @author: yesenchao
* @date: 2020年7月5日 下午12:45:50 
* @Description: 叫号面诊相关
*/
@Mapper
public interface DoctorMapper {
	//根据id查询挂号信息
	@Select("select * from register where rt_id=#{id}")
	@ResultMap("register")
	Regedit findRegeditById(int id);
	//查询预约信息
	@Select("SELECT * FROM register WHERE d_id=#{id} AND rt_state=0  ORDER BY rt_time")
	@Results(id = "register",value = {
			@Result(id = true,column = "rt_id",property = "id"),
			@Result(column = "p_id",property = "pant",javaType = Patient.class,
			one = @One(select = "com.five.mapper.PersonnelMapper.getPatientByid")),
			@Result(column = "d_id",property = "doct",javaType = Doctor.class,
			one = @One(select = "com.five.mapper.RegeditMapper.getDoctorByid")),
			@Result(column = "rt_time",property = "time"),
			@Result(column = "rt_date",property = "date"),
			@Result(column = "rt_name",property = "name"),
			@Result(column = "rt_sex",property = "sex"),
			@Result(column = "rt_card",property = "card"),
			@Result(column = "rt_nation",property = "nation"),
			@Result(column = "rt_fee",property = "fee"),
			@Result(column = "rt_state",property = "state"),
			@Result(column="rt_phone",property = "phone")
	})
	List<Regedit> findRegState0All(int id);
	//叫号
	@Select("SELECT * FROM register WHERE d_id=#{id} AND rt_state=1 ORDER BY rt_date LIMIT 1")
	@ResultMap("register")
	Regedit findRegState1ByOne(int id);
	//查询挂号排队信息
	@Select("SELECT * FROM register WHERE d_id=#{id} AND rt_state=1 ORDER BY rt_date")
	@ResultMap("register")
	List<Regedit> findRegState1All(int id);
	//更新挂号状态
	@Update("UPDATE register SET rt_state=#{state} WHERE rt_id=#{id}")
	int updateRegState(@Param("state")String state,@Param("id")int id);
	//补号
	@Options(useGeneratedKeys = true,keyProperty = "id")
	@Insert("INSERT INTO register(`d_id`,`rt_time`,`rt_date`,`rt_name`,`rt_sex`,`rt_card`,`rt_nation`,`rt_fee`,`rt_state`,`rt_phone`)"
			+ "VALUES(#{doct.id},#{time},#{date},#{name},#{sex},#{card},#{nation},#{fee},#{state},#{phone})")
	void createReg(Regedit reg);
	//查询处方记录信息
	@Select("SELECT * FROM prescript p,register r WHERE p.`rt_id`=r.`rt_id` AND r.`d_id`=#{id} ORDER BY p.`pt_time`")
	@Results(id = "prescript",value = {
			@Result(id=true,column = "pt_id",property = "id"),
			@Result(column = "pt_sym",property = "sym"),
			@Result(column = "pt_content",property = "content"),
			@Result(column = "pt_time",property = "time"),
			@Result(column = "rt_id",property = "reg",javaType = Regedit.class,
			one = @One(select = "com.five.mapper.DoctorMapper.findRegeditById"))
	})
	List<Prescript> FindPretALL(int id);
	//开处方
	@Options(useGeneratedKeys = true,keyProperty = "id")
	@Insert("INSERT INTO prescript(`rt_id`,`pt_sym`,`pt_content`,`pt_time`) "
			+ "VALUES(#{reg.id},#{sym},#{content},#{time})")
	int createPret(Prescript pre);
	//根据id查询处方记录
	@Select("select * from prescript where pt_id=#{id}")
	@ResultMap("prescript")
	Prescript findPretById(int id);
}
