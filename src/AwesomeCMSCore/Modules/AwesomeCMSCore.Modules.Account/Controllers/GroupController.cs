using AwesomeCMSCore.Modules.Account.Services;
using AwesomeCMSCore.Modules.Entities.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AwesomeCMSCore.Modules.Account.Controllers
{
    [Authorize]
    public class GroupController : Controller
    {
        private readonly IGroupService _groupService;
        public GroupController(IGroupService groupService)
        {
            _groupService = groupService;
        }
         
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet] 
        public IActionResult Create()
        { 
            return View(); 
        } 
          
}
}
