namespace Services.DTOs.Output
{
	public class UserDto
	{
		public string Id { get; set; }

		public string Email { get; set; }

		public string DisplayName { get; set; }

		public string AvatarUrl { get; set; }

		public string[] Roles { get; set; }
	}
}