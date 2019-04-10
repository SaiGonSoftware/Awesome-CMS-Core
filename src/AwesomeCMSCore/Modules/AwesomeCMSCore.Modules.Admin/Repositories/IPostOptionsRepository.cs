using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Admin.ViewModels;

namespace AwesomeCMSCore.Modules.Admin.Repositories
{
	public interface IPostOptionsRepository
	{
		Task<PostOptionsDefaultViewModel> GetAllOptions();
		Task<PostOptionsDefaultViewModel> GetAllOptionsByPostId(int postId);
		Task<PostOptionsViewModel> GetAllTag();
		Task CreateTag(PostOptionsViewModel tagDataVm);
		Task UpdateTag(PostOptionsViewModel tagDataVm);
		bool IsTagExist();
		Task<PostOptionsViewModel> GetAllCategories();
		Task CreateCategories(PostOptionsViewModel categoriesVm);
		Task UpdateCategories(PostOptionsViewModel categoriesVm);
		bool IsCategoriesExist();
	}
}
