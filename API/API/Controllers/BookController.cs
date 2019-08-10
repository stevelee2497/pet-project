﻿using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Abstractions;
using Services.DTOs.Input;
using Services.DTOs.Output;

namespace API.Controllers
{
	[Route("api/books")]
	public class BookController
	{
		private IBookService _bookService;

		public BookController(IBookService bookService)
		{
			_bookService = bookService;
		}

		[HttpGet]
		[Authorize]
		[Produces("application/json")]
		public BaseResponse<IEnumerable<BookOutputDto>> All([FromHeader] IDictionary<string, string> @params)
		{
			return _bookService.All(@params);
		}

		[HttpGet("{id}")]
		[Authorize]
		[Produces("application/json")]
		public BaseResponse<BookOutputDto> GetBook(Guid id)
		{
			return _bookService.GetBook(id);
		}

		[HttpPost]
		[Authorize]
		[Produces("application/json")]
		public BaseResponse<BookOutputDto> CreateBook([FromBody] BookInputDto bookInputDto)
		{
			return _bookService.CreateBook(bookInputDto);
		}

		[HttpPut("{id}")]
		[Authorize]
		[Produces("application/json")]
		public BaseResponse<BookOutputDto> UpdateBook(Guid id, [FromBody] BookInputDto bookInputDto)
		{
			return _bookService.UpdateBook(id, bookInputDto);
		}

		[HttpDelete("{id}")]
		[Authorize]
		[Produces("application/json")]
		public BaseResponse<bool> DeleteBook(Guid id, [FromBody] BookInputDto bookInputDto)
		{
			return _bookService.DeleteBook(id, bookInputDto);
		}
	}
}