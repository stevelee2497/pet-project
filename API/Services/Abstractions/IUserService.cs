using System;
using System.Collections.Generic;
using DAL.Models;
using Services.DTOs.Input;
using Services.DTOs.Output;

namespace Services.Abstractions
{
	public interface IUserService : IEntityService<User>
	{
		BaseResponse<List<User>> All(IDictionary<string, string> @params);
		BaseResponse<User> Create(User user);
		BaseResponse<User> Get(Guid id);
		BaseResponse<Token> Register(AuthDto user);
		BaseResponse<Token> Login(AuthDto user);
	}
}