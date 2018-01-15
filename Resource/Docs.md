- Thank to [thienn](https://github.com/thiennn/) for your modular architect. Without your help I wouldnt complish this.

#### Prerequisites
- SQL Server
- [NodeJS](https://nodejs.org) Install lts version of node 
- [Visual Studio 2017 version 15.3 with .NET Core SDK 2.0](https://www.microsoft.com/net/core/)
- [ElasticSearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/_installation.html)
- [ReactJS](https://reactjs.org/docs/hello-world.html)
- [Autofac](http://autofaccn.readthedocs.io/en/latest/integration/aspnetcore.html)
- Google Drive API
- Drag&Drop (Self develop)
- ASP.Net Core 2.0
- Web API
- [Identity Server 4](http://docs.identityserver.io/en/dev/quickstarts)

### Run the project

**For backend**
- Change your db source in appsetting.json and appsetting.dev.json
- To generate migrations simply follow this [link](https://docs.microsoft.com/en-us/aspnet/core/data/ef-mvc/migrations). 
Navigate to Awesome-CMS-Core\src\AwesomeCMSCore\AwesomeCMSCore to run migration command

**For frontend**
- Restore npm package

Currently I use grunt to watch for any change happend in FrontEnd folder using webpack so we need to run 2 command 

```
- Run grunt inside Awesome-CMS-Core\src\AwesomeCMSCore\AwesomeCMSCore
- Run npm start insde D:\Study\Awesome-CMS-Core\src\AwesomeCMSCore\Modules\AwesomeCMSCore.Modules.Frontend
```
### Project Architecture (Update later)

<img src="Awesome CMS Architect.png" width="100%"/>