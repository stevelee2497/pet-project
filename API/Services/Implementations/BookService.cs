﻿using AutoMapper;
using DAL.Exceptions;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
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

		public BaseResponse<bool> UpdateBook(Guid id, BookInputDto bookInputDto)
		{
			var oldBook = Find(id);
			var newBook = Mapper.Map<Book>(bookInputDto);
			if (oldBook == null)
			{
				throw new BadRequestException($"Không tìm thấy tác phẩm {id}");
			}

			oldBook = UpdateBookInformation(oldBook, newBook, out var isSaved);
			oldBook = UpdateBookCategories(oldBook, bookInputDto.CategoryIds.Select(Guid.Parse).ToList(), ref isSaved);

			if (!isSaved)
			{
				throw new InternalServerErrorException($"Không thể update cho tác phẩm {oldBook.Name}");
			}

			return new BaseResponse<bool>(HttpStatusCode.OK, data: true);
		}

		public BaseResponse<bool> DeleteBook(Guid id, BookInputDto bookInputDto)
		{
			var book = Find(id);
			if (book == null)
			{
				throw new BadRequestException($"Không tìm thấy tác phẩm {id}");
			}

			var isDeleted = Delete(book);
			if (!isDeleted)
			{
				throw new InternalServerErrorException($"Không thể delete tác phẩm {book.Name}");
			}

			return new BaseResponse<bool>(HttpStatusCode.OK, data: true);
		}

		private Book UpdateBookInformation(Book oldBook, Book newBook, out bool isSaved)
		{
			oldBook.Name = newBook.Name;
			oldBook.Description = newBook.Description;
			oldBook.BookCoverUrl = newBook.BookCoverUrl;
			oldBook.AuthorId = newBook.AuthorId;
			isSaved = Update(oldBook);
			return oldBook;
		}

		private Book UpdateBookCategories(Book oldBook, List<Guid> newCategoryIds, ref bool isSaved)
		{
			var oldBookCategories = _bookCategoryService.Where(x => x.BookId == oldBook.Id).ToList();

			// create new book - category ids
			var newIdsAdded = newCategoryIds.Where(id => oldBookCategories.All(bc => bc.CategoryId != id)).ToList();
			if (newIdsAdded.Any())
			{
				_bookCategoryService.CreateMany(
					newIdsAdded.Select(id => new BookCategory {CategoryId = id, BookId = oldBook.Id}), out isSaved
				);
			}

			// delete old book - category ids
			var oldIdsRemoved = oldBookCategories.Where(bc => !newCategoryIds.Contains(bc.CategoryId)).ToList();
			if (oldIdsRemoved.Any())
			{
				_bookCategoryService.Delete(oldIdsRemoved, out isSaved);
			}

			return oldBook;
		}
	}
}