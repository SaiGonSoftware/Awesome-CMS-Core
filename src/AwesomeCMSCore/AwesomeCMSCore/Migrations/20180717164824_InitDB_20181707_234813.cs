using Microsoft.EntityFrameworkCore.Migrations;

namespace AwesomeCMSCore.Migrations
{
    public partial class InitDB_20181707_234813 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TagOptions",
                table: "Posts",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TagOptions",
                table: "Posts");
        }
    }
}
