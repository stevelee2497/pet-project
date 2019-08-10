namespace Services.DTOs.Input
{
	public class PagingRequest
	{
		public int Page { get; set; } = 1;
		public int Limit { get; set; } = 20;
	}
}