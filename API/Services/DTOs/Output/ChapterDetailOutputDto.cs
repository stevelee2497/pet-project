namespace Services.DTOs.Output
{
	public class ChapterDetailOutputDto
	{
		public string Id { get; set; }

		public int ChapterIndex { get; set; }

		public string Name { get; set; }

		public string Content { get; set; }

		public string CreatedTime { get; set; }

		public string UpdatedTime { get; set; }
	}
}