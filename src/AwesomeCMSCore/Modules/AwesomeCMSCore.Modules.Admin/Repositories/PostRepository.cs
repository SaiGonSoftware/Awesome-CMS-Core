using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AwesomeCMSCore.Modules.Admin.Services;
using AwesomeCMSCore.Modules.Admin.ViewModels;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Entities.Enums;
using AwesomeCMSCore.Modules.Helper.Enum;
using AwesomeCMSCore.Modules.Helper.Extensions;
using AwesomeCMSCore.Modules.Helper.Services;
using AwesomeCMSCore.Modules.Repositories;
using Microsoft.EntityFrameworkCore;

namespace AwesomeCMSCore.Modules.Admin.Repositories
{
	public class PostRepository : IPostRepository
	{
		private readonly IUserService _userService;
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;
		private readonly IPostOptionsRepository _postOptionsRepository;
		private readonly IAssetService _assetService;
		private readonly string _currentUserId;

		public PostRepository(
			IUserService userService,
			IUnitOfWork unitOfWork,
			IMapper mapper,
			IPostOptionsRepository postOptionsRepository,
			IAssetService assetService)
		{
			_userService = userService;
			_unitOfWork = unitOfWork;
			_mapper = mapper;
			_postOptionsRepository = postOptionsRepository;
			_currentUserId = _userService.GetCurrentUserGuid();
			_assetService = assetService;
		}

		public async Task<IEnumerable<PostListViewModel>> GetAllPosts()
		{
			var posts = await _unitOfWork.Repository<Post>().Query().ToListAsync();
			return _mapper.Map<IEnumerable<Post>, IEnumerable<PostListViewModel>>(posts);
		}

		public async Task<PostDefaultViewModel> GetPostsDefaultViewModel()
		{
			var posts = await _unitOfWork.Repository<Post>().Query().ToListAsync();

			var viewModel = new PostDefaultViewModel
			{
				PostsPublished = GetPostsByStatus(posts, PostStatus.Published),
				NumberOfPostPublished = CountPost(posts, PostStatus.Published),
				PostsDrafted = GetPostsByStatus(posts, PostStatus.Draft),
				NumberOfDraftedPost = CountPost(posts, PostStatus.Draft),
				PostsDeleted = GetPostsByStatus(posts, PostStatus.Deleted),
				NumberOfDeletedPost = CountPost(posts, PostStatus.Deleted)
			};

			return viewModel;
		}

		public async Task<PostViewModel> GetPost(int postId)
		{
			var post = await GetPostById(postId);

			var postOptions = await _postOptionsRepository.GetAllOptionsByPostId(postId);

			var postViewModel = _mapper.Map<Post, PostViewModel>(post,
				options =>
				{
					options.AfterMap((src, dest) => { dest.PostOptionsDefaultViewModel = postOptions; });
				});

			if (post.Medias != null)
			{
				postViewModel.MediaViewModel = new MediaViewModel
				{
					Name = post.Medias.Name,
					Path = post.Medias.Path
				};
			}

			return postViewModel;
		}

		public async Task SavePost(PostViewModel postViewModel)
		{
			var user = await _userService.GetCurrentUserAsync();

			var postData = _mapper.Map<PostViewModel, Post>(postViewModel, options =>
			{
				options.AfterMap((src, dest) =>
				{
					dest.User = user;
				});
			});

			var post = await _unitOfWork.Repository<Post>().AddAsync(postData);

			var tag = new PostOption
			{
				Key = postViewModel.PostOptionsDefaultViewModel.TagViewModel.Key,
				Value = postViewModel.PostOptionsDefaultViewModel.TagViewModel.Value,
				OptionType = PostOptionType.PostTags,
				User = await _userService.GetCurrentUserAsync(),
				Post = post
			};

			var categories = new PostOption
			{
				Key = postViewModel.PostOptionsDefaultViewModel.CategoriesViewModel.Key,
				Value = postViewModel.PostOptionsDefaultViewModel.CategoriesViewModel.Value,
				OptionType = PostOptionType.PostCategories,
				User = await _userService.GetCurrentUserAsync(),
				Post = post
			};

			await _unitOfWork.Repository<PostOption>().AddAsync(tag);
			await _unitOfWork.Repository<PostOption>().AddAsync(categories);
			await UploadAssetForPost(postViewModel, post);
		}

