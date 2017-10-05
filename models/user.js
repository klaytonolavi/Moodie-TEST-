module.exports = function(sequelize, DataTypes){
    var User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
			//type: DataTypes.SHA1(STRING)
			type: DataTypes.STRING
        },
        privacy: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
        }
    });
    
    // User.associate = function(models) {
    //     User.hasMany(models.Gallery, {
    //         onDelete: "cascade"
    //     });
    // };
    return User;
};