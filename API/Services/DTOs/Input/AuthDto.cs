using System.Runtime.Serialization;

namespace Services.DTOs.Input
{
	[DataContract]
	public class AuthDto
	{
		[DataMember(Name = "email")]
		public string Email { get; set; }

		[DataMember(Name = "password")]
		public string Password { get; set; }
	}
}