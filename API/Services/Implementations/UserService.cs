using DAL.Constants;
using DAL.Enums;
using DAL.Exceptions;
using DAL.Helpers;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using Services.Abstractions;
using Services.DTOs.Input;
using Services.DTOs.Output;
using Services.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace Services.Implementations
{
	public class UserService : EntityService<User>, IUserService
	{
		private readonly IRoleService _roleService;
		private readonly IUserRoleService _userRoleService;

		public UserService(IUserRoleService userRoleService, IRoleService roleService)
		{
			_userRoleService = userRoleService;
			_roleService = roleService;
		}

		public BaseResponse<List<User>> All(IDictionary<string, string> @params)
		{
			return new BaseResponse<List<User>>(HttpStatusCode.OK, data: All().ToList());
		}

		public BaseResponse<User> Create(User user)
		{
			var response = Create(user, out var isSaved);
			if (!isSaved)
			{
				throw new InternalServerErrorException("Couldn't create user record");
			}

			return new BaseResponse<User>(HttpStatusCode.OK, data: response);
		}

		public BaseResponse<User> Get(Guid id)
		{
			var user = Find(id);
			if (user == null)
			{
				throw new DataNotFoundException("user");
			}

			return new BaseResponse<User>(HttpStatusCode.OK, data: user);
		}

		public BaseResponse<Token> Register(AuthDto authDto)
		{
			if (string.IsNullOrEmpty(authDto.Email))
			{
				throw new BadRequestException("Vui lòng nhập tên tài khoản.");
			}

			if (string.IsNullOrEmpty(authDto.Password))
			{
				throw new BadRequestException("Vui lòng nhập mật khẩu.");
			}

			if (FirstOrDefault(u => u.Email.Equals(authDto.Email, StringComparison.InvariantCultureIgnoreCase)) != null)
			{
				throw new BadRequestException("Tài khoản đã tồn tại.");
			}

			var (salt, hash) = PasswordHelper.GenerateSecurePassword(authDto.Password);
			var user = new User
			{
				Email = authDto.Email,
				PasswordHash = hash,
				PasswordSalt = salt
			};
			var response = Create(user, out var isSaved);

			var role = _roleService.FirstOrDefault(r => r.Name.Equals(DefaultRole.User));
			if (role == null)
			{
				throw new InternalServerErrorException("No Role");
			}

			_userRoleService.Create(new UserRole {UserId = response.Id, RoleId = role.Id}, out isSaved);

			if (!isSaved)
			{
				throw new InternalServerErrorException("Couldn't create user record");
			}

			var token = JwtHelper.CreateToken(response, DefaultRole.User);
			return new BaseResponse<Token>(HttpStatusCode.OK, data: token);
		}

		public BaseResponse<Token> Login(AuthDto authDto)
		{
			if (string.IsNullOrEmpty(authDto.Email))
			{
				throw new BadRequestException("Vui lòng nhập tên tài khoản.");
			}

			if (string.IsNullOrEmpty(authDto.Password))
			{
				throw new BadRequestException("Vui lòng nhập mật khẩu.");
			}

			var user = Include(u => u.UserRoles).ThenInclude(ur => ur.Role).FirstOrDefault(u =>
				u.EntityStatus == EntityStatus.Activated &&
				u.Email.Equals(authDto.Email, StringComparison.InvariantCultureIgnoreCase)
			);
			if (user == null)
			{
				throw new DataNotFoundException("Tài khoản không tồn tại");
			}

			var hash = PasswordHelper.ComputeHash(authDto.Password, user.PasswordSalt);

			if (!user.PasswordHash.SequenceEqual(hash))
			{
				throw new BadRequestException("Mật khẩu không chính xác.");
			}

			var token = JwtHelper.CreateToken(user, user.UserRoles.Select(ur => ur.Role.Name).ToArray());
			return new BaseResponse<Token>(HttpStatusCode.OK, data: token);
		}
	}
}