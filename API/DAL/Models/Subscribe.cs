using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
	[Table("Subscribe")]
	public class Subscribe : BaseEntity
	{
		public Guid BookId { get; set; }
		public virtual Book Book { get; set; }


		public Guid UserId { get; set; }
		public virtual User User { get; set; }
	}
}