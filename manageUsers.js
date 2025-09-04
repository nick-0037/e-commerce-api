const bcrypt = require("bcrypt");
const sequelize = require("./db");
const { Sequelize } = require("sequelize");

async function listUsers() {
  try {
    const users = await sequelize.query(
      "SELECT id, email, username, role FROM users",
      { type: Sequelize.QueryTypes.SELECT }
    );

    console.log("\n 📋 Usuarios en la app:");
    console.table(users);
    return users;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function resetPass(userId, newPass) {
  try {
    const hashedPass = await bcrypt.hash(newPass, 10);

    await sequelize.query("UPDATE users SET password = ? WHERE id = ?", {
      replacements: [hashedPass, userId],
      type: Sequelize.QueryTypes.UPDATE, 
    });

    console.log(`✅ Contraseña actualizada para usuario ID: ${userId}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Manejar argumentos
const args = process.argv.slice(2);

async function main() {
  if (args.length === 0) {
    await listUsers();
    console.log(
      "\nPara resetear: node manageUsers.js reset <userId> <newPassword>"
    );
  } else if (args[0] === "reset" && args.length === 3) {
    const userId = parseInt(args[1]);
    const newPassword = args[2];
    await resetPass(userId, newPassword);
    console.log("¡Listo!");
  } else {
    console.log("Uso: node manageUsers.js [reset <userId> <newPassword>]");
  }

  process.exit(0);
}

main().catch((error) => {
  console.error("Error fatal:", error);
  process.exit(1);
});