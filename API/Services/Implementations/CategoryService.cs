using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using AutoMapper;
using DAL.Exceptions;
using DAL.Models;
using Services.Abstractions;
using Services.DTOs.Input;
using Services.DTOs.Output;

namespace Services.Implementations
{
	public class CategoryService : EntityService<Category>, ICategoryService
	{
		public BaseResponse<IEnumerable<CategoryOutputDto>> All(IDictionary<string, string> @params)
		{
			var categories = All().AsEnumerable().Select(Mapper.Map<CategoryOutputDto>);

			return new BaseResponse<IEnumerable<CategoryOutputDto>>(HttpStatusCode.OK, data: categories);
		}

		public BaseResponse<bool> CreateCategory(CategoryInputDto categoryInputDto)
		{
			if (Contains(x => x.Name.Equals(categoryInputDto.Name, StringComparison.InvariantCultureIgnoreCase)))
			{
				throw new BadRequestException($"Thể loại {categoryInputDto.Name} đã tồn tại");
			}

			var category = Mapper.Map<Category>(categoryInputDto);
			Create(category, out var isSaved);
			if (!isSaved)
			{
				throw new BadRequestException($"Không thể tạo thể loại {category.Name}");
			}

			return new BaseResponse<bool>(HttpStatusCode.OK, data: true);
		}

		public BaseResponse<int> CreateManyCategories(string[] categories)
		{
			var existedCategories = All().Select(c => c.Name);
			var nonExistedCategories = categories.Where(c => !existedCategories.Contains(c)).ToList();

			CreateMany(nonExistedCategories.Select(c => new Category {Name = c}), out var isSaved);
			if (!isSaved)
			{
				throw new BadRequestException($"Không thể import categories");
			}

			return new SuccessResponse<int>(nonExistedCategories.Count);
		}

		public BaseResponse<bool> UpdateCategory(Guid id, CategoryInputDto categoryInputDto)
		{
			var category = Find(id);
			if (category == null)
			{
				throw new BadRequestException($"Không tìm thấy thể loại {id}");
			}

			category.Name = categoryInputDto.Name;
			var isUpdated = Update(category);
			if (!isUpdated)
			{
				throw new InternalServerErrorException($"Không thể update thể loại {category.Name}");
			}

			return new BaseResponse<bool>(HttpStatusCode.OK, data: true);
		}

		public BaseResponse<bool> DeleteCategory(Guid id, CategoryInputDto categoryInputDto)
		{
			var category = Find(id);
			if (category == null)
			{
				throw new BadRequestException($"Không tìm thấy thể loại {id}");
			}

			var deleted = Delete(category);
			if (!deleted)
			{
				throw new InternalServerErrorException($"Không thể delete thể loại {category.Name}");
			}

			return new BaseResponse<bool>(HttpStatusCode.OK, data: true);
		}
	}
}