package com.five.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import java.util.Date;
import java.util.HashMap;

public class JwtTokenUtils {
    public static final String TOKEN_HEADER = "Authorization";
    public static final String TOKEN_PREFIX = "Bearer ";
    private static final String SECRET = "jwtsecretdemo";
    private static final String ISS = "echisan";
  // 过期时间是3600秒，既是1个小时
   private static final long EXPIRATION = 3600L;
    // 选择了记住我之后的过期时间为7天
    private static final long EXPIRATION_REMEMBER = 604800L;
    private static final String ROLE_CLAIMS ="ROLE_" ;
    private static final String RATINET = "RAT";
    /**
     * 生成JWT
     * @param
     * @param username
     * @return
     */
    public static String createToken(String username,String role,int id) {
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        HashMap<String, Object> map = new HashMap<>();
        map.put(ROLE_CLAIMS, role);//使用payload去存储我们的用户角色信息
        map.put(RATINET, id);//使用payload去存储我们的用户患者信息
        JwtBuilder builder = Jwts.builder()//更具id，subject，key创建Token
                .signWith(SignatureAlgorithm.HS256, SECRET)
                .setClaims(map)
                .setSubject(username)
                .setIssuedAt(now);
        if (EXPIRATION > 0) {
            builder.setExpiration(new Date(nowMillis + EXPIRATION * 1000));//一小时后过期
        }
            return builder.compact();
    }
    /**
     * 解析JWT
     * @param token
     * @return
     */
    public static Claims getTokenBody(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody();
    }
    //从token中获取用户名
    public static String getUsername(String token){
    	System.out.println("getUsername:"+token);
        return getTokenBody(token).getSubject();
    }
    // 是否已过期
    public static boolean isExpiration(String token){
        return getTokenBody(token).getExpiration().before(new Date());
    }
    //从token中获取角色
    public static String getUserRole(String token) {
        System.out.println("从token中获取角色"+getTokenBody(token).get(ROLE_CLAIMS));
        return (String) getTokenBody(token).get(ROLE_CLAIMS);
    }
    //从token中获取id
    public static int getUserId(String token) {
        System.out.println("从token中获取id"+getTokenBody(token).get(ROLE_CLAIMS));
        return (int)getTokenBody(token).get(RATINET);
    }
}

