﻿using Bexchange.Infrastructure.Services.Repositories;
using BexchangeAPI.Domain.Models;
using BexchangeAPI.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bexchange.Infrastructure.Repositories.Interfaces
{
    public interface IOrderContentRepository<T> : IContentRepository<T>
    {
        public Task AcceptOrderAsync(int id, CancellationToken token);
        public Task SuccessOrderAsync(int id, IUserService userService, HttpContext context, CancellationToken token);
        public Task DeclineOrderAsync(int id, CancellationToken token);
        public Task<IEnumerable<ExchangeOrder>> GetUserOutgoingOrdersAsync(IUserService userService, HttpContext context, CancellationToken token);
        public Task<IEnumerable<ExchangeOrder>> GetUserIncomingOrdersAsync(IUserService userService, HttpContext context, CancellationToken token);
        public Task<IEnumerable<ExchangeOrder>> GetUserSuceededOrdersAsync(IUserService userService, HttpContext context, CancellationToken token);
    }
}
