using AutoMapper;
using DAL.Enums;
using DAL.Exceptions;
using DAL.Models;
using Services.Abstractions;
using Services.DTOs.Input;
using Services.DTOs.Output;
using System;
using DAL.Extensions;

namespace Services.Implementations
{
	public class LikeService : EntityService<Like>, ILikeService
	{
		private readonly IBookService _bookService;

		public LikeService(IBookService bookService)
		{
			_bookService = bookService;
		}

		public BaseResponse<LikeOutputDto> ChangeLikeStatus(LikeInputDto likeInputDto)
		{
			var like = Mapper.Map<Like>(likeInputDto);
			var likeFound = FirstOrDefault(x => x.BookId == like.BookId && x.UserId == like.UserId);
			if (likeFound == null)
			{
				likeFound = Create(like, out var isSaved);
				if (!isSaved)
				{
					throw new InternalServerErrorException($"Không thể like book id: {likeInputDto.BookId}");
				}
			}
			else
			{
				likeFound.EntityStatus = likeFound.IsActivated() ? EntityStatus.Deleted : EntityStatus.Activated;
				var isSaved = Update(likeFound);
				if (!isSaved)
				{
					throw new InternalServerErrorException("Something went wrong, try again later");
				}
			}

			var book = _bookService.Find(Guid.Parse(likeInputDto.BookId));
			book.LikedCount += likeFound.IsActivated() ? 1 : -1;
			_bookService.Update(book);

			return new SuccessResponse<LikeOutputDto>(Mapper.Map<LikeOutputDto>(likeFound));
		}
	}
}