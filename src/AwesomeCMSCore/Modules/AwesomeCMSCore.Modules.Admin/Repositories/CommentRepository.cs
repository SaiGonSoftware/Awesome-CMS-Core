using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AwesomeCMSCore.Modules.Admin.ViewModels;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Entities.Enums;
using AwesomeCMSCore.Modules.Helper.Services;
using AwesomeCMSCore.Modules.Repositories;
using Microsoft.EntityFrameworkCore;

namespace AwesomeCMSCore.Modules.Admin.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly IUserService _userService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly string _currentUserId;

        public CommentRepository(
            IUserService userService,
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _userService = userService;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _currentUserId = _userService.GetCurrentUserGuid();
        }

        public async Task<CommentDefaultViewModel> GetAllComments()
        {
            var comments = _unitOfWork.Repository<Comment>().Query();

            var viewModel = new CommentDefaultViewModel
            {
                AllComments = await comments.ToListAsync(),
                NumberOfComments = comments.Count(),
                ApprovedComments =  await GetCommentsByStatus(comments, CommentStatus.Approved).ConfigureAwait(false),
                NumberOfApprovedComments = CountComment(comments, CommentStatus.Approved),
                PendingComments = await GetCommentsByStatus(comments, CommentStatus.Pending).ConfigureAwait(false),
                NumberOfPendingComments = CountComment(comments, CommentStatus.Pending),
                SpamComments = await GetCommentsByStatus(comments, CommentStatus.Spam).ConfigureAwait(false),
                NumberOfSpamComments = CountComment(comments, CommentStatus.Spam),
                DeletedComments = await GetCommentsByStatus(comments, CommentStatus.Trash).ConfigureAwait(false),
                NumberOfDeletedComments = CountComment(comments, CommentStatus.Trash)
            };

            return viewModel;
        }

        private static int CountComment(IQueryable<Comment> comments, CommentStatus commentStatus)
        {
            return comments.Count(cm => cm.CommentStatus.Equals(commentStatus));
        }

        private async Task<IEnumerable<Comment>> GetCommentsByStatus(IQueryable<Comment> comments, CommentStatus commentStatus)
        {
            return await comments.Where(cm => cm.CommentStatus.Equals(commentStatus)).ToListAsync();
        }
    }
}