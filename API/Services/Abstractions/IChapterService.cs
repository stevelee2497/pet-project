using System;
using System.Collections.Generic;
using DAL.Models;
using Services.DTOs.Input;
using Services.DTOs.Output;

namespace Services.Abstractions
{
	public interface IChapterService : IEntityService<Chapter>
	{
		BaseResponse<IEnumerable<ChapterOutputDto>> All(IDictionary<string, string> @params);
		BaseResponse<ChapterDetailOutputDto> Get(Guid id);
		BaseResponse<ChapterDetailOutputDto> Create(ChapterInputDto chapterInputDto);
		BaseResponse<bool> Update(Guid id, ChapterInputDto chapterInputDto);
		BaseResponse<bool> Delete(Guid id);
	}
}