package com.five.util;

import java.io.BufferedWriter;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;
import freemarker.template.Configuration;
import freemarker.template.Template;
/**    
* @author: yesenchao
* @date: 2020年7月7日 上午10:31:37 
* @Description: 生成word文件
* @param dataMap 待填充数据
* @param templateName 模板文件名称
* @param filePath 模板文件路径
* @param fileName 生成的 word 文件名称
* @param response 响应流
*/
public class AddWord {

	public static void createWord(Map dataMap, String templateName, String filePath, String fileName, HttpServletResponse response){
	    // 创建配置实例
	    Configuration configuration = new Configuration(Configuration.VERSION_2_3_28);
	    // 设置编码
	    configuration.setDefaultEncoding(StandardCharsets.UTF_8.name());
	    // ftl模板文件
	    configuration.setClassForTemplateLoading(AddWord.class, filePath);

	    try {
	        // 获取模板
	        Template template = configuration.getTemplate(templateName);
	        response.setHeader("Content-disposition",
	                "attachment;filename=" + URLEncoder.encode(fileName + ".doc", StandardCharsets.UTF_8.name()));
	        // 定义输出类型
	        response.setContentType("application/msword");
	        Writer out = new BufferedWriter(new OutputStreamWriter(response.getOutputStream()));
	        // 生成文件
	        template.process(dataMap, out);
	        out.flush();
	        out.close();
	    } catch (Exception e){
	        e.printStackTrace();
	    }
	}
}

