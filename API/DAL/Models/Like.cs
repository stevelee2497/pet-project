using System;

namespace DAL.Models
{
	public class Like : BaseEntity
	{
		public Guid? BookId { get; set; }

		public Guid UserId { get; set; }

		public virtual User User { get; set; }

		public virtual Book Book { get; set; }
	}
}