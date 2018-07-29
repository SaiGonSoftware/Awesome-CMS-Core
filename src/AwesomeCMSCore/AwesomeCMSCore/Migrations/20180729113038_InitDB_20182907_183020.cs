using Microsoft.EntityFrameworkCore.Migrations;

namespace AwesomeCMSCore.Migrations
{
    public partial class InitDB_20182907_183020 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Posts");

            migrationBuilder.AddColumn<int>(
                name: "PostStatus",
                table: "Posts",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PostStatus",
                table: "Posts");

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Posts",
                nullable: false,
                defaultValue: false);
        }
    }
}
