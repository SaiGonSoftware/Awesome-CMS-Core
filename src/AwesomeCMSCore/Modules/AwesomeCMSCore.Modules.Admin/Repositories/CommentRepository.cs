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
            var comments = await _unitOfWork.Repository<Comment>().Query().Include(x=> x.User).Include(c => c.Post).ToListAsync();

            var viewModel = new CommentDefaultViewModel
            {
                AllComments = comments,
                NumberOfComments = comments.Count(),
                ApprovedComments =  GetCommentsByStatus(comments, CommentStatus.Approved),
                NumberOfApprovedComments = CountComment(comments, CommentStatus.Approved),
                PendingComments = GetCommentsByStatus(comments, CommentStatus.Pending),
                NumberOfPendingComments = CountComment(comments, CommentStatus.Pending),
                SpamComments = GetCommentsByStatus(comments, CommentStatus.Spam),
                NumberOfSpamComments = CountComment(comments, CommentStatus.Spam),
                DeletedComments = GetCommentsByStatus(comments, CommentStatus.Trash),
                NumberOfDeletedComments = CountComment(comments, CommentStatus.Trash)
            };

            return viewModel;
        }

        private static int CountComment(IEnumerable<Comment> comments, CommentStatus commentStatus)
        {
            return comments.Count(cm => cm.CommentStatus.Equals(commentStatus));
        }

        private static IEnumerable<Comment> GetCommentsByStatus(IEnumerable<Comment> comments, CommentStatus commentStatus)
        {
            return comments.Where(cm => cm.CommentStatus == commentStatus);
        }
    }
}