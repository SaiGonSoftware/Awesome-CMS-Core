using Microsoft.EntityFrameworkCore.Migrations;

namespace AwesomeCMSCore.Migrations
{
    public partial class InitDB_20182507_220853 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Tags_PostId",
                table: "Tags");

            migrationBuilder.AlterColumn<int>(
                name: "PostId",
                table: "Tags",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateIndex(
                name: "IX_Tags_PostId",
                table: "Tags",
                column: "PostId",
                unique: true,
                filter: "[PostId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Tags_PostId",
                table: "Tags");

            migrationBuilder.AlterColumn<int>(
                name: "PostId",
                table: "Tags",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tags_PostId",
                table: "Tags",
                column: "PostId",
                unique: true);
        }
    }
}
