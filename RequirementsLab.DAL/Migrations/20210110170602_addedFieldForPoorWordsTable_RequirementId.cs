using Microsoft.EntityFrameworkCore.Migrations;

namespace RequirementsLab.DAL.Migrations
{
    public partial class addedFieldForPoorWordsTable_RequirementId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RequirementId",
                table: "PoorWords",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RequirementId",
                table: "PoorWords");
        }
    }
}
