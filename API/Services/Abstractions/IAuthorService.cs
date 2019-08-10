using System.Collections.Generic;
using DAL.Models;
using Services.DTOs.Input;
using Services.DTOs.Output;

namespace Services.Abstractions
{
	public interface IAuthorService : IEntityService<Author>
	{
		BaseResponse<bool> CreateAuthor(AuthorInputDto authorInputDto);
		BaseResponse<bool> UpdateAuthor(AuthorInputDto authorInputDto);
		BaseResponse<bool> DeleteAuthor(AuthorInputDto authorInputDto);
		BaseResponse<List<AuthorOutputDto>> All(IDictionary<string, string> @params);
	}
}