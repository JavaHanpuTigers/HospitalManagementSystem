package com.five.exception;

public class CreateUserPatientException extends Exception{
	private static final long serialVersionUID = 1L;
	public CreateUserPatientException() {
		super("创建患者用户失败");
	}
}
