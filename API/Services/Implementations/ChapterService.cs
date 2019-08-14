using AutoMapper;
using DAL.Models;
using Services.Abstractions;
using Services.DTOs.Input;
using Services.DTOs.Output;
using Services.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using DAL.Exceptions;
using DAL.Extensions;

namespace Services.Implementations
{
	public class ChapterService : EntityService<Chapter>, IChapterService
	{
		private IBookService _bookService;

		public ChapterService(IBookService bookService)
		{
			_bookService = bookService;
		}

		public BaseResponse<IEnumerable<ChapterOutputDto>> All(IDictionary<string, string> @params)
		{
			var chapters = Where(@params).Select(Mapper.Map<ChapterOutputDto>);
			return new BaseResponse<IEnumerable<ChapterOutputDto>>(HttpStatusCode.OK, data: chapters);
		}

		public BaseResponse<ChapterDetailOutputDto> Get(Guid id)
		{
			var chapter = Find(id);
			if (chapter == null)
			{
				throw new BadRequestException($"Không tìm thấy chương {id}");
			}

			Task.Run(() => UpdateReadCount(chapter));

			return new BaseResponse<ChapterDetailOutputDto>(HttpStatusCode.OK, data: Mapper.Map<ChapterDetailOutputDto>(chapter));
		}

		public BaseResponse<ChapterDetailOutputDto> Create(ChapterInputDto chapterInputDto)
		{
			if (Contains(c => c.BookId == chapterInputDto.BookId && c.ChapterIndex == chapterInputDto.ChapterIndex))
			{
				throw new BadRequestException($"Chapter với index {chapterInputDto.ChapterIndex} đã tồn tại");
			}

			var chapter = Create(Mapper.Map<Chapter>(chapterInputDto), out var isSaved);
			if (!isSaved)
			{
				throw new InternalServerErrorException($"Không thể tạo chapter {chapterInputDto.Name}");
			}

			return new BaseResponse<ChapterDetailOutputDto>(HttpStatusCode.OK, data: Mapper.Map<ChapterDetailOutputDto>(chapter));
		}

		public BaseResponse<bool> Update(Guid id, ChapterInputDto chapterInputDto)
		{
			var oldChapter = Find(id);
			if (oldChapter == null)
			{
				throw new BadRequestException($"Không tìm thấy chương {id}");
			}

			oldChapter.Name = chapterInputDto.Name;
			oldChapter.Content = chapterInputDto.Content;
			var isSaved = Update(oldChapter);
			if (!isSaved)
			{
				throw new InternalServerErrorException($"Không thể update chương {chapterInputDto.Name}");
			}

			return new BaseResponse<bool>(HttpStatusCode.OK, data: true);
		}

		public BaseResponse<bool> Delete(Guid id)
		{
			var chapter = Find(id);
			if (chapter == null)
			{
				throw new BadRequestException($"Không tìm thấy chương {id}");
			}

			var isSaved = Delete(chapter);
			if (!isSaved)
			{
				throw new InternalServerErrorException($"Không thể delete chương {chapter.Name}");
			}

			return new BaseResponse<bool>(HttpStatusCode.OK, data: true);
		}

		private IEnumerable<Chapter> Where(IDictionary<string, string> @params)
		{
			var linqQuery = Where(chapter => chapter.IsActivated());

			var queries = @params.ToObject<ChapterRequest>();
			if (queries.BookId != Guid.Empty)
			{
				linqQuery = linqQuery.Where(chapter => chapter.BookId == queries.BookId);
			}

			if (queries.ChapterIndex != 0)
			{
				linqQuery = linqQuery.Where(chapter => chapter.ChapterIndex == queries.ChapterIndex);
			}

			return linqQuery.OrderBy(chapter => chapter.ChapterIndex)
				.Skip(queries.Limit * (queries.Page - 1))
				.Take(queries.Limit);
		}

		private void UpdateReadCount(Chapter chapter)
		{
			chapter.ReadCount += 1;
			Update(chapter);
			var book = _bookService.Find(chapter.Id);
			book.ReadCount += 1;
			_bookService.Update(book);
		}
	}
}