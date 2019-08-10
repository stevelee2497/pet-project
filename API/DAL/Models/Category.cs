using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
	[Table("Category")]
	public class Category : BaseEntity
	{
		public string Name { get; set; }

		public virtual ICollection<BookCategory> BookCategories { get; set; }
	}
}