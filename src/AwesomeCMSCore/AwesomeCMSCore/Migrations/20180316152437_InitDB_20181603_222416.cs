using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace AwesomeCMSCore.Migrations
{
    public partial class InitDB_20181603_222416 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tags_TagOptions_TagOptionsId",
                table: "Tags");

            migrationBuilder.DropIndex(
                name: "IX_Tags_TagOptionsId",
                table: "Tags");

            migrationBuilder.DropColumn(
                name: "TagOptionsId",
                table: "Tags");

            migrationBuilder.AddColumn<string>(
                name: "Options",
                table: "TagOptions",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Options",
                table: "TagOptions");

            migrationBuilder.AddColumn<int>(
                name: "TagOptionsId",
                table: "Tags",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tags_TagOptionsId",
                table: "Tags",
                column: "TagOptionsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tags_TagOptions_TagOptionsId",
                table: "Tags",
                column: "TagOptionsId",
                principalTable: "TagOptions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
