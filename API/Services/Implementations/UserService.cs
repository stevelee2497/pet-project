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
using AutoMapper;

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

		public BaseResponse<List<UserDto>> All(IDictionary<string, string> @params)
		{
			var users = Include(user => user.UserRoles).ThenInclude(user => user.Role)
				.AsEnumerable()
				.Select(Mapper.Map<UserDto>)
				.ToList();

			return new BaseResponse<List<UserDto>>(HttpStatusCode.OK, data: users);
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

		public BaseResponse<string> Register(AuthDto authDto)
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
				PasswordSalt = salt,
				DisplayName = authDto.Email,
			};
			var response = Create(user, out var isSaved);

			var role = _roleService.FirstOrDefault(r => r.Name.Equals(DefaultRole.User));
			if (role == null)
			{
				throw new InternalServerErrorException($"Không có role {DefaultRole.User} tồn tại");
			}

			_userRoleService.Create(new UserRole {UserId = response.Id, RoleId = role.Id}, out isSaved);

			if (!isSaved)
			{
				throw new InternalServerErrorException("Không thể đăng ký, vui lòng thử lại");
			}

			return new BaseResponse<string>(HttpStatusCode.OK, data: "Đăng ký thành công");
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

			var token = JwtHelper.CreateToken(Mapper.Map<UserDto>(user));
			return new BaseResponse<Token>(HttpStatusCode.OK, data: token);
		}
	}
}