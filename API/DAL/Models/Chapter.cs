using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
	[Table("Chapter")]
	public class Chapter : BaseEntity
	{
		public int ChapterIndex { get; set; }

		public string Name { get; set; }

		public string Content { get; set; }

		public Guid BookId { get; set; }
		public virtual Book Book { get; set; }
	}
}