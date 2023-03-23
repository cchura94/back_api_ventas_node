## Migraciones

```bash
npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string,status:boolean
```


## Migrar

npx sequelize-cli db:migrate