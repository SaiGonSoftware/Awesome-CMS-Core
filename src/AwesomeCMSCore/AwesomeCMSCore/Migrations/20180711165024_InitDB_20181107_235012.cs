using Microsoft.EntityFrameworkCore.Migrations;

namespace AwesomeCMSCore.Migrations
{
    public partial class InitDB_20181107_235012 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Medias_AspNetUsers_OwnerId",
                table: "Medias");

            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "Medias",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Medias_OwnerId",
                table: "Medias",
                newName: "IX_Medias_UserId");

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Medias",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "PostId",
                table: "Medias",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Medias_PostId",
                table: "Medias",
                column: "PostId");

            migrationBuilder.AddForeignKey(
                name: "FK_Medias_Posts_PostId",
                table: "Medias",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Medias_AspNetUsers_UserId",
                table: "Medias",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Medias_Posts_PostId",
                table: "Medias");

            migrationBuilder.DropForeignKey(
                name: "FK_Medias_AspNetUsers_UserId",
                table: "Medias");

            migrationBuilder.DropIndex(
                name: "IX_Medias_PostId",
                table: "Medias");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Medias");

            migrationBuilder.DropColumn(
                name: "PostId",
                table: "Medias");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Medias",
                newName: "OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_Medias_UserId",
                table: "Medias",
                newName: "IX_Medias_OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Medias_AspNetUsers_OwnerId",
                table: "Medias",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
