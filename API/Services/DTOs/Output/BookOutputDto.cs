using System.Collections.Generic;

namespace Services.DTOs.Output
{
	public class BookOutputDto
	{
		public string Id { get; set; }

		public string Name { get; set; }

		public string Description { get; set; }

		public int ReadCount { get; set; }

		public string Status { get; set; }

		public string BookCoverUrl { get; set; }

		public int LikedCount { get; set; }

		public AuthorOutputDto Author { get; set; }

		public IEnumerable<CategoryOutputDto> Categories { get; set; }

		public UserOutputDto Owner { get; set; }

		public IEnumerable<ChapterOutputDto> Chapters { get; set; }

		public IEnumerable<CommentOutputDto> Comments { get; set; }
	}
}