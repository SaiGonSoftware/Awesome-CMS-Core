using System;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using AutoMapper;
using AwesomeCMSCore.Modules.Entities.Entities;
using AwesomeCMSCore.Modules.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AwesomeCMSCore.Modules.Shared.Repositories
{
	public class NewsLetterRepository : INewsLetterRepository
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;
		private readonly ILogger<NewsLetterRepository> _logger;

		public NewsLetterRepository(
			IUnitOfWork unitOfWork,
			IMapper mapper,
			ILogger<NewsLetterRepository> logger)
		{
			_unitOfWork = unitOfWork;
			_mapper = mapper;
			_logger = logger;
		}

		public bool IsEmailRegistered(string email)
		{
			return _unitOfWork.Repository<NewsLetter>().Exist(em => em.Email == email);
		}

		public async Task<bool> RegisterSubscriptionEmail(string email)
		{
			using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
			{
				try
				{
					var isEmailExists = _unitOfWork.Repository<NewsLetter>().Exist(em => em.Email == email);
					if (isEmailExists)
					{
						return false;
					}

					await _unitOfWork.Repository<NewsLetter>().AddAsync(new NewsLetter { Email = email });
					transaction.Complete();

					return true;
				}
				catch (Exception ex)
				{
					_logger.LogError(ex.Message, ex);
					_unitOfWork.Rollback();
					throw;
				}
			}
		}

		public Task SendEmailSubscriptionAsync()
		{
			throw new NotImplementedException();
		}

	}
}
