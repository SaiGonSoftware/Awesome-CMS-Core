SELECT [dbo].[AspNetUserRoles].[UserId], [dbo].[AspNetUserRoles].[RoleId], [dbo].[AspNetRoles].[ConcurrencyStamp], [dbo].[AspNetRoles].[Name], [dbo].[AspNetRoles].[NormalizedName], [dbo].[AspNetUsers].[Email], [dbo].[AspNetUsers].[UserName]
FROM [dbo].[AspNetUserRoles] 
JOIN [dbo].[AspNetUsers] ON ([dbo].[AspNetUsers].[Id] = [dbo].[AspNetUserRoles].[UserId])
JOIN [dbo].[AspNetRoles] ON ([dbo].[AspNetRoles].[Id] = [dbo].[AspNetUserRoles].[RoleId])