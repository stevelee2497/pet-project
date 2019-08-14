using AutoMapper;
using DAL.Exceptions;
using DAL.Models;
using Services.Abstractions;
using Services.DTOs.Input;
using Services.DTOs.Output;
using Services.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace Services.Implementations
{
	public class AuthorService : EntityService<Author>, IAuthorService
	{
		public AuthorService()
		{
		}

		public BaseResponse<IEnumerable<AuthorOutputDto>> All(IDictionary<string, string> @params)
		{
			var queries = @params.ToObject<PagingRequest>();
			var authors = All()
				.Skip(queries.Limit * (queries.Page - 1))
				.Take(queries.Limit)
				.AsEnumerable()
				.Select(Mapper.Map<AuthorOutputDto>);

			return new BaseResponse<IEnumerable<AuthorOutputDto>>(HttpStatusCode.OK, data: authors);
		}

		public BaseResponse<bool> CreateAuthor(AuthorInputDto authorInputDto)
		{
			if (Contains(x => x.Name.Equals(authorInputDto.Name, StringComparison.InvariantCultureIgnoreCase)))
			{
				throw new BadRequestException($"Tác giả {authorInputDto.Name} đã tồn tại");
			}

			var author = Mapper.Map<Author>(authorInputDto);
			Create(author, out var isSaved);
			if (!isSaved)
			{
				throw new BadRequestException($"Không thể tạo author {author.Name}");
			}

			return new BaseResponse<bool>(HttpStatusCode.OK, data: true);
		}

		public BaseResponse<bool> UpdateAuthor(Guid id, AuthorInputDto authorInputDto)
		{
			var author = Find(id);
			if (author == null)
			{
				throw new BadRequestException($"Không tìm thấy tác giả {id}");
			}

			author.Name = authorInputDto.Name;
			var isUpdated = Update(author);
			if (!isUpdated)
			{
				throw new InternalServerErrorException($"Không thể update tác giả {author.Name}");
			}

			return new BaseResponse<bool>(HttpStatusCode.OK, data: true);
		}

		public BaseResponse<bool> DeleteAuthor(Guid id, AuthorInputDto authorInputDto)
		{
			var author = Find(id);
			if (author == null)
			{
				throw new BadRequestException($"Không tìm thấy tác giả {id}");
			}

			var deleted = Delete(author);
			if (!deleted)
			{
				throw new InternalServerErrorException($"Không thể delete tác giả {author.Name}");
			}

			return new BaseResponse<bool>(HttpStatusCode.OK, data: true);
		}
	}
}