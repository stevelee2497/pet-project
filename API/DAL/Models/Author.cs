﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
	[Table("Author")]
	public class Author : BaseEntity
	{
		public string Name { get; set; }

		public virtual ICollection<Book> Books { get; set; }
	}
}