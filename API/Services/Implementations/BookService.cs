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
using DAL.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Services.Implementations
{
	public class BookService : EntityService<Book>, IBookService
	{
		private readonly IBookCategoryService _bookCategoryService;

		public BookService(IBookCategoryService bookCategoryService)
		{
			_bookCategoryService = bookCategoryService;
		}

		public BaseResponse<IEnumerable<BookOutputDto>> All(IDictionary<string, string> @params)
		{
			var queries = @params.ToObject<PagingRequest>();
			var books = Include(x => x.Author)
				.Include(x => x.Owner)
				.Include(x => x.BookCategories).ThenInclude(x => x.Category)
				.Skip(queries.Limit * (queries.Page - 1))
				.Take(queries.Limit)
				.AsEnumerable()
				.Select(Mapper.Map<BookOutputDto>);

			return new BaseResponse<IEnumerable<BookOutputDto>>(HttpStatusCode.OK, data: books);
		}

		public BaseResponse<BookOutputDto> GetBook(Guid id)
		{
			var book = Include(x => x.Author)
				.Include(x => x.Owner)
				.Include(x => x.BookCategories).ThenInclude(x => x.Category)
				.FirstOrDefault(x => x.Id == id);

			if (book == null)
			{
				throw new BadRequestException($"Không tìm thấy tác phẩm với id: {id}");
			}

			return new BaseResponse<BookOutputDto>(HttpStatusCode.OK, data: Mapper.Map<BookOutputDto>(book));
		}

		public BaseResponse<BookOutputDto> CreateBook(BookInputDto bookInputDto)
		{
			if (Contains(x => x.Name.Equals(bookInputDto.Name, StringComparison.InvariantCultureIgnoreCase)))
			{
				throw new BadRequestException($"Tác phẩm {bookInputDto.Name} đã tồn tại");
			}

			var book = Mapper.Map<Book>(bookInputDto);
			book = Create(book, out var isSaved);
			if (!isSaved)
			{
				throw new BadRequestException($"Không thể tạo tác phẩm {book.Name}");
			}

			var bookCategories = _bookCategoryService.CreateMany(bookInputDto.CategoryIds.Select(categoryId =>
				new BookCategory
				{
					BookId = book.Id,
					CategoryId = Guid.Parse(categoryId)
				}), out isSaved);

			if (!isSaved)
			{
				throw new BadRequestException($"Không thể set category cho tác phẩm {book.Name}");
			}

			book.BookCategories = bookCategories as ICollection<BookCategory>;

			return new BaseResponse<BookOutputDto>(HttpStatusCode.OK, data: Mapper.Map<BookOutputDto>(book));
		}

		public BaseResponse<BookOutputDto> UpdateBook(Guid id, BookInputDto bookInputDto)
		{
			throw new NotImplementedException();
		}

		public BaseResponse<bool> DeleteBook(Guid id, BookInputDto bookInputDto)
		{
			throw new NotImplementedException();
		}
	}
}