using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AwesomeCMSCore.Modules.Entities.Data;
using Microsoft.EntityFrameworkCore;

namespace AwesomeCMSCore.Modules.Repositories
{
	public class GenericRepository<T> : IGenericRepository<T> where T : class
	{
		private readonly ApplicationDbContext _context;
		private readonly IUnitOfWork _unitOfWork;

		public GenericRepository(ApplicationDbContext context)
		{
			_context = context;
			_unitOfWork = new UnitOfWork(context);
		}

		public IQueryable<T> Query()
		{
			return _context.Set<T>().AsQueryable();
		}

		public ICollection<T> GetAll()
		{
			return _context.Set<T>().ToList();
		}

		public async Task<ICollection<T>> GetAllAsync()
		{
			return await _context.Set<T>().ToListAsync();
		}

		public T GetById(int id)
		{
			return _context.Set<T>().Find(id);
		}

		public async Task<T> GetByIdAsync(int id)
		{
			return await _context.Set<T>().FindAsync(id);
		}

		public T GetByUniqueId(string id)
		{
			return _context.Set<T>().Find(id);
		}

		public async Task<T> GetByUniqueIdAsync(string id)
		{
			return await _context.Set<T>().FindAsync(id);
		}

		public T Find(Expression<Func<T, bool>> match)
		{
			return _context.Set<T>().SingleOrDefault(match);
		}

		public async Task<T> FindAsync(Expression<Func<T, bool>> match)
		{
			return await _context.Set<T>().SingleOrDefaultAsync(match);
		}

		public ICollection<T> FindAll(Expression<Func<T, bool>> match)
		{
			return _context.Set<T>().Where(match).ToList();
		}

		public async Task<ICollection<T>> FindAllAsync(Expression<Func<T, bool>> match)
		{
			return await _context.Set<T>().Where(match).ToListAsync();
		}

		public T Add(T entity)
		{
			_context.Set<T>().Add(entity);
			_context.SaveChanges();
			return entity;
		}

		public async Task<T> AddAsync(T entity)
		{
			_context.Set<T>().Add(entity);
			await _unitOfWork.Commit();
			return entity;
		}

		public T Update(T updated)
		{
			if (updated == null)
			{
				return null;
			}

			_context.Set<T>().Attach(updated);
			_context.Entry(updated).State = EntityState.Modified;
			_context.SaveChanges();

			return updated;
		}

		public async Task<T> UpdateAsync(T updated)
		{
			if (updated == null)
			{
				return null;
			}

			_context.Set<T>().Attach(updated);
			_context.Entry(updated).State = EntityState.Modified;
			await _unitOfWork.Commit();

			return updated;
		}

		public void Delete(T t)
		{
			_context.Set<T>().Remove(t);
			_context.SaveChanges();
		}

		public async Task<int> DeleteAsync(T t)
		{
			_context.Set<T>().Remove(t);
			return await _unitOfWork.Commit();
		}

		public int Count()
		{
			return _context.Set<T>().Count();
		}

		public async Task<int> CountAsync()
		{
			return await _context.Set<T>().CountAsync();
		}

		public IEnumerable<T> Filter(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string includeProperties = "", int? page = null,
			int? pageSize = null)
		{
			IQueryable<T> query = _context.Set<T>();
			if (filter != null)
			{
				query = query.Where(filter);
			}

			if (orderBy != null)
			{
				query = orderBy(query);
			}

			if (includeProperties != null)
			{
				foreach (
					var includeProperty in includeProperties.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
				{
					query = query.Include(includeProperty);
				}
			}

			if (page != null && pageSize != null)
			{
				query = query.Skip((page.Value - 1) * pageSize.Value).Take(pageSize.Value);
			}

			return query.ToList();
		}

		public IQueryable<T> FindBy(Expression<Func<T, bool>> predicate)
		{
			return _context.Set<T>().Where(predicate);
		}

		public bool Exist(Expression<Func<T, bool>> predicate)
		{
			var exist = _context.Set<T>().Where(predicate);
			return exist.Any() ? true : false;
		}
	}
}