		public async Task EditPost(PostViewModel postViewModel)
		{
			var post = await GetPostById(postViewModel.Id.Value);
			await UpdateAssetForPost(postViewModel, post);

			var currentUser = await _userService.GetCurrentUserAsync();

			var postData = _mapper.Map<PostViewModel, Post>(postViewModel, post, options =>
			{
				options.AfterMap((src, dest) => dest.User = currentUser);
			});

			await _unitOfWork.Repository<Post>().UpdateAsync(postData);

			var tagToUpdate = _mapper.Map<PostOptionsViewModel, PostOption>(postViewModel.PostOptionsDefaultViewModel.TagViewModel, options =>
			{
				options.AfterMap((src, dest) =>
				{
					dest.Id = postViewModel.PostOptionsDefaultViewModel.TagViewModel.Id;
					dest.User = currentUser;
					dest.OptionType = PostOptionType.PostTags;
				});
			});

			var categoriesToUpdate = _mapper.Map<PostOptionsViewModel, PostOption>(postViewModel.PostOptionsDefaultViewModel.CategoriesViewModel, options =>
			{
				options.AfterMap((src, dest) =>
				{
					dest.Id = postViewModel.PostOptionsDefaultViewModel.CategoriesViewModel.Id;
					dest.User = currentUser;
					dest.OptionType = PostOptionType.PostCategories;
				});
			});

			await _unitOfWork.Repository<PostOption>().UpdateAsync(tagToUpdate);
			await _unitOfWork.Repository<PostOption>().UpdateAsync(categoriesToUpdate);
		}

		public async Task RestorePost(int postId)
		{
			var postsToRestore = await GetPostById(postId);
			postsToRestore.PostStatus = PostStatus.Published;
			await _unitOfWork.Commit();
		}

		public async Task DeletePost(int postId)
		{
			var postsToDelete = await GetPostById(postId);
			postsToDelete.PostStatus = PostStatus.Deleted;
			await _unitOfWork.Commit();
		}

		private IEnumerable<PostListViewModel> GetPostsByStatus(IEnumerable<Post> posts, PostStatus postStatus)
		{
			return _mapper.Map<IEnumerable<Post>, IEnumerable<PostListViewModel>>(posts.Where(p => p.PostStatus.Equals(postStatus)));
		}

		private static int CountPost(IEnumerable<Post> posts, PostStatus postStatus)
		{
			return posts.Count(p => p.PostStatus.Equals(postStatus));
		}

		private async Task<Post> GetPostById(int postId)
		{
			return await _unitOfWork.Repository<Post>().GetByIdAsync(postId);
		}

		private async Task UploadAssetForPost(PostViewModel postViewModel, Post post)
		{
			try
			{
				if (postViewModel.Thumbnail != null && postViewModel.Thumbnail.Length > 0)
				{
					var mediaFileName = RandomString.GenerateRandomString(AppEnum.MinGeneratedAssetName);
					var assetPath = await _assetService.UploadAssets(postViewModel.Thumbnail, mediaFileName);
					var media = new Media
					{
						IsDeleted = false,
						Name = mediaFileName,
						Size = postViewModel.Thumbnail.Length,
						Post = post,
						PostId = post.Id,
						Path = assetPath,
						StorageType = StorageType.GoogleDrive,
						Type = postViewModel.Thumbnail.ContentType,
						User = await _userService.GetCurrentUserAsync()
					};

					post.Medias = media;
					await _unitOfWork.Repository<Post>().UpdateAsync(post);
				}
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}

		private async Task UpdateAssetForPost(PostViewModel postViewModel, Post post)
		{
			try
			{
				if (postViewModel.Thumbnail != null && postViewModel.Thumbnail.Length > 0)
				{
					if (post.Medias != null)
					{
						var existingMedia = await _unitOfWork.Repository<Media>().FindAsync(m => m.Id == post.Medias.Id);
						if (existingMedia != null)
						{
							await _unitOfWork.Repository<Media>().DeleteAsync(existingMedia);
						}
					}

					var mediaFileName = RandomString.GenerateRandomString(AppEnum.MinGeneratedAssetName);
					var assetPath = await _assetService.UploadAssets(postViewModel.Thumbnail, mediaFileName);
					var media = new Media
					{
						IsDeleted = false,
						Name = mediaFileName,
						Size = postViewModel.Thumbnail.Length,
						Post = post,
						PostId = post.Id,
						Path = assetPath,
						StorageType = StorageType.GoogleDrive,
						Type = postViewModel.Thumbnail.ContentType,
						User = await _userService.GetCurrentUserAsync()
					};

					post.Medias = media;
					await _unitOfWork.Repository<Post>().UpdateAsync(post);
				}
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}
	}
}
