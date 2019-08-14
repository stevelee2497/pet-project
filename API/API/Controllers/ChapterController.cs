using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Abstractions;
using Services.DTOs.Input;
using Services.DTOs.Output;
using System;
using System.Collections.Generic;

namespace API.Controllers
{
	[Route("api/chapters")]
	public class ChapterController : Controller
	{
		private readonly IChapterService _chapterService;

		public ChapterController(IChapterService chapterService)
		{
			_chapterService = chapterService;
		}

		[HttpGet]
		[Authorize]
		[Produces("application/json")]
		public BaseResponse<IEnumerable<ChapterOutputDto>> All([FromHeader] IDictionary<string, string> @params)
		{
			return _chapterService.All(@params);
		}

		[HttpGet("{id}")]
		[Authorize]
		[Produces("application/json")]
		public BaseResponse<ChapterDetailOutputDto> Get(Guid id)
		{
			return _chapterService.Get(id);
		}

		[HttpPost]
		[Authorize]
		[Produces("application/json")]
		public BaseResponse<ChapterDetailOutputDto> Create([FromBody] ChapterInputDto chapterInputDto)
		{
			return _chapterService.Create(chapterInputDto);
		}

		[HttpPut("{id}")]
		[Authorize]
		[Produces("application/json")]
		public BaseResponse<bool> Update(Guid id, [FromBody] ChapterInputDto chapterInputDto)
		{
			return _chapterService.Update(id, chapterInputDto);
		}

		[HttpDelete("{id}")]
		[Authorize]
		[Produces("application/json")]
		public BaseResponse<bool> Delete(Guid id)
		{
			return _chapterService.Delete(id);
		}
	}
}