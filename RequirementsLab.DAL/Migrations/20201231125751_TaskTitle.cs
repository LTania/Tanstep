using Microsoft.EntityFrameworkCore.Migrations;

namespace RequirementsLab.DAL.Migrations
{
    public partial class TaskTitle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Tasks",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "Tasks");
        }
    }
}
