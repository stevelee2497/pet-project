using API.Filters;
using DAL.Constants;
using DAL.Contexts;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Repositories.Helpers;
using Services.Extensions;
using Services.Helpers;
using Swashbuckle.AspNetCore.Swagger;

namespace API
{
	public class Startup
	{
		public IConfiguration Configuration { get; }

		public Startup(IHostingEnvironment env)
		{
			var builder = new ConfigurationBuilder()
				.SetBasePath(env.ContentRootPath)
				.AddJsonFile("appsettings.json", true, true)
				.AddJsonFile($"appsettings.{env.EnvironmentName}.json", true)
				.AddEnvironmentVariables();
			Configuration = builder.Build();
		}

		public void ConfigureServices(IServiceCollection services)
		{
			services.AddSingleton((IConfigurationRoot)Configuration);
			services.AddSingleton(Configuration);
			services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

			services.AddMvc(options => options.Filters.Add<JsonExceptionFilter>())
				.AddJsonOptions(options => options.SerializerSettings.NullValueHandling = NullValueHandling.Include);

			services.AddWebDataLayer();

			services.AddDbContext<DatabaseContext>(options =>
			{
				options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
			});

			services.AddSwaggerGen(c => { c.SwaggerDoc("v1", new Info {Title = "Server API", Version = "v1"}); });

			services.AddAuthentication(JwtHelper.ConfigureAuthenticationOptions)
				.AddJwtBearer(Jwt.DefaultScheme, JwtHelper.ConfigureJwtBearerOptions);
		}

		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			ServiceProviderHelper.Init(app.ApplicationServices);

			app.UseStaticFiles();
			app.UseCookiePolicy();
			app.UseAuthentication();
			app.UseSwagger();
			app.UseSwaggerUI(c =>
			{
				c.SwaggerEndpoint("/swagger/v1/swagger.json", "Chat Server Api v1");
				c.RoutePrefix = string.Empty;
			});

			app.UseMvc();
			DbInitializer.DbInitializer.Seed(app.ApplicationServices);
		}
	}
}