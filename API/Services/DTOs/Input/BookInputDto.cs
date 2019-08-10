namespace Services.DTOs.Input
{
	public class BookInputDto
	{
		public string Name { get; set; }

		public string Description { get; set; }

		public string BookCoverUrl { get; set; }

		public string OwnerId { get; set; }

		public string AuthorId { get; set; }

		public string[] CategoryIds { get; set; }	
	}
}