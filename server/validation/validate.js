import lodash from "lodash";
const { isEmpty } = lodash;

const Validate = (data) => {};

Validate.register = (data) => {
  var errors = {};

  if (!data.username) {
    errors.username = "Name is required";
  } else if (data.username.length < 3) {
    errors.username = "Name should be bigger than 3 chars";
  }

  let Etest =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!data.email) {
    errors.email = "Email is required";
  } else if (!Etest.test(data.email)) {
    errors.email = "Enter Valid Email";
  }

  if (isEmpty(errors)) {
    var status = true;
  } else {
    var status = false;
  }
  return {
    status: status,
    errors: errors,
    message: "Please Correct Data",
  };
};

Validate.login = (data) => {
  var errors = {};

  let Etest =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!data.email) {
    errors.email = "Email is required";
  } else if (!Etest.test(data.email)) {
    errors.email = "Enter Valid Email";
  }

  let Ptest = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!data.password) {
    errors.password = "Password is required";
  } else if (!Ptest.test(data.password)) {
    errors.password = "Enter Valid Password";
  }

  if (isEmpty(errors)) {
    var status = true;
  } else {
    var status = false;
  }
  return {
    status: status,
    errors: errors,
    message: "Please Correct Data",
  };
};

Validate.AddCate = (data) => {
  var errors = {};

  if (!data.category_name) {
    errors.category_name = "Category name is required";
  }

  if (isEmpty(errors)) {
    var status = true;
  } else {
    var status = false;
  }
  return {
    status: status,
    errors: errors,
    message: "Please Correct Data",
  };
};

Validate.AddSubCate = (data) => {
  var errors = {};

  if (!data.category_id) {
    errors.category_id = "Category is required";
  }

  if (!data.subcategory_name) {
    errors.subcategory_name = "Sub Category name is required";
  }

  if (isEmpty(errors)) {
    var status = true;
  } else {
    var status = false;
  }
  return {
    status: status,
    errors: errors,
    message: "Please Correct Data",
  };
};

export default Validate;
