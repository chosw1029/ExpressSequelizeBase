module.exports = function (sequelize, DataTypes) {
  const illust = sequelize.define(
    'illust',
    {
      id: {
        field: 'ID',
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      name: { field: 'NAME', type: DataTypes.STRING(100), allowNull: false },
    },
    {
      // don't use camelcase for automatically added attributes but underscore style
      // so updatedAt will be updated_at
      underscored: true,

      // disable the modification of tablenames; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      // if you don't want that, set the following
      freezeTableName: true,

      // define the table's name
      tableName: 'mst_illust',
      timestamps: false,
    }
  );

  return illust;
};
