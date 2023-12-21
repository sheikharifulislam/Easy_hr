const Employee = require("../modules/Employee/models");

async function destroyEmployeeCollection() {
    await Employee.destroy({
        where: {},
    });
}

destroyEmployeeCollection();
