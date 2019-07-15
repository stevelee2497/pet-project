using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
	[Table("Book")]
	public class Book : BaseEntity
	{
		public string Name { get; set; }

		public string Description { get; set; }

		[DefaultValue(0)]
		public int ReadCount { get; set; }

		public string BookCoverUrl { get; set; }

		[DefaultValue(0)]
		public int LikedCount { get; set; }

		public Guid OwnerId { get; set; }
		[ForeignKey("OwnerId")]
		public virtual User Owner { get; set; }

		public Guid AuthorId { get; set; }
		public virtual Author Author { get; set; }

		public Guid CategoryId { get; set; }
		public virtual Category	Category { get; set; }

		public virtual ICollection<Chapter> Chapters { get; set; }

		public virtual ICollection<Rate> Rates { get; set; }

		public virtual ICollection<BookSelf> BookSelves { get; set; }

		public virtual ICollection<Comment> Comments { get; set; }

		public virtual ICollection<Subscribe> Subscribes { get; set; }
	}
}
