using DAL.Models;
using Services.Abstractions;

namespace Services.Implementations
{
	public class BookCategoryService : EntityService<BookCategory>, IBookCategoryService
	{
	}
}