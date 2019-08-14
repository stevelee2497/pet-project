using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
	[Table("BookSelf")]
	public class BookSelf : BaseEntity
	{
		public string LastChapterUrl { get; set; }

		public Guid? BookId { get; set; }
		public virtual Book Book { get; set; }


		public Guid UserId { get; set; }
		public virtual User User { get; set; }
	}
}