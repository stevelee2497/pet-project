using System;

namespace Services.DTOs.Input
{
	public class BookRequest : PagingRequest
	{
		public Guid AuthorId { get; set; }

		public Guid CategoryId { get; set; }

		public string BookType { get; set; }
	}
}