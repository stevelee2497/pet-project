using System;
using System.ComponentModel.DataAnnotations;

namespace Services.DTOs.Input
{
	public class ChapterInputDto
	{
		[Required(ErrorMessage = "Vui lòng nhập tên chương")]
		public string Name { get; set; }

		[Required(ErrorMessage = "Vui lòng nhập số thứ tự của chương")]
		public int ChapterIndex { get; set; }

		[Required(ErrorMessage = "Vui lòng nhập nội dung chương")]
		public string Content { get; set; }

		[Required(ErrorMessage = "BookId không hợp lệ")]
		public Guid BookId { get; set; }
	}
}