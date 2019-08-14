using System;

namespace DAL.Models
{
	public class BookCategory : BaseEntity
	{
		public Guid BookId { get; set; }

		public Guid CategoryId { get; set; }

		public virtual Book Book { get; set; }

		public virtual Category Category { get; set; }
	}
}