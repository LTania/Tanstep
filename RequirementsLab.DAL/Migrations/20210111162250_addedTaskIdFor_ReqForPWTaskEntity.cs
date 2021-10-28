using Microsoft.EntityFrameworkCore.Migrations;

namespace RequirementsLab.DAL.Migrations
{
    public partial class addedTaskIdFor_ReqForPWTaskEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TaskId",
                table: "RequirementsForPWTask",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "RequirementId",
                table: "PoorWords",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TaskId",
                table: "RequirementsForPWTask");

            migrationBuilder.AlterColumn<int>(
                name: "RequirementId",
                table: "PoorWords",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
