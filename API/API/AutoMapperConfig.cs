using System.Linq;
using AutoMapper;
using AutoMapper.Configuration;
using DAL.Enums;
using DAL.Models;
using Services.DTOs.Input;
using Services.DTOs.Output;

namespace API
{
	public static class AutoMapperConfig
	{
		public static void RegisterModel()
		{
			var configuration = new MapperConfigurationExpression();

			#region User

			configuration.CreateMap<UserInputDto, User>();

			configuration.CreateMap<User, UserOutputDto>()
				.ForMember(
					destination => destination.Roles,
					map => map.MapFrom(source => source.UserRoles.Where(ur => ur.EntityStatus == EntityStatus.Activated).Select(ur => ur.Role.Name).ToArray())
				);

			configuration.CreateMap<UserOutputDto, User>();

			#endregion

			Mapper.Initialize(configuration);
		}
	}
}
