using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace AwesomeCMSCore.Migrations
{
    public partial class InitDB_20181603_222219 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TagOptionsId",
                table: "Tags",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TagOptions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DateCreate = table.Column<DateTime>(nullable: false),
                    DateModified = table.Column<DateTime>(nullable: false),
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
                name: "IX_Tags_TagOptionsId",
                table: "Tags",
                column: "TagOptionsId");

            migrationBuilder.CreateIndex(
                name: "IX_TagOptions_PostId",
                table: "TagOptions",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_TagOptions_UserId",
                table: "TagOptions",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tags_TagOptions_TagOptionsId",
                table: "Tags",
                column: "TagOptionsId",
                principalTable: "TagOptions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tags_TagOptions_TagOptionsId",
                table: "Tags");

            migrationBuilder.DropTable(
                name: "TagOptions");

            migrationBuilder.DropIndex(
                name: "IX_Tags_TagOptionsId",
                table: "Tags");

            migrationBuilder.DropColumn(
                name: "TagOptionsId",
                table: "Tags");
        }
    }
}
