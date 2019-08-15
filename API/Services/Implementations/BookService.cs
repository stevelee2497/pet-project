using AutoMapper;
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
using DAL.Constants;
using DAL.Extensions;

namespace Services.Implementations
{
	public class BookService : EntityService<Book>, IBookService
	{
		private readonly ILikeService _likeService;
		private readonly ICategoryService _categoryService;
		private readonly IBookCategoryService _bookCategoryService;

		public BookService(IBookCategoryService bookCategoryService, ILikeService likeService, ICategoryService categoryService)
		{
			_bookCategoryService = bookCategoryService;
			_likeService = likeService;
			_categoryService = categoryService;
		}

		public BaseResponse<IEnumerable<BookOutputDto>> All(IDictionary<string, string> @params)
		{
			var books = Where(@params).Select(Mapper.Map<BookOutputDto>);

			return new BaseResponse<IEnumerable<BookOutputDto>>(HttpStatusCode.OK, data: books);
		}

		public BaseResponse<BookOutputDto> GetBook(Guid id, Guid userId)
		{
			var book = Include(x => x.Author)
				.Include(x => x.Owner)
				.Include(x => x.BookCategories).ThenInclude(x => x.Category)
				.FirstOrDefault(x => x.Id == id);

			if (book == null)
			{
				throw new BadRequestException($"Không tìm thấy tác phẩm với id: {id}");
			}

			var bookOutputDto = Mapper.Map<BookOutputDto>(book);
			var liked = _likeService.FirstOrDefault(x => x.BookId == id && x.UserId == userId)?.IsActivated() ?? false;
			bookOutputDto.Liked = liked;

			return new SuccessResponse<BookOutputDto>(bookOutputDto);
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

		public BaseResponse<IEnumerable<BookOutputDto>> CreateMany(IEnumerable<BookInputDto> booksInputDto)
		{
			var existedBooks = Where(b =>
				booksInputDto.Any(dto => dto.Name.Equals(b.Name, StringComparison.InvariantCultureIgnoreCase)));
			var nonExistedBooks = booksInputDto.Where(dto =>
				existedBooks.All(book => !book.Name.Equals(dto.Name, StringComparison.InvariantCultureIgnoreCase)));
			var createdBooks = CreateMany(nonExistedBooks.Select(Mapper.Map<Book>), out var isSaved);
			if (!isSaved)
			{
				throw new BadRequestException($"Không thể import books");
			}

			// TODO: import categories for created books
			var categories = _categoryService.All();

			// TODO: import authors for created books

			return new SuccessResponse<IEnumerable<BookOutputDto>>(createdBooks.Select(Mapper.Map<BookOutputDto>));
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

		public BaseResponse<bool> DeleteBook(Guid id)
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

		private IEnumerable<Book> Where(IDictionary<string, string> @params)
		{
			var queries = @params.ToObject<BookRequest>();

			var linqQuery = Where(b => b.IsActivated());
			if (queries.CategoryId != Guid.Empty)
			{
				linqQuery = _bookCategoryService.Include(bc => bc.Book)
					.Where(bc => bc.CategoryId == queries.CategoryId && bc.IsActivated() && bc.Book.IsActivated())
					.Select(bc => bc.Book);
			}

			if (queries.AuthorId != Guid.Empty)
			{
				linqQuery = linqQuery.Where(book => book.AuthorId == queries.AuthorId);
			}

			if (!string.IsNullOrEmpty(queries.BookType))
			{
				linqQuery = FilterBookType(linqQuery, queries.BookType);
			}

			return linqQuery
				.Skip(queries.Limit * (queries.Page - 1))
				.Take(queries.Limit);
		}

		private IQueryable<Book> FilterBookType(IQueryable<Book> books, string bookType)
		{
			switch (bookType)
			{
				case BookType.NewBooks:
					return books.OrderByDescending(b => b.CreatedTime);

				case BookType.RecommendingBooks:
					return books.OrderByDescending(b => b.LikedCount);

				case BookType.TrendingBooks:
					return books.OrderByDescending(b => b.ReadCount);

				case BookType.FeaturingBooks:
					return books.OrderByDescending(b => b.AverageRating);

				default:
					throw new BadRequestException($"Không tồn tại filter {bookType}");
			}
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