using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Abstractions;
using Services.DTOs.Input;
using Services.DTOs.Output;

namespace API.Controllers
{
	[Route("api/likes")]
	public class LikeController : Controller
	{
		private readonly ILikeService _likeService;

		public LikeController(ILikeService likeService)
		{
			_likeService = likeService;
		}

		[HttpPost]
		[Authorize]
		[Produces("application/json")]
		public BaseResponse<LikeOutputDto> ChangeLikeStatus([FromBody] LikeInputDto likeInputDto)
		{
			return _likeService.ChangeLikeStatus(likeInputDto);
		}
	}
}