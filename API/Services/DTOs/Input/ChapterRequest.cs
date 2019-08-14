using System;

namespace Services.DTOs.Input
{
	public class ChapterRequest : PagingRequest
	{
		public Guid BookId { get; set; }

		public int ChapterIndex { get; set; }

		public string BookName { get; set; }
	}
}