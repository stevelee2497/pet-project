using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading;
using System.Threading.Tasks;
using DAL.Models;

namespace DAL.Contexts
{
	public class DatabaseContext : DbContext, IDataContext
	{
		private readonly IConfigurationRoot _configRoot;

		public DatabaseContext(IConfigurationRoot configRoot)
		{
			_configRoot = configRoot;
		}

		#region DbSet

		public DbSet<User> Users { get; set; }

		public DbSet<Role> Roles { get; set; }

		public DbSet<UserRole> UserRoles { get; set; }

		public DbSet<Book> Books { get; set; }

		public DbSet<Rate> Rates { get; set; }

		public DbSet<Comment> Comments { get; set; }

		public DbSet<Subscribe> Subscribes { get; set; }

		public DbSet<Chapter> Chapters { get; set; }

		public DbSet<Author> Authors { get; set; }

		public DbSet<Category> Categories { get; set; }

		public DbSet<BookSelf> BookSelves { get; set; }


		#endregion

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseSqlServer(_configRoot.GetConnectionString("DefaultConnection"));
		}
	}

	public interface IDataContext : IDisposable
	{
		int SaveChanges();
		Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
		DbSet<TEntity> Set<TEntity>() where TEntity : class;
		EntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;
	}
}