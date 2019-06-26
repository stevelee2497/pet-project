using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
	[Table("User")]
	public class User : BaseEntity
	{
		[Required]
		public string Email { get; set; }

		[Required]
		public byte[] PasswordSalt { get; set; }

		[Required]
		public byte[] PasswordHash { get; set; }

		public DateTimeOffset? AllowTokensSince { get; set; }

		public virtual ICollection<UserRole> UserRoles { get; set; }

		public virtual ICollection<Book> Books { get; set; }

		public virtual ICollection<Rate> Rates { get; set; }

		public virtual ICollection<Comment> Comments { get; set; }

		public virtual ICollection<BookSelf> BookSelves { get; set; }
		
		public virtual ICollection<Subscribe> Subscribes { get; set; }
	}
}