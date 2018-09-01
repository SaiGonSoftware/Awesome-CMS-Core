using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Admin.ViewModels;

namespace AwesomeCMSCore.Modules.Admin.Repositories
{
    public interface IPostOptionsRepository
    {
        Task<PostOptionsDefaultViewModel> GetAllOptions();
        Task<PostOptionsViewModel> GetAllTag();
        Task CreateTag(TagViewModel tagDataVm);
        Task UpdateTag(TagViewModel tagDataVm);
        bool IsTagExist();
        Task<PostOptionsViewModel> GetAllCategories();
        Task CreateCategories(CategoriesViewModel categoriesVm);
        Task UpdateCategories(CategoriesViewModel categoriesVm);
        bool IsCategoriesExist();
    }
}
