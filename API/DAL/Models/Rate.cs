using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
	[Table("Rate")]
	public class Rate : BaseEntity
	{
		public int RatePoint { get; set; }

		public string Message { get; set; }

		public Guid BookId { get; set; }
		public virtual Book Book { get; set; }


		public Guid UserId { get; set; }
		public virtual User User { get; set; }
	}
}