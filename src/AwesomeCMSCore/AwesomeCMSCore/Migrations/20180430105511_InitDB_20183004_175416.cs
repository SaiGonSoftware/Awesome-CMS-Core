using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace AwesomeCMSCore.Migrations
{
    public partial class InitDB_20183004_175416 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TagOptions",
                table: "Categories",
                newName: "CategoriesOptions");

            migrationBuilder.RenameColumn(
                name: "TagData",
                table: "Categories",
                newName: "CategoriesData");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CategoriesOptions",
                table: "Categories",
                newName: "TagOptions");

            migrationBuilder.RenameColumn(
                name: "CategoriesData",
                table: "Categories",
                newName: "TagData");
        }
    }
}
