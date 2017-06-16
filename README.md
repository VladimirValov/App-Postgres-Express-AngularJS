# Postgres-Express-Angular
Admin page for users game statistic


Sequelize Migration

# npm install --save sequelize-cli

# sequelize init  # Initializes the project.

# user
sequelize model:create --name user --attributes 'name:string, email:string, password:string, admin:boolean'

# games

sequelize model:create --name games --attributes 'name:string, code:number'

# sequelize db:migrate        # Run pending migrations.

# sequelize seed:create

# sequelize db:seed:all

# seed
sequelize db:seed:20170616082945-games-starcraft.js
