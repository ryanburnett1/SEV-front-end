/* eslint-disable */

import { required, email, max, confirmed, is, oneOf } from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("required", {
  ...required,
  message: "This field is required"
});

extend("max", {
  ...max,
  message: "This field must be {length} characters or less"
});

extend("email", {
  ...email,
  message: "This field must be a valid email"
});

extend("confirmed", {
  ...confirmed,
  message: "Value does not match {target} field"
})

extend("is", {
  ...is,
  message: "{value} must be selected"
})

extend("oneOf", {
  ...oneOf,
  message: "{value} must be selected"
})