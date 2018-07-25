using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AwesomeCMSCore.Migrations
{
    public partial class InitDB_20182507_215734 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Tags_TagsId",
                table: "Posts");

            migrationBuilder.DropTable(
                name: "TagOptions");

            migrationBuilder.DropIndex(
                name: "IX_Posts_TagsId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "TagOptions",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "TagsId",
                table: "Posts");

            migrationBuilder.AddColumn<int>(
                name: "PostId",
                table: "Tags",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Tags_PostId",
                table: "Tags",
                column: "PostId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Tags_Posts_PostId",
                table: "Tags",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tags_Posts_PostId",
                table: "Tags");

            migrationBuilder.DropIndex(
                name: "IX_Tags_PostId",
                table: "Tags");

            migrationBuilder.DropColumn(
                name: "PostId",
                table: "Tags");

            migrationBuilder.AddColumn<string>(
                name: "TagOptions",
                table: "Posts",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TagsId",
                table: "Posts",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TagOptions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateModified = table.Column<DateTime>(nullable: false),
                    Options = table.Column<string>(nullable: true),
                    PostId = table.Column<int>(nullable: true),
                    UniqeId = table.Column<Guid>(nullable: false),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TagOptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TagOptions_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TagOptions_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Posts_TagsId",
                table: "Posts",
                column: "TagsId");

            migrationBuilder.CreateIndex(
                name: "IX_TagOptions_PostId",
                table: "TagOptions",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_TagOptions_UserId",
                table: "TagOptions",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Tags_TagsId",
                table: "Posts",
                column: "TagsId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
