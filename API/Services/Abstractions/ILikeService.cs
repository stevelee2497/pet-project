using System;
using DAL.Models;
using Services.DTOs.Input;
using Services.DTOs.Output;

namespace Services.Abstractions
{
	public interface ILikeService : IEntityService<Like>
	{
		BaseResponse<LikeOutputDto> ChangeLikeStatus(LikeInputDto likeInputDto);
	}
}